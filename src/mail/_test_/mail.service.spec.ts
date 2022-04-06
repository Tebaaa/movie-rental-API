import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderInfo } from '../../movie-rental/classes/order-info.class';
import { mockUser } from '../../_test_mocks_/user-service.mock';
import { MailService } from '../mail.service';

describe('MailService', () => {
  let service: MailService;
  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have host atribute', () => {
    expect(service).toHaveProperty('host');
  });

  it('should have port atribute', () => {
    expect(service).toHaveProperty('port');
  });

  describe('sendPasswordReset', () => {
    it('should send an email', async () => {
      const expectedReturn = {};
      mockMailerService.sendMail.mockReturnValue(expectedReturn);
      const returnValue = await service.sendPasswordReset(mockUser);
      expect(returnValue).toEqual(expectedReturn);
    });
  });
  describe('sendOrderInfo', () => {
    it('should send an email', async () => {
      const orderInfo: OrderInfo = {
        action: 'bought',
        email: 'a@a.com',
        movies_info: [],
        name: 'name',
        quantity: 2,
        total: 5,
      };
      const expectedReturn = {};
      mockMailerService.sendMail.mockReturnValue(expectedReturn);
      const returnValue = await service.sendOrderInfo(orderInfo);
      expect(returnValue).toEqual(expectedReturn);
    });
  });
});
