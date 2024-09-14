import express from 'express';
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
const router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/add", homeController.getMrrDung);
    router.post("/post-CRUD", homeController.postCRUD);
    router.get("/get-CRUD", homeController.displayUser);
    router.get("/edit-CRUD", homeController.editCRUDUser)

    router.post("/put-CRUD", homeController.putCRUDUser)
    router.get("/delete-CRUD", homeController.deleteCRUDUser)

    //API
    router.post("/api/login", userController.handleLogin)
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-users", userController.handleCreateNewUser);
    router.put("/api/update-users", userController.handleUpdateNewUser);
    router.delete("/api/delete-users", userController.handleDeleteNewUser);
    //API allcodes
    router.get('/api/allcodes', userController.getAllCode);
    router.get('/api/get-top-doctor', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctors);
    router.post('/api/post-info-doctor', doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);


    return app.use("/", router);
}




module.exports = initWebRouters;