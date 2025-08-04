import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getSessions(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.sessionService.getSessions(query);
  }

  @Get('/:sessionId')
  async getSession(@Param('sessionId') sessionId: string): Promise<any> {
    return this.sessionService.getSession(sessionId);
  }

  @Post()
  async createSession(@Body() createSessionDto: any): Promise<any> {
    return this.sessionService.createSession(createSessionDto);
  }

  @Put('/:sessionId')
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() updateSessionDto: any,
  ): Promise<any> {
    return this.sessionService.updateSession(sessionId, updateSessionDto);
  }

  @Delete('/:sessionId')
  async deleteSession(@Param('sessionId') sessionId: string): Promise<any> {
    return this.sessionService.deleteSession(sessionId);
  }
}

@Controller('users/:userId/sessions')
export class UserSessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getUserSessions(
    @Param('userId') userId: string,
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.sessionService.getUserSessions(userId, query);
  }

  @Post()
  async createUserSession(
    @Param('userId') userId: string,
    @Body() createSessionDto: any,
  ): Promise<any> {
    return this.sessionService.createUserSession(userId, createSessionDto);
  }

  @Delete()
  async deleteUserSessions(@Param('userId') userId: string): Promise<any> {
    return this.sessionService.deleteUserSessions(userId);
  }
} 