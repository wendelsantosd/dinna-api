import { Body, Controller } from '@nestjs/common';
import { AuthDTO } from './dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(@Body() authDTO: AuthDTO): Promise<{ token: string }> {
    return await this.authService.signIn(authDTO);
  }
}
