import specialtyService from "../services/specialtyService";

let createNewSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createNewSpecialtySV(req.body);

        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error server",
        });
    }
};
let getAllSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.getAllSpecialtySV(req.body);

        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error server",
        });
    }
};
let getDetailSpecialtyById = async (req, res) => {
    try {
        let info = await specialtyService.getDetailSpecialtyByIdSV(req.query.id, req.query.location);

        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error server",
        });
    }
};
module.exports = {
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
};
