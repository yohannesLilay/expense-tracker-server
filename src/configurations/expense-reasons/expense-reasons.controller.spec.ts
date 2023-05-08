import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseReasonsController } from './expense-reasons.controller';
import { ExpenseReasonsService } from './expense-reasons.service';

describe('ExpenseReasonsController', () => {
  let controller: ExpenseReasonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseReasonsController],
      providers: [ExpenseReasonsService],
    }).compile();

    controller = module.get<ExpenseReasonsController>(ExpenseReasonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
