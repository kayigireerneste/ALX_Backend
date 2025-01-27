import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import mainRouter from "./src/routes";
import "dotenv/config";


const port = 4000;
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/api/v1", mainRouter);

// Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VI-Connect-e-commerce api doc",
      version: "1.0.0",
      description: "E-Commerce apis doc",
      contact: {
        name: "Api",
        email: "lilyanassoum@gmail.com",
      },
    },
    servers: [
      { url: "http://localhost:4000/api/v1"},

      { url: "https://vi-connect-e-commerce-api.onrender.com/api/v1"},
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs",
 swaggerUI.serve, 
 swaggerUI.setup(specs)
 );

mongoose.connect(process.env.DB_CONNECTION_PROD).then((res) => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
