const { raw } = require("body-parser");
import { where } from 'sequelize';
import db from '../models';
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                where: { roleId: 'R1' },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);

        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome
}