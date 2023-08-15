import { Router } from "express";
import { check } from "express-validator";
import { getOrders, createOrder } from "../controllers/orders"
import { collectErrors } from "../middlewares/collectErrors";
import validateJWT from "../middlewares/validateJWT";
import { isVerified } from "../middlewares/validateVerified";

const router = Router()

router.get("/", [validateJWT, collectErrors], getOrders)

router.post("/", [validateJWT, isVerified,
    
    check("price", "The price is required").not().isEmpty(),
    check("shippingCost", "The shipping cost is required").not().isEmpty(),
    check("total", "The total is required").not().isEmpty(),
    check("shippingDetails", "The shipping details are required").not().isEmpty(),
    check("items", "The products array is required").not().isEmpty(),
    
    collectErrors

], 
createOrder
);

export default router