import express from "express";


const homeController = {
    getHomePage: (req, res) => {
        return res.send("wellcom node");
    },
    getMrrDung: (req, res) => {
        return res.render("test/about.ejs")
    }

}
module.exports = homeController;