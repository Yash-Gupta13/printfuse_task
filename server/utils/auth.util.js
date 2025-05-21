import { prisma } from "../config/prismaHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const userDetail = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    const accessToken = await generateAccessToken(userDetail);
    const refreshToken = await generateRefreshToken(userDetail);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    return null
  }
};

const generateAccessToken = async (userDetail) => {
  const { id, email, name } = userDetail;

  return await jwt.sign(
    {
      id: id,
      email: email,
      name: name,
    },
    process.env.ACCESSTOKEN_SECRET || "yash",
    {
      expiresIn: process.env.ACCESSTOKEN_EXPIRY || "5h",
    }
  );
};

const generateRefreshToken = async (userDetail) => {
  const { id } = userDetail;

  return await jwt.sign(
    {
      id: id,
    },
    process.env.REFRESHTOKEN_SECRET || "yash",
    {
      expiresIn: process.env.REFRESHTOKEN_EXPIRY || "1d",
    }
  );
};

export { generateAccessAndRefreshToken };
