import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(private taskEntityRepository: TasksRepository) {}

  getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.taskEntityRepository.getTasks(filterTaskDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskEntityRepository.createTask(createTaskDto);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.taskEntityRepository.updateTaskStatus(id, status);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskEntityRepository.findById(id);
  }

  deleteTaskById(taskId: string): Promise<void> {
    return this.taskEntityRepository.deleteTaskById(taskId);
  }
}
