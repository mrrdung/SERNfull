import express from "express";
import db from "../models/index";
import { json } from "body-parser";

const homeController = {
    getHomePage: async (req, res) => {

        let data = await db.User.findAll();

        return res.render("homepage.ejs", { data: JSON.stringify(data) });
    },
    getMrrDung: (req, res) => {
        return res.render("test/about.ejs")
    }

}
module.exports = homeController;