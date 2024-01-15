import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class UpadateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
