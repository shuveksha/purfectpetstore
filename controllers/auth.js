// (it deals data from the signup form)
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  //password encryption
const { token } = require('morgan');

const con = mysql.createConnection(

    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });


exports.login = async(req, res) => {

    try {
        const { email, password } = req.body; //login form ko data haru 

        if (!email || !password) {
            return res.status(404).render('login', {
                message: 'please enter all fields'
            });
        }

        con.query('select * from user where user_email =?', [email], async (error, results) => {
            console.log(results);
            //  checking if no result comes or password for that email is incorrect
            if (!results || !(await bcrypt.compare(password, results[0].user_password))) {
                res.status(401).render('login', {
                    message: 'email or password is incorrect'
                })
            }
            // sabbaikura match bhayo bhane creating token and using that
            else {
                const id = results[0].user_id;
                const token = jwt.sign({id:id}, process.env.JWT_SECRET, {   
                    //: pachi ko id is const id wala id

                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log(`the token is ${token}`);
            }
         
            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

              res.cookie('jwt',token,cookieOptions)//cookie lai browser mah set garna(cokkie name jwt rakheko )
              res.status(200).redirect("/");



        });


    }
    catch (error) {
        console.log(error);
    }
}










exports.signup = (req, res) => {
    console.log(req.body); //form ko kura display garcha req.body le 


    // const name= req.body.name;
    // const email= req.body.email;

    const { name, email, password, passwordconfirm } = req.body;  //mathi bhanda esari destructuring garera gareko ramro

    con.query('select user_email from user where user_email= ?', [email], async (error, results) => {

        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('signup', {
                message: 'This email is already in use'
            })
        }

        else if (password !== passwordconfirm) {
            return res.render('signup', {

                message: 'Password does not match'
            }
            );
        }


        //  database ma halnu agadi check aru confirmation haru then only add to        database
        //firstly hashing password
        let hashpassword = await bcrypt.hash(password, 8);
        console.log(hashpassword);

        con.query('insert into user set ?', { name: name, user_password: hashpassword, user_email: email }, (error, results) => {

            if (error) {
                console.log(error);
            }

            else {
                console.log(results);
                return res.render('signup', {

                    message: 'User succesfully registered'
                }
                )
            }

        })



    });


}