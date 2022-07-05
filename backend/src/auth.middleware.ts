import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import helper from './helper/secret';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.path);
    try {
      let user = jwt.verify(req.cookies.id, helper.jwtsecret);
      req.user = user['id'];
      next();
    }
    catch(JsonWebTokenError) {
      return res.status(401).send({
        error: 'Unauthorized'
      });
    }
    
  }
}
