module.exports = (query, responseUtil) => {
  return {
    getPersonelProfile: async (req, res) => {
      console.log("get profile p[ersonel req.user",req.user )
      const userGmail = req.user?.gmail
      const personel = await query.getProfile({gmail: userGmail});
      if (personel?.data && !personel.error) {
        responseUtil.generateServerResponse(
          res,
          200,
          "delivery personel profile",
          "success",
          personel.data,
          "personel_profile"
        );
      } else {
        console.log("personel.error",personel.error)
        responseUtil.generateServerErrorCode(
          res,
          400,
          "delivery personel profile ERROR",
          "Something went wrong, please try again.",
          "personel_profile"
        );
      }
    },
  };
};
