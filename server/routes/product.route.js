import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/product.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router()

router.use(verifyJWT)
router.route("/").post(createProduct).get(getProducts)
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct)


export default router