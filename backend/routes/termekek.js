import express from "express";
import termekController from "../controllers/termekController.js";

const router = express.Router();


router.get("/", termekController.getAll);
router.get("/:id", termekController.getById);
router.post("/", termekController.create);

export default router;