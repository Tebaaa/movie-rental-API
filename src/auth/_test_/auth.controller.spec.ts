import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('login', () => {
    const expectedReturnValue = {};
    it('should call login service', async () => {
      const reqObject = { user: {} };
      mockAuthService.login.mockReturnValue(expectedReturnValue);
      const returnedValue = await controller.login(reqObject);
      expect(mockAuthService.login).toBeCalled();
      expect(returnedValue).toEqual(expectedReturnValue);
    });
  });
});
