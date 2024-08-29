import express from "express";
import db from "../models/index";
import { json } from "body-parser";
import CRUDServices from "../services/CRUDServices";


const homeController = {
    getHomePage: async (req, res) => {

        let data = await db.User.findAll();

        return res.render("homepage.ejs", { data: JSON.stringify(data) });
    },
    getMrrDung: (req, res) => {
        return res.render("test/addUser.ejs")
    },
    postCRUD: async (req, res) => {
        await CRUDServices.createNewUser(req.body);
        return res.send("add ok");
    },
    displayUser: async (req, res) => {
        let alluser = await CRUDServices.getAllUser();
        // console.log('chek alluser', alluser)
        return res.render("getCRUD.ejs", { alluser });

    },
    editCRUDUser: async (req, res) => {
        let userId = req.query.id;
        if (userId) {
            let userData = await CRUDServices.getUserInFoById(userId);

            return res.render('editCRUD.ejs', { User: userData })
        } else {
            return res.send('user not found')
        }


    },
    putCRUDUser: async (req, res) => {
        let data = req.body;

        await CRUDServices.updateUserData(data);
        return res.redirect("/get-CRUD");
    },
    deleteCRUDUser: async (req, res) => {
        let id = req.query.id;
        await CRUDServices.deleteById(id);

        return res.redirect("/get-CRUD")

    }

}
module.exports = homeController;