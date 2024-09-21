import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
const router = express.Router();

let initWebRouters = app => {
    router.get("/", homeController.getHomePage);
    router.get("/add", homeController.getMrrDung);
    router.post("/post-CRUD", homeController.postCRUD);
    router.get("/get-CRUD", homeController.displayUser);
    router.get("/edit-CRUD", homeController.editCRUDUser);

    router.post("/put-CRUD", homeController.putCRUDUser);
    router.get("/delete-CRUD", homeController.deleteCRUDUser);

    //API
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-users", userController.handleCreateNewUser);
    router.put("/api/update-users", userController.handleUpdateNewUser);
    router.delete("/api/delete-users", userController.handleDeleteNewUser);
    //API allcodes
    router.get("/api/allcodes", userController.getAllCode);
    router.get("/api/get-top-doctor", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctor", doctorController.getAllDoctors);
    router.post("/api/post-info-doctor", doctorController.postInfoDoctor);
    router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleDoctorByDate);
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);
    router.get("/api/get-profile-infor-doctor-by-id", doctorController.getProfileInforDoctorById);

    // patient
    router.post("/api/post-book-appointment", patientController.postBookAppointment);
    return app.use("/", router);
};

module.exports = initWebRouters;
