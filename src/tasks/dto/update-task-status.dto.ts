import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpadateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
