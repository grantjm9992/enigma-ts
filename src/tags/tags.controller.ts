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
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new tag' })
    @ApiResponse({ status: 201, description: 'Tag successfully created' })
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
    @ApiOperation({ summary: 'Update tag by ID' })
    @ApiResponse({ status: 200, description: 'Tag successfully updated' })
    @ApiResponse({ status: 404, description: 'Tag not found' })
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagsService.update(id, updateTagDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete tag by ID' })
    @ApiResponse({ status: 204, description: 'Tag successfully deleted' })
    @ApiResponse({ status: 404, description: 'Tag not found' })
    remove(@Param('id') id: string) {
        return this.tagsService.remove(id);
    }
}