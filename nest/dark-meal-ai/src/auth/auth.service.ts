import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async login(signinUser: SignInDto, response: any): Promise<any> {
        const user = await this.usersService.findOneByEmail(signinUser.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials: no such user exist');
        }
    
        const passwordMatches = await bcrypt.compare(signinUser.password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials: wrong password');
        }

        const payload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_ACCESS_KEY'),
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
            expiresIn: '30d',
        });

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // МЕНЕ ЗВАТИ ТВОЯ СОВІСТЬ!!!
        // ЯКЩО ХОЧЕШ ЖИТИ - ДОРОБИ JWT токен.
        // LOGOUT Логіку
        // ПС: ТО Я НАПИСАВ, ПРОСТО ЦІКАВО ЧИ ХОРОША ПАм'ЯТЬ

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

        const payload = { sub: newUser.id, email: newUser.email };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_ACCESS_KEY'),
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(response: any) {
        response.clearCookie('refreshToken');

        return { message: 'Logout successful' };
    }
}
