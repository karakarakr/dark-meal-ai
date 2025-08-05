import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(signinUser: SignInDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(signinUser.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials: no such user exist');
        }
    
        const passwordMatches = await bcrypt.compare(signinUser.password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials: wrong password');
        }

        const payload = { email: user.email };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async register(signupUser: SignUpDto): Promise<any> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(signupUser.password, saltRounds);
        const newUser = await this.usersService.create({
            ...signupUser,
            password: hashedPassword,
        });

        const payload = { email: newUser.email };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
