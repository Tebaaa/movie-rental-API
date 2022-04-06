import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../../mail/mail.service';
import { UsersService } from '../../users/users.service';
import { mockIdDto } from '../../_test_mocks_/user-service.mock';
import { AccountService } from '../account.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { EmailDto } from '../dto/email.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

describe('AccountService', () => {
  let service: AccountService;
  const mockMailService = {
    sendPasswordReset: jest.fn(),
  };
  const mockUserService = {
    findByEmail: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: MailService, useValue: mockMailService },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('forgotPassword', () => {
    describe('if email exists', () => {
      it('should send an email with the steps to reset password', async () => {
        const expectedUser = {};
        mockUserService.findByEmail.mockReturnValue(expectedUser);
        const expetedReturnValue = {};
        mockMailService.sendPasswordReset.mockReturnValue(expetedReturnValue);
        const emailDto: EmailDto = { email: 'mail@mail.com' };
        const response = await service.forgotPassword(emailDto);
        expect(response).toEqual(expetedReturnValue);
      });
    });
  });

  describe('resetPassword', () => {
    describe('when new passwords match', () => {
      it(`should update the user's password`, async () => {
        const resetPasswordDto: ResetPasswordDto = {
          newPassword: '',
          newPasswordConfirmation: '',
        };
        const expectedReturnValue = {};
        mockUserService.update.mockReturnValue(expectedReturnValue);
        const returnedValue = await service.resetPassword(
          mockIdDto,
          resetPasswordDto,
        );
        expect(returnedValue).toEqual(expectedReturnValue);
      });
    });
    describe('otherwise', () => {
      it('should throw a ConflictException', async () => {
        const resetPasswordDto: ResetPasswordDto = {
          newPassword: '',
          newPasswordConfirmation: '123',
        };
        try {
          await service.resetPassword(mockIdDto, resetPasswordDto);
        } catch (err) {
          expect(err).toBeInstanceOf(ConflictException);
        }
      });
    });
  });

  describe('changePassword', () => {
    describe('when old password is incorrect', () => {
      it('should throw a ConflictException', async () => {
        const changePasswordDto: ChangePasswordDto = {
          oldPassword: '1',
          newPassword: '2',
          newPasswordConfirmation: '2',
        };
        const user = { password: '123' };
        mockUserService.findById.mockReturnValue(user);
        try {
          await service.changePassword(mockIdDto, changePasswordDto);
        } catch (err) {
          expect(err).toBeInstanceOf(ConflictException);
          expect(err.message).toEqual('Incorrect old password');
        }
      });
    });
    describe(`when new passwords don't match`, () => {
      it('should return a ConflictException', async () => {
        const changePasswordDto: ChangePasswordDto = {
          oldPassword: '1',
          newPassword: '2',
          newPasswordConfirmation: '3',
        };
        const user = { password: '1' };
        mockUserService.findById.mockReturnValue(user);
        try {
          await service.changePassword(mockIdDto, changePasswordDto);
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.message).toEqual('Your new password must match');
        }
      });
    });
    describe(`when new password is equal to old one`, () => {
      it('should return a ConflictException', async () => {
        const changePasswordDto: ChangePasswordDto = {
          oldPassword: '3',
          newPassword: '3',
          newPasswordConfirmation: '3',
        };
        const user = { password: '3' };
        mockUserService.findById.mockReturnValue(user);
        try {
          await service.changePassword(mockIdDto, changePasswordDto);
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.message).toEqual(
            'Your new password must be different from the old one',
          );
        }
      });
    });
    describe('when everything is correct', () => {
      it(`should update user's password`, async () => {
        const user = { password: '123' };
        mockUserService.findById.mockReturnValue(user);
        const changePasswordDto: ChangePasswordDto = {
          oldPassword: '123',
          newPassword: '1234',
          newPasswordConfirmation: '1234',
        };
        const expectedReturnValue = {};
        mockUserService.update.mockReturnValue(expectedReturnValue);
        const returnValue = await service.changePassword(
          mockIdDto,
          changePasswordDto,
        );
        expect(returnValue).toEqual(expectedReturnValue);
      });
    });
  });
});
