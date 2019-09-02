import { Controller, Body, Post, Inject } from '@nestjs/common';
import { AuthCredentialDto } from './dto/aut.credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
        //
    }

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }
}
