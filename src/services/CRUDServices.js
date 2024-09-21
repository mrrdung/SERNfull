const bcrypt = require("bcrypt");
import { where } from "sequelize";
import db from "../models/index";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let createNewUser = async data => {
    return new Promise(async (resolve, reject) => {
        try {
            let haspasswordbybciipt = await hasUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                password: haspasswordbybciipt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleid,
            });
            resolve("create user succsess");
        } catch (error) {
            reject(error);
        }
    });
};
let hasUserPassWord = password => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordhas = await bcrypt.hashSync(password, salt);
            resolve(passwordhas);
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};
let getUserInFoById = userid => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userid }, raw: true });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = data => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: data.id }, raw: false });

            if (user) {
                await db.user.save({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                }),
                    resolve("ok");
            } else {
                resolve("o");
            }
            resolve("ok");
        } catch (error) {
            reject(error);
        }
    });
};
let deleteById = id => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDelete = await db.User.findOne({ where: { id: id }, raw: false });

            if (userDelete) {
                await userDelete.destroy();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInFoById: getUserInFoById,
    updateUserData: updateUserData,
    deleteById: deleteById,
};
