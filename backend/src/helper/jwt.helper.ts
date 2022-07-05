import { Response } from "express";
import * as jwt from 'jsonwebtoken';
import secret from "./secret";

export default {
    issueJwt : (id : string) => {
        let jwtContent = {
            id: id
        };

        return jwt.sign(jwtContent, secret.jwtsecret,
            {
                algorithm: 'HS256',
                expiresIn : '1h'
            })
    }
}