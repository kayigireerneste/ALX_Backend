import express from "express";

import authRouter from "./autheRouter";
import UserRouter from "./userRouter";

import prodCategoryRouter, { brandrouter, colorRouter }  from "./categoryRouter";
import ProductRouter from "./productRouter";
import CartRouter from "./cartRouter";

import { globalControllerHandler, handleNotFoundError } from "../middleWare";
import orderRouter from "./orderRouter";
import contactRouter from "./contactRouter";
import paymentRouter from "./paymentRouter";
import chartRoute from "./chartsRoute";
import blogRoute from "./blogRoute";


const mainRouter = express.Router();
 
mainRouter.use("/auth",authRouter);

mainRouter.use("/user",UserRouter);

mainRouter.use("/category",prodCategoryRouter);

mainRouter.use("/product",ProductRouter);

mainRouter.use("/cart", CartRouter);

mainRouter.use("/brand", brandrouter);

mainRouter.use("/color",colorRouter);

mainRouter.use("/order", orderRouter);

mainRouter.use("/",contactRouter);

mainRouter.use("/payment",paymentRouter),
 
mainRouter.use("/",chartRoute);

mainRouter.use("/blog",blogRoute);

//mainRouter.use(handleNotFoundError);  // Handling 404 errors


mainRouter.use (globalControllerHandler);   // Global error handler



  



export default mainRouter;