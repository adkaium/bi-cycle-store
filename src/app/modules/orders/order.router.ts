import express from "express";
import { orderCotroller } from "./order.controller";

const router = express.Router();


// Create a new order
router.post('/',orderCotroller.createNewOrder);

// Get total revenue
router.get('/revenue',orderCotroller.getRevenue);


export const OrderRoutes = router;