import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { PassportStrategy } from '@nestjs/passport';
  import { ExtractJwt, Strategy } from 'passport-jwt';  // Use passport-jwt strategy
  import { User } from './schemas/user.schemas';
  import { Model } from 'mongoose';
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectModel(User.name)
      private userModel: Model<User>,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract JWT from Bearer Token
        secretOrKey: process.env.JWT_SECRET,  // Use the environment variable for the secret key
      });
    }
  
    async validate(payload: any) {  // Define the payload type as 'any' or more specific
      const { id } = payload;
      const user = await this.userModel.findById(id);
  
      if (!user) {
        throw new UnauthorizedException('Login first to access this endpoint');
      }
      return user;  // Return the user object if validated successfully
    }
  }
  