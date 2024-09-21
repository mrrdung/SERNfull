import { where } from "sequelize";
import db from "../models";

let postBookAppointmentSV = async data => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.birthday) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require a parameter",
                });
            } else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                    },
                });
                console.log("check user", user[0]);
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "s1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.birthday,
                            timeType: data.timeType,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save Info doctor succes",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointmentSV,
};
