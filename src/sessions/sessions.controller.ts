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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new training session' })
    @ApiResponse({ status: 201, description: 'Session successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
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
    @ApiOperation({ summary: 'Update session by ID' })
    @ApiResponse({ status: 200, description: 'Session successfully updated' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.sessionsService.update(id, updateSessionDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete session by ID' })
    @ApiResponse({ status: 204, description: 'Session successfully deleted' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(id);
    }
}