const userProfile = async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    res.send("error in user profile");
  }
};
module.exports = userProfile;
