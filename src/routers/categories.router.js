import { Router } from "express";

const router = Router();

router.get("/", getAllCategoriesByUser);
router.get("/");

export default router; // categoriesRouter
