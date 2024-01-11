import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpadateTaskStatusDto } from './dto/update-task-status.dto';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDto: FilterTaskDto): Tasks[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.getFilterTasks(filterTaskDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto): Tasks {
    return this.tasksService.createTasks(createTaskDto);
  }

  @Get('/:taskId')
  getTaskById(@Param('taskId') taskId: string): Tasks {
    return this.tasksService.getTaskById(taskId);
  }

  @Delete('/:taskId')
  deleteTaskById(@Param('taskId') taskId: string): void {
    return this.tasksService.deleteTaskById(taskId);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpadateTaskStatusDto,
  ): Tasks {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTask(id, status);
  }
}
