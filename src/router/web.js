import express from 'express';
import homeController from "../controllers/homeController";


const router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/mrrdung", homeController.getMrrDung);

    return app.use("/", router);
}




module.exports = initWebRouters;