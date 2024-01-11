import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
