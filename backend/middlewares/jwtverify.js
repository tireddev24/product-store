import pkg from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";

const { JsonWebTokenError, TokenExpiredError, verify } = pkg;

export const verifyJwt = (req, res, next) => {
  const access_token = req.cookies.authToken;

  if (!access_token) {
    res.status(400).json({
      success: false,
      message: "No Authorization Token Provided. Please Login",
    });
    return;
  }

  const token = access_token;

  try {
    const user = verify(token, JWT_SECRET);

    req.user = user;
    next();
    return;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json("Token Expired");
      return;
    }
    if (error instanceof JsonWebTokenError) {
      res.status(403).json("Invalid Token");
      return;
    }
    res.status(500).json("Server Error");
    return;
  }
};
