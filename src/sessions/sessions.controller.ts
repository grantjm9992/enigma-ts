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
import { SessionsService } from './sessions.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionsService.create(createSessionDto);
    }

    @Get()
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
    findOne(@Param('id') id: string) {
        return this.sessionsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.sessionsService.update(id, updateSessionDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(id);
    }
}