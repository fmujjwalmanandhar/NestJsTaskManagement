import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Users } from '../auth/users.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpadateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');
  constructor(
    private tasksService: TasksService,
    private configService: ConfigService,
  ) {
    console.log({ configService: configService.get('SOME_DEV') });
  }

  @Get()
  getTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @GetUser() user: Users,
  ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} is trying to access Tasks`);
    return this.tasksService.getTasks(filterTaskDto, user);
  }

  @Post()
  createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: Users /*** Custom decorator */,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:taskId')
  getTaskById(
    @Param('taskId') taskId: string,
    @GetUser() user: Users,
  ): Promise<Task> {
    return this.tasksService.getTaskById(taskId, user);
  }

  @Delete('/:taskId')
  deleteTaskById(
    @Param('taskId') taskId: string,
    @GetUser() user: Users,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(taskId, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpadateTaskStatusDto,
    @GetUser() user: Users,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
