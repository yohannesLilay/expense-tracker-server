import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseReasonsService } from './expense-reasons.service';

describe('ExpenseReasonsService', () => {
  let service: ExpenseReasonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseReasonsService],
    }).compile();

    service = module.get<ExpenseReasonsService>(ExpenseReasonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
