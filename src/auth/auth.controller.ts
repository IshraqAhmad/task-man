import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/aut.credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
        //
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    //@Post('/test')
    //@UseGuards(AuthGuard())
    //test(@GetUser() user: User) {
    //    console.log(user);
    //}
}
