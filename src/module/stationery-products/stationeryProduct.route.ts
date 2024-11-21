import { Router } from "express"
import { StationeryProductControllers } from "./stationeryProduct.controller";

const stationeryProductRouter = Router();

stationeryProductRouter.post('/' , StationeryProductControllers.createProduct)

export default stationeryProductRouter;