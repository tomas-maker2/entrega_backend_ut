import { Router } from "express";
import { FakerController } from "../controllers/faker.js";

const fakerController = new FakerController();

const router = Router();

router.get('/', fakerController.execute)

export default router