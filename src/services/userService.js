import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcrypt";
import { raw } from "body-parser";

let handleUserLogin = (email, passWord) => {
    return new Promise(async (resolve, reject) => {

        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'address', 'password'],
                    where: { email: email },
                    raw: true

                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(passWord, user.password);
                    // console.log(user);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = "Pass Ok"
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Pass Wrong"
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = "Your not found"
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.message = "Your email isnt exist in your system. Plz try other email !"

            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }


    });
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                { where: { email: userEmail } })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (error) {
            reject(error)
        }
    });
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll();
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUser: getAllUser
}


