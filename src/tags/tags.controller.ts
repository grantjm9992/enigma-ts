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
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new tag' })
    @ApiResponse({ status: 201, description: 'Tag successfully created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.create(createTagDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tags' })
    @ApiResponse({ status: 200, description: 'List of tags' })
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get tag by ID' })
    @ApiResponse({ status: 200, description: 'Tag found' })
    @ApiResponse({ status: 404, description: 'Tag not found' })
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update tag by ID' })
    @ApiResponse({ status: 200, description: 'Tag successfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Tag not found' })
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagsService.update(id, updateTagDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TRAINER)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete tag by ID' })
    @ApiResponse({ status: 204, description: 'Tag successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin or Trainer role required' })
    @ApiResponse({ status: 404, description: 'Tag not found' })
    remove(@Param('id') id: string) {
        return this.tagsService.remove(id);
    }
}