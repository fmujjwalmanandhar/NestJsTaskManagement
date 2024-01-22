import { Injectable } from '@nestjs/common';
import { Users } from '../auth/users.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(private taskEntityRepository: TasksRepository) {}

  getTasks(filterTaskDto: FilterTaskDto, user: Users): Promise<Task[]> {
    return this.taskEntityRepository.getTasks(filterTaskDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: Users): Promise<Task> {
    return this.taskEntityRepository.createTask(createTaskDto, user);
  }

  updateTaskStatus(id: string, status: TaskStatus, user: Users): Promise<Task> {
    return this.taskEntityRepository.updateTaskStatus(id, status, user);
  }

  getTaskById(id: string, user: Users): Promise<Task> {
    return this.taskEntityRepository.findById(id, user);
  }

  deleteTaskById(taskId: string, user: Users): Promise<void> {
    return this.taskEntityRepository.deleteTaskById(taskId, user);
  }
}
