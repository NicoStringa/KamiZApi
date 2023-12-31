import { NextFunction, Request, Response } from "express";

import { ROLES } from "../helpers/constans";

export const isAdmin = (req: Request, res:Response, next:NextFunction) => {
    const {rol} = req.body.userConfirmed

    if(rol !== ROLES.admin) {
        res.status(401).json({
            msg: "The user is not an admin"
        }) 
        return
    }

    next()
}