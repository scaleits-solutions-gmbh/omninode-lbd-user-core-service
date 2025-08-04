import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: any): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  async logout(@Body() logoutDto: any): Promise<any> {
    return this.authService.logout(logoutDto);
  }

  @Post('/refresh')
  async refresh(@Body() refreshDto: any): Promise<any> {
    return this.authService.refresh(refreshDto);
  }

  @Get('/me')
  async getCurrentUser(): Promise<any> {
    return this.authService.getCurrentUser();
  }
}

@Controller('users/:userId/auth')
export class UserAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/status')
  async getUserAuthStatus(@Param('userId') userId: string): Promise<any> {
    return this.authService.getUserAuthStatus(userId);
  }

  @Post('/disable')
  async disableUserAccount(@Param('userId') userId: string): Promise<any> {
    return this.authService.disableUserAccount(userId);
  }

  @Post('/enable')
  async enableUserAccount(@Param('userId') userId: string): Promise<any> {
    return this.authService.enableUserAccount(userId);
  }
}
