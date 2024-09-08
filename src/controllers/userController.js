import userService from "../services/userService";


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: "Missing input parameter!"
        })
    }
    //check email exist
    //compare password 
    //return userinfo
    //access-token:JWT
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    });
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;//all,id
    // console.log("id", id)
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required Parameters"
        });
    }
    let users = await userService.getAllUser(id);
    // console.log("user", users)
    return res.status(200).json({
        errCode: 0,
        errMessage: "okok", users
    });
}
let handleCreateNewUser = async (req, res) => {

    let message = await userService.createNewUser(req.body);
    // console.log('message', message);
    return res.status(200).json(message);
}
let handleUpdateNewUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);

}

let handleDeleteNewUser = async (req, res) => {
    let message = await userService.deleteUser(req.body.id)

    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);

    } catch (e) {
        console.log('get allcode', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error From Server"
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateNewUser: handleUpdateNewUser,
    handleDeleteNewUser: handleDeleteNewUser,
    getAllCode: getAllCode
}