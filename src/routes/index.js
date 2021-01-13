import express from "express";
import RouterHandler from "./router";

import PlanetsController from '../controllers/planetsController';
import Planet from '../models/planet';

const router = express.Router();

const controllers = [new PlanetsController(Planet, '/planets')];
const routerHandler = new RouterHandler(router, controllers);
routerHandler.registerRoutes();

router.get("/", (request, response) =>
  response.json({
    message: "API Star Wars!"
  })
);

export default router;