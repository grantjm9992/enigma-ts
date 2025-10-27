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
import { RoutinesService } from './routines.service';
import { CreateRoutineDto, UpdateRoutineDto } from './dto/routine.dto';

@Controller('routines')
export class RoutinesController {
    constructor(private readonly routinesService: RoutinesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createRoutineDto: CreateRoutineDto) {
        return this.routinesService.create(createRoutineDto);
    }

    @Get()
    findAll() {
        return this.routinesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.routinesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
        return this.routinesService.update(id, updateRoutineDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.routinesService.remove(id);
    }
}