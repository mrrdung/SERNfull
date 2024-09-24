import { where } from "sequelize";
import db from "../models";
let createNewSpecialtySV = data => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "missing require parameter",
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "Active appoimenr success",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllSpecialtySV = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({});
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item;
                });
            }
            resolve({
                data: data,
                errCode: 0,
                errMessage: "get specialty ok",
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailSpecialtyByIdSV = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "missing require parameter",
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ["name", "descriptionHTML", "descriptionMarkdown"],
                });
                if (data) {
                    let doctorSpeciatly = [];
                    if (location === "ALL") {
                        doctorSpeciatly = await db.Doctor_Infor.findAll({
                            where: {
                                SpecialtyId: inputId,
                            },
                            attributes: ["provinceId", "doctorId"],
                        });
                    } else {
                        //find by location
                        doctorSpeciatly = await db.Doctor_Infor.findAll({
                            where: {
                                SpecialtyId: inputId,
                                provinceId: location,
                            },
                            attributes: ["provinceId", "doctorId"],
                        });
                    }

                    data.doctorSpeciatly = doctorSpeciatly;
                } else {
                    data = {};
                }
                resolve({
                    data: data,
                    errCode: 0,
                    errMessage: "ok",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createNewSpecialtySV,
    getAllSpecialtySV,
    getDetailSpecialtyByIdSV,
};
