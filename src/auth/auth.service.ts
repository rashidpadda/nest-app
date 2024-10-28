import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignupDto) {
    const { name, email, password , role} = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new HttpException(
        'Email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
