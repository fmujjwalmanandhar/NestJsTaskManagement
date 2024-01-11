import { TaskStatus } from '../tasks.model';

export interface FilterTaskDto {
  status?: TaskStatus;
  search?: string;
}
