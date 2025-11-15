import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto, UpdateRoutineDto } from './dto/routine.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';

@ApiTags('routines')
@Controller('routines')
export class RoutinesController {
    constructor(private readonly routinesService: RoutinesService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new routine with embedded exercises' })
    @ApiResponse({ status: 201, description: 'Routine successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    create(@Body() createRoutineDto: CreateRoutineDto) {
        return this.routinesService.create(createRoutineDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all routines' })
    @ApiResponse({ status: 200, description: 'List of routines' })
    findAll() {
        return this.routinesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get routine by ID' })
    @ApiResponse({ status: 200, description: 'Routine found' })
    @ApiResponse({ status: 404, description: 'Routine not found' })
    findOne(@Param('id') id: string) {
        return this.routinesService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update routine by ID' })
    @ApiResponse({ status: 200, description: 'Routine successfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Routine not found' })
    update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
        return this.routinesService.update(id, updateRoutineDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete routine by ID' })
    @ApiResponse({ status: 204, description: 'Routine successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Routine not found' })
    remove(@Param('id') id: string) {
        return this.routinesService.remove(id);
    }
}