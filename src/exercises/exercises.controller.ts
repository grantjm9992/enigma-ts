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
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new exercise' })
    @ApiResponse({ status: 201, description: 'Exercise successfully created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all exercises or filter by categoryId/tagIds' })
    @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID' })
    @ApiQuery({ name: 'tagIds', required: false, description: 'Comma-separated list of tag IDs' })
    @ApiResponse({ status: 200, description: 'List of exercises' })
    findAll(@Query('categoryId') categoryId?: string, @Query('tagIds') tagIds?: string) {
        if (categoryId) {
            return this.exercisesService.findByCategory(categoryId);
        }
        if (tagIds) {
            const tagArray = tagIds.split(',');
            return this.exercisesService.findByTags(tagArray);
        }
        return this.exercisesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get exercise by ID' })
    @ApiResponse({ status: 200, description: 'Exercise found' })
    @ApiResponse({ status: 404, description: 'Exercise not found' })
    findOne(@Param('id') id: string) {
        return this.exercisesService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update exercise by ID' })
    @ApiResponse({ status: 200, description: 'Exercise successfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Exercise not found' })
    update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
        return this.exercisesService.update(id, updateExerciseDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete exercise by ID' })
    @ApiResponse({ status: 204, description: 'Exercise successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Exercise not found' })
    remove(@Param('id') id: string) {
        return this.exercisesService.remove(id);
    }
}