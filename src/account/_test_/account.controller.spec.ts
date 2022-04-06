import { Test, TestingModule } from '@nestjs/testing';
import { mockIdDto } from '../../_test_mocks_/user-service.mock';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { EmailDto } from '../dto/email.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

describe('AccountController', () => {
  let controller: AccountController;
  const mockAccountService = {
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
    changePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [{ provide: AccountService, useValue: mockAccountService }],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should send an email', async () => {
    const email: EmailDto = { email: 'mail@mail.com' };
    const expectedReturn = {};
    mockAccountService.forgotPassword.mockReturnValue(expectedReturn);
    const returnValue = await controller.sendEmail(email);
    expect(returnValue).toEqual(expectedReturn);
  });

  it('should reset a password', async () => {
    const resetPasswordDto: ResetPasswordDto = {
      newPassword: '1',
      newPasswordConfirmation: '1',
    };
    const expectedReturn = {};
    mockAccountService.resetPassword.mockReturnValue(expectedReturn);
    const returnValue = await controller.resetPassword(
      mockIdDto,
      resetPasswordDto,
    );
    expect(returnValue).toEqual(expectedReturn);
  });
  it('should change a password', async () => {
    const changePasswordDto: ChangePasswordDto = {
      oldPassword: '1',
      newPassword: '2',
      newPasswordConfirmation: '2',
    };
    const expectedReturn = {};
    mockAccountService.changePassword.mockReturnValue(expectedReturn);
    const returnValue = await controller.changePassword(
      mockIdDto,
      changePasswordDto,
    );
    expect(returnValue).toEqual(expectedReturn);
  });
});
