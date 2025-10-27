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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExerciseCategoriesService } from './categories.service';
import { CreateExerciseCategoryDto, UpdateExerciseCategoryDto } from './dto/category.dto';

@ApiTags('exercise-categories')
@Controller('exercise-categories')
export class ExerciseCategoriesController {
    constructor(private readonly categoriesService: ExerciseCategoriesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new exercise category' })
    @ApiResponse({ status: 201, description: 'Category successfully created' })
    create(@Body() createCategoryDto: CreateExerciseCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all exercise categories' })
    @ApiResponse({ status: 200, description: 'List of categories' })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by ID' })
    @ApiResponse({ status: 200, description: 'Category found' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category by ID' })
    @ApiResponse({ status: 200, description: 'Category successfully updated' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateExerciseCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete category by ID' })
    @ApiResponse({ status: 204, description: 'Category successfully deleted' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}