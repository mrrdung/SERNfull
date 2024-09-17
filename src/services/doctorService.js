const { raw } = require("body-parser");
import { where } from "sequelize";
import db from "../models";
require("dotenv").config();
import _ from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = limitInput => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [["createdAt", "DESC"]],
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: { exclude: ["password", "image"] },
            });

            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let saveInfoDoctor = inputData => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('datainput', inputData);

            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action) {
                resolve({
                    errCode: "1",
                    errMessage: "Missing paramter",
                });
            } else {
                if (inputData.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    });
                } else if (inputData.action === "EDIT") {
                    let doctor = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    });
                    if (doctor) {
                        doctor.contentHTML = inputData.contentHTML;
                        doctor.contentMarkdown = inputData.contentMarkdown;
                        doctor.description = inputData.description;
                        await doctor.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: "save ok",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailDoctorById = inputId => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ["description", "contentHTML", "contentMarkdown"],
                        },
                        { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    ],
                    raw: false,
                    nest: true,
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, "base64").toString("binary");
                }
                if (!data) {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let bulkCreateScheduleSv = data => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data", data);

            if (!data.arrSchedule || !data.doctorId || !data.formatDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter",
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                } //get all date existing data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatDate },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                });

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === Number(b.date);
                });
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
            }

            resolve({
                errCode: 0,
                errMessage: "push schedule ok",
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getScheduleDoctorByDateSV = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require parameter",
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                });
                if (!dataSchedule) {
                    dataSchedule = [];
                }
                console.log(dataSchedule);
                resolve({
                    errCode: 0,
                    data: dataSchedule,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateScheduleSv,
    getScheduleDoctorByDateSV,
};
