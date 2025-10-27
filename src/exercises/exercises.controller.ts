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
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new exercise' })
    @ApiResponse({ status: 201, description: 'Exercise successfully created' })
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all exercises or filter by category/tags' })
    @ApiQuery({ name: 'category', required: false })
    @ApiQuery({ name: 'tags', required: false, description: 'Comma-separated list of tags' })
    @ApiResponse({ status: 200, description: 'List of exercises' })
    findAll(@Query('category') category?: string, @Query('tags') tags?: string) {
        if (category) {
            return this.exercisesService.findByCategory(category);
        }
        if (tags) {
            const tagArray = tags.split(',');
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
    @ApiOperation({ summary: 'Update exercise by ID' })
    @ApiResponse({ status: 200, description: 'Exercise successfully updated' })
    @ApiResponse({ status: 404, description: 'Exercise not found' })
    update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
        return this.exercisesService.update(id, updateExerciseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete exercise by ID' })
    @ApiResponse({ status: 204, description: 'Exercise successfully deleted' })
    @ApiResponse({ status: 404, description: 'Exercise not found' })
    remove(@Param('id') id: string) {
        return this.exercisesService.remove(id);
    }
}