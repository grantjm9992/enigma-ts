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
import { ExerciseCategoriesService } from './categories.service';
import { CreateExerciseCategoryDto, UpdateExerciseCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';

@ApiTags('exercise-categories')
@Controller('exercise-categories')
export class ExerciseCategoriesController {
    constructor(private readonly categoriesService: ExerciseCategoriesService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new exercise category' })
    @ApiResponse({ status: 201, description: 'Category successfully created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update category by ID' })
    @ApiResponse({ status: 200, description: 'Category successfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateExerciseCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete category by ID' })
    @ApiResponse({ status: 204, description: 'Category successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}