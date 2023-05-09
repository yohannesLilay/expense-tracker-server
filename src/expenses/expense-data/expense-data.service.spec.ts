import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseDataService } from './expense-data.service';

describe('ExpenseDataService', () => {
  let service: ExpenseDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseDataService],
    }).compile();

    service = module.get<ExpenseDataService>(ExpenseDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
