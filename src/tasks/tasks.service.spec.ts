import { Test } from '@nestjs/testing';
import { TasksRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  findById: jest.fn(),
});

const mockUser = {
  id: '1',
  username: 'ujjwal.manandhar',
  password: 'Test12345',
  appversioninfo: '5.1.0',
  tasks: [],
};
const taskObj = {
  title: 'Task Title',
  description: 'Task Description',
};
const mockTask = {
  id: 'someid',
  title: 'Some Title',
  description: 'Some Title',
  status: 'DONE',
};

describe('TasksService', () => {
  let taskService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    taskService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });
  describe('getTasks', () => {
    it('Calls TasksRepository.getTasks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('something');
      const result = await taskService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('something');
    });
  });

  describe('createTask', () => {
    it('Calls TasksRepository.createTask and returns the result', async () => {
      expect(tasksRepository.createTask).not.toHaveBeenCalled();
      tasksRepository.createTask.mockResolvedValue('task-created');
      const result = await taskService.createTask(taskObj, mockUser);
      expect(tasksRepository.createTask).toHaveBeenCalled();
      expect(result).toEqual('task-created');
    });
  });

  describe('getTaskById', () => {
    it('Calls TasksRepository.findById and returns the result', async () => {
      tasksRepository.findById.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('someid', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('Calls TasksRepository.findById and returns the error', async () => {
      tasksRepository.findById.mockResolvedValue(null);
      const result = await taskService.getTaskById('someid', mockUser);
      expect(result).rejects.toThrow();
    });
  });
});
