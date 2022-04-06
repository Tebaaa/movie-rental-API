import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { mockUser } from '../../_test_mocks_/user-service.mock';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    findByEmail: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    describe('if user with email exists but password is incorrect', () => {
      it('should return null', async () => {
        const user = { password: '123' };
        mockUserService.findByEmail.mockReturnValue(user);
        const returnedValue = await service.validateUser(
          'email',
          'incorrect_password',
        );
        expect(returnedValue).toBeNull();
      });
    });
    describe(`if user with email doesn't exist`, () => {
      it('should return null', async () => {
        mockUserService.findByEmail.mockReturnValue(undefined);
        const returnedValue = await service.validateUser('email', 'password');
        expect(returnedValue).toBeNull();
      });
    });
    describe('otherwise', () => {
      it(`should return the user`, async () => {
        const user = { password: 'password' };
        mockUserService.findByEmail.mockReturnValue(user);
        const expectedUser = await service.validateUser('email', 'password');
        expect(expectedUser).toEqual(user);
      });
    });
  });
  describe('login', () => {
    it('should return an access_token', async () => {
      const signedPayload = {};
      mockJwtService.sign.mockReturnValue(signedPayload);
      const expectedReturn = { access_token: signedPayload };
      const returnedValue = await service.login(mockUser);
      expect(returnedValue).toEqual(expectedReturn);
    });
  });
});
