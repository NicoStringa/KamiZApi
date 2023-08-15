import { Router } from "express";
import { check } from "express-validator";
import { existingEmail } from "../helpers/validationsDB";
import { collectErrors } from "../middlewares/collectErrors";
import { register, veriyUser, login } from "../controllers/auth";

const router = Router()

router.post("/register",[
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password must have 6 characters min").isLength({
        min:6
    }),
    //Custom Validation
    check("email").custom(existingEmail),
    //Custom Middleware
    collectErrors,
], 
register
);

router.patch("/verify" ,[
    check("email", "The email is required").isEmail(),
    check("code", "The verification code is required").not().isEmpty(),
    collectErrors,
],
veriyUser
);

router.post("/login" ,[
    check("email", "The email is required").isEmail(),
    check("password", "The password must have 6 characters min").isLength({
        min:6
    }),
    collectErrors,
],
login
);

export default router