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
    console.log("id", id)
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required Parameters"
        });
    }
    let users = await userService.getAllUser(id);
    console.log("user", users)
    return res.status(200).json({
        errCode: 0,
        errMessage: "okok", users
    });
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}