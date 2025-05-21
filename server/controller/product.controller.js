import { prisma } from "../config/prismaHandler.js";
import { ApiErrorResponse, ApiResponse } from "../utils/ApiResponse.util.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, productImage } = req.body;

    if (!name || !price) {
      return ApiErrorResponse(res, 404, "Please provide mandatory field");
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (existingProduct) {
      return ApiErrorResponse(res, 400, "Product already exist");
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        productImage: productImage || "",
      },
    });

    return ApiResponse(res, 200, product, "Created Successfully");
  } catch (error) {
    console.log(`Error from creating product`, error);
    return ApiErrorResponse(res, 500, "Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, productImage } = req.body;

    if (!name || !price) {
      return ApiErrorResponse(res, 404, "Mandatory field cant be empty");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return ApiErrorResponse(res, 404, "Product does not exist");
    }

    const existingProduct = await prisma.product.findUnique({
      where: { name },
    });

    if (existingProduct) {
      return ApiErrorResponse(res, 404, "Product is there already");
    }

    const createdProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
        productImage,
      },
    });

    return ApiResponse(res, 200, createdProduct, "Updated Successfully");
  } catch (error) {
    console.log(`Error from updating product`, error);
    return ApiErrorResponse(res, 500, "Internal Server Error");
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    if (!products) {
      return ApiErrorResponse(res, 404, "No product is found");
    }

    return ApiResponse(res, 200, products, "Fetched Successfully");
  } catch (error) {
    console.log(`Error from getting all products`, error);
    return ApiErrorResponse(res, 500, "Internal Server Error");
  }
};
const getProduct = async (req, res) => {
    try {
        const {id} = req.params

        const products = await prisma.product.findUnique({
            where:{id:Number(id)}
        })

        if(!products){
            return ApiErrorResponse(res, 404, "No product is found");
        }

        return ApiResponse(res, 200, products, "Fetched Successfully");

    } catch (error) {
        console.log(`Error from getting product`, error);
        return ApiErrorResponse(res, 500, "Internal Server Error");
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const products = await prisma.product.findUnique({
          where: { id: Number(id) },
        });

        if (!products) {
          return ApiErrorResponse(res, 404, "No product is found");
        }

        const deletedProduct = await prisma.product.delete({
            where:{id:Number(id)}
        })

        if(!deleteProduct){
            return ApiErrorResponse(res, 404, "Error while deleting");
        }

        return ApiResponse(res, 200, null, "Deleted Successfully");

    } catch (error) {
        console.log(`Error from deleting product`, error);
        return ApiErrorResponse(res, 500, "Internal Server Error");
    }
};

export { createProduct, updateProduct, getProducts, getProduct, deleteProduct };
