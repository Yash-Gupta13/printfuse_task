import { prisma } from "../config/prismaHandler.js";
import { ApiErrorResponse, ApiResponse } from "../utils/ApiResponse.util.js";
import { generateAccessAndRefreshToken } from "../utils/auth.util.js";
import bcrypt from 'bcryptjs'

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return ApiErrorResponse(res, 404, "Please provide mandatory field");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
        return ApiErrorResponse(res, 400, "Email already Exist");
    }

    const saltRound = 10;

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return ApiResponse(res, 200, newUser, "Created Successfully");
  } catch (error) {
    console.log(`Error from register user`, error);
    return ApiErrorResponse(res, 500, "Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return ApiErrorResponse(res, 400, "Please provide mandatory field");
    }

    const userDetail = await prisma.user.findUnique({
      where: { email },
    });

    if (!userDetail) {
      return ApiErrorResponse(res, 400, "Email doesn't exist. Please Signup");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetail.password
    );

    if (!isPasswordCorrect) {
      return ApiErrorResponse(res, 400, "Invalid Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      userDetail.id
    );

    const loginUserDetails = await prisma.user.findUnique({
      where: {
        id: userDetail.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
      });
    return ApiResponse(res, 200, loginUserDetails, "Login Successfully");
  } catch (error) {
    console.error("Error in loginUser:", error);
    return ApiErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

const logoutUser = async (req, res) => {
  try {
    const { id } = req.user;

    const userDetail = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userDetail) {
      return ApiErrorResponse(res, 401, "User Does not exist");
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: null,
      },
    });
    return ApiResponse(res, 200, null, "Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    return ApiErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

export { registerUser, loginUser, logoutUser };
