import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/users.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksRepository {
  private logger = new Logger('TasksRepository');

  constructor(
    @InjectRepository(Task)
    private readonly taskEntityRepository: Repository<Task>,
  ) {}

  async findById(id: string, user: Users): Promise<Task> {
    try {
      const task = await this.taskEntityRepository.findOneBy({ id, user });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      this.logger.error(
        `Error occured when retrieving the task with taskId ${id}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: Users): Promise<Task> {
    try {
      const { title, description } = createTaskDto;
      const task = this.taskEntityRepository.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user,
      });

      await this.taskEntityRepository.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        `Error occured when creating the task with ${JSON.stringify(
          createTaskDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteTaskById(taskId: string, user: Users): Promise<void> {
    try {
      const result = await this.taskEntityRepository.delete({
        id: taskId,
        user,
      });
      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }
    } catch (error) {
      this.logger.error(
        `Error occured when deleting the taskId ${taskId}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateTaskStatus(
    taskId: string,
    status: TaskStatus,
    user: Users,
  ): Promise<Task> {
    try {
      const task = await this.findById(taskId, user);
      task.status = status;
      await this.taskEntityRepository.save(task);
      return task;
    } catch (error) {
      this.logger.error(`Error occured when updating TaskStatus`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getTasks(filterTaskDto: FilterTaskDto, user: Users): Promise<Task[]> {
    const { search, status } = filterTaskDto;
    try {
      const query = await this.taskEntityRepository.createQueryBuilder('task');
      query.where({ user });
      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          {
            search: `%${search}%`,
          },
        );
      }
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to getTasks with status ${status} and username ${user.username}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
