import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseDataController } from './expense-data.controller';
import { ExpenseDataService } from './expense-data.service';

describe('ExpenseDataController', () => {
  let controller: ExpenseDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseDataController],
      providers: [ExpenseDataService],
    }).compile();

    controller = module.get<ExpenseDataController>(ExpenseDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
