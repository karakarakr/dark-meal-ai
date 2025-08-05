import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() SignInDto: SignInDto) {
        return this.authService.login(SignInDto);
    }

    @Post('register')
    register(@Body() SignUpDto: SignUpDto) {
        return this.authService.register(SignUpDto);
    }
}
