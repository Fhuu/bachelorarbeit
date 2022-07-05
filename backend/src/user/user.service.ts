import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>) {

    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }
    
    async create(user: UserDto): Promise<string> {
        user.password = bcrypt.hashSync(user.password, 10);
        let userToAdd = new this.userModel(user);
        return (await userToAdd.save()).toObject()._id;
    }

    async auth(user : UserDto): Promise<string> {
        let foundUser = await this.userModel.findOne({username: user.username}, {password: true});
        
        if(foundUser == null) return '';

        if(await bcrypt.compare(user.password, foundUser.password)) return foundUser._id;
        return '';
    }

    async identify(user_id : string) : Promise<User> {
        return await this.userModel.findById(user_id);
    }
}