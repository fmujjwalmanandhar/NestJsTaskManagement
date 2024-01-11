import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus, Tasks } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getFilterTasks(filterTaskDto: FilterTaskDto): Tasks[] {
    const { status, search } = filterTaskDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    if (!tasks) {
      throw new NotFoundException(`Task not found`);
    }
    return tasks;
  }

  createTasks(createTaskDto: CreateTaskDto): Tasks {
    const { title, description } = createTaskDto;
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(taskId: string): Tasks {
    const task = this.tasks.find((tasks) => tasks.id === taskId);
    if (task) {
      return task;
    }
    throw new NotFoundException(`Task with id ${taskId} not found.`);
  }

  deleteTaskById(taskId: string): void {
    this.getTaskById(taskId);

    this.tasks = this.tasks.filter((tasks) => tasks.id !== taskId);
  }

  updateTask(id: string, status: TaskStatus): Tasks {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
      return task;
    }
    throw new NotFoundException(`Task ID ${id} doesn't exits`);
  }
}
