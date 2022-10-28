const { stationModel } = require("../../model");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");

module.exports = (
  mutation,
  query,
  sendEmail,
  clientCofing,
  responseUtil,
  constantUtils,
  validationResult,
  comparePassword,
  generateTokens
) => {
  return {
    loginAdmin: async (req, res) => {
      const { gmail, password } = req.body;
      if (!gmail || !password) {
        responseUtil.generateServerErrorCode(
          res,
          400,
          "email and Password are required",
          "Please check the email and password input.",
          "login-admin"
        );
      }
      const isAdminExist = await query.isAdminExist({ gmail, password });

      // if error when finding admin
      if (isAdminExist?.error) {
        responseUtil.generateServerErrorCode(
          res,
          400,
          isAdminExist?.error,
          "SOMETHING WENT WRONG",
          "login_admin"
        );
      }
      // if admin did not exists
      else if (!isAdminExist?.data) {
        responseUtil.generateServerErrorCode(
          res,
          409,
          "Cannot find User",
          "Account can't find",
          "login_admin"
        );
      }
      // else no error or admin exists.
      else {
        const isPasswordMatched = await comparePassword(
          password,
          isAdminExist.data?.admin?.password
        );

        if (isPasswordMatched) {
          // if true, then user is granted.
          // create jwt here

          // get token and get back to the user
          const payload = {
            gmail: isAdminExist.data?.admin?.gmail,
            _id: isAdminExist.data?.admin?._id,
          };
          // generate refresh token.

          const { accessToken, refreshToken } = await generateTokens(payload);
          if (accessToken) {
            responseUtil.generateServerResponse(
              res,
              202,
              "token",
              "user's token.",
              {
                accessToken: "Bearer " + accessToken,
                refreshToken: refreshToken,
                success: true,
              },
              "login_admin"
            );
          }
        } else {
          responseUtil.generateServerErrorCode(
            res,
            401,
            "Unauthorized accessed",
            "Wrong Password",
            "login_admin"
          );
        }
      }
    },
  };
};

//   loginAdmin: async(req, res)=>{
//     const errorsAfterValidation = validationResult(req);
//     if(!errorsAfterValidation.isEmpty()){
//         return res.status(400).json({
//             code: 400,
//             errors: errorsAfterValidation.mapped()
//         });
//     }
//     try{
//         // from here I can seperate this as other module
//         const { gmail, password } = req.body;
//         const admin = await stationModel.findOne({"admin.gmail": gmail}).select(["admin"]).exec();
//         console.log("admin", admin)
//         if(admin && admin.admin.gmail){
//             const isPasswordMatched = await comparePassword(password, admin.admin.password)
//             if(isPasswordMatched){
//                 const token = jwt.sign({gmail},jwtConfig.config.secretKey, {expiresIn: 10000000} )
//                 const userToReturn = { ...admin.admin?.toJSON(), ...{ token } };
//                 delete userToReturn.password;
//                 res.status(200).json(userToReturn);
//             }else{
//                 responseUtil.generateServerErrorCode(res, 403, 'login password error', "WRONG_PASSWORD", 'password' )
//             }
//         }
//         else{
//             responseUtil.generateServerErrorCode(res, 200, "error", "Admin not existed")
//         }
//     }catch(err){
//         responseUtil.generateServerErrorCode(res, 404, err, "SOMETHING WENT WRONG")
//     }
// }
