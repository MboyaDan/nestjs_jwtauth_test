import { Body, Controller, Get, Post } from '@nestjs/common';  
import { AuthService } from './auth.service'; 

import { AuthDto } from './dto'; 
// Define the AuthController that will handle incoming authentication-related HTTP requests /creating endpoints
//global prefix: /auth
@Controller('auth')

export class AuthController {
// Inject AuthService to handle business logic
constructor(private authService: AuthService) {}

@Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

@Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}