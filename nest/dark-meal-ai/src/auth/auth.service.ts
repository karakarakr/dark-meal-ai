import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
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

        const retrievedUser = { id: user.id, email: user.email };
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_ACCESS_KEY'),
            // expiresIn: '15m',
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
            expiresIn: '30d',
        });

        // response.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     maxAge: 30 * 24 * 60 * 60 * 1000,
        // });

        return {
            retrievedUser,
            accessToken,
            refreshToken
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
            // expiresIn: '15m',
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
            expiresIn: '30d',
        });

        return {
            accessToken
        };
    }

    async logout(response: any) {
        response.clearCookie('refreshToken');
        return { message: 'Logout successful' };
    }

    async verifyRefreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
            });
            return payload;
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    async getMe(req: any) {
        if (!req.user) {
            throw new UnauthorizedException('Invalid or expired access token');
        }
        return req.user;
    }

    async generateAccessToken(userId: number) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_ACCESS_KEY'),
            expiresIn: '15m',
        });
    }
}
