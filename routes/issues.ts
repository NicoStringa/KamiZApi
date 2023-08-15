import { Router } from "express";

import { postNewIssue } from "../controllers/issues";
import validateJWT from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/validateRol";

import { check } from "express-validator";
import { collectErrors } from "../middlewares/collectErrors";


const router = Router()

router.post("/",[validateJWT, isAdmin,
    check("title", "The title is required").not().isEmpty(),
    check("desc", "The description is required").not().isEmpty(),
    check("priority", "The priority is required").not().isEmpty(),
    collectErrors
], postNewIssue)

export default router