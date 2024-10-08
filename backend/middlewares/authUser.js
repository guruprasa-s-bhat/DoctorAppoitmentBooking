import jwt from "jsonwebtoken";

//User Authentication middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export default authUser;
