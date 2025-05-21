import { prisma } from "../config/prismaHandler.js";
import jwt from "jsonwebtoken";
import { ApiErrorResponse } from "../utils/ApiResponse.util.js";

const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
    return ApiErrorResponse(res, 401, "Session Expired . Please login");
    }

    const decodedToken = await jwt.verify(
      accessToken,
      process.env.ACCESSTOKEN_SECRET || "yash"
    );

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
        return ApiErrorResponse(
          res,
          401,
          "Account not found please verify credentials"
        );
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(`Error in verifying the JWT`, error.message);
    return ApiErrorResponse(res,500, "Unauthorized Access");
  }
};

export { verifyJWT };
