import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '../users/user.schema';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new training session' })
    @ApiResponse({ status: 201, description: 'Session successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionsService.create(createSessionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all sessions or filter by date/instructor' })
    @ApiQuery({ name: 'startDate', required: false, description: 'Filter sessions after this date (ISO format)' })
    @ApiQuery({ name: 'endDate', required: false, description: 'Filter sessions before this date (ISO format)' })
    @ApiQuery({ name: 'instructor', required: false, description: 'Filter by instructor email' })
    @ApiResponse({ status: 200, description: 'List of sessions' })
    findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('instructor') instructor?: string,
    ) {
        if (startDate && endDate) {
            return this.sessionsService.findByDate(new Date(startDate), new Date(endDate));
        }
        if (instructor) {
            return this.sessionsService.findByInstructor(instructor);
        }
        return this.sessionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get session by ID' })
    @ApiResponse({ status: 200, description: 'Session found' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    findOne(@Param('id') id: string) {
        return this.sessionsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update session by ID' })
    @ApiResponse({ status: 200, description: 'Session successfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.sessionsService.update(id, updateSessionDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete session by ID' })
    @ApiResponse({ status: 204, description: 'Session successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(id);
    }

    @Post(':id/signup')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Sign up current user to a session' })
    @ApiResponse({ status: 200, description: 'Successfully signed up to session' })
    @ApiResponse({ status: 400, description: 'User already signed up' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    signupToSession(@Param('id') id: string, @CurrentUser() user: any) {
        return this.sessionsService.signupToSession(id, user.userId.toString());
    }

    @Post(':id/remove')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remove current user from a session' })
    @ApiResponse({ status: 200, description: 'Successfully removed from session' })
    @ApiResponse({ status: 400, description: 'User not signed up for this session' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    removeFromSession(@Param('id') id: string, @CurrentUser() user: any) {
        return this.sessionsService.removeFromSession(id, user.userId.toString());
    }
}