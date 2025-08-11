import { Controller, Post, Body, UseGuards, Request, Res, Get, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { OptionalJwtAuthGuard } from './optional-jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get('me')
    async me(@Request() req) {
        return req.user;
    }

    @Post('login')
    async login(
        @Body() SignInDto: SignInDto,
        @Res({ passthrough: true }) response: Response
    ) {
        
        const { retrievedUser, accessToken, refreshToken } = await this.authService.login(SignInDto, response);
        console.log(JSON.stringify(retrievedUser));
        // response.setCookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
        // });

        return { retrievedUser, accessToken, refreshToken };
    }

    @Post('register')
    async register(@Body() SignUpDto: SignUpDto) {
        return this.authService.register(SignUpDto);
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response);
    }

    @Post('refresh')
    async refresh(@Request() req) {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) throw new UnauthorizedException();
    
        const payload = await this.authService.verifyRefreshToken(refreshToken);
        const accessToken = await this.authService.generateAccessToken(payload.sub);

        return { accessToken }
    }    
}
