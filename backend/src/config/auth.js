import jwt from "jsonwebtoken";
process.loadEnvFile();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// export const isAuth = async (req, res, next) => {

//   try {
//     const { token } = req.cookies.token;
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         success: " false",
//       });
//     }
//     const decode = await jwt.verify(token, TOKEN_SECRET);
//     console.log(decode);
//     req.user = decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
export const isAuth = async (req, res, next) => {
  try {
    // Access the token from cookies
    const { token } = req.cookies;
    // console.log("token:" + token);
    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token
    const decode = await jwt.verify(token, TOKEN_SECRET);
    // console.log(decode);

    // Attach user info to the request object
    req.user = decode.id;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Handle invalid token error
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};
