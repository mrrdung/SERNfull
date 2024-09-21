import patientService from "../services/patientService";

let postBookAppointment = async (req, res) => {
    try {
        let info = await patientService.postBookAppointmentSV(req.body);
        res.status(200).json(info);
    } catch (e) {
        res.status(200).json({
            errCode: 1,
            errMessage: "Error server",
        });
    }
};
let verifyBookAppointment = async (req, res) => {
    try {
        let info = await patientService.verifyBookAppointmentSV(req.body);
        res.status(200).json(info);
    } catch (e) {
        res.status(200).json({
            errCode: 1,
            errMessage: "Error server",
        });
    }
};
module.exports = {
    postBookAppointment,
    verifyBookAppointment,
};
