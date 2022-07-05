import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interface/user.interface';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtHelper from 'src/helper/jwt.helper';
import secret from 'src/helper/secret';


@Controller('/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    
    @Get('/all')
    async findAll() : Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    async createUser (@Body() user : UserDto, @Res({passthrough: true}) res : Response) {
        let id = (await this.userService.create(user));
        res.status(200).cookie('id', jwtHelper.issueJwt(id), {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });
    }

    @Post('/authn')
    async authUser(@Body() user: UserDto, @Res({passthrough: true}) res : Response) {
        let id = await this.userService.auth(user);

        if(id === '') {
            res.status(401).cookie('id', null, {
                secure : false,
                httpOnly : true,
                maxAge : 0
            })
            .send({error : 'Unauthorized'});
            return;
        }

        res.status(200).cookie('id', jwtHelper.issueJwt(id), {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });
    }

    @Get()
    async getUser(@Req() req : Request, @Res() res : Response) {
        let user = await this.userService.identify(jwt.verify(req.cookies.id, secret.jwtsecret)['id']);
        res.status(200).send({
            success: 'Authorized',
            user : {
                username : user.username,
                email : user.email
            }
        });
    }

    @Get('/logout')
    async logoutUser(@Res({passthrough : true}) res : Response) {
        res.cookie('id', null, {
            maxAge : 1,
            secure : false,
            httpOnly : true
        })
    }
}
