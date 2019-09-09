import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { exec } from 'child_process';

const mockCredentialDto = { username: 'TestUsername', password: 'TestPassword' };

describe('UserRepository', () => {
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserRepository
            ]
        }).compile();

        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('signUp', () => {
        let save;

        beforeEach(() => {
            save = jest.fn();
            userRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('successfully sign up the user', () => {
            save.mockResolvedValue(undefined);
            expect(userRepository.signUp(mockCredentialDto)).resolves.not.toThrow();
        })

        it('exception if user already exists', () => {
            save.mockRejectedValue({ code: '23505' });
            expect(userRepository.signUp(mockCredentialDto)).resolves.toThrow(ConflictException);
        })

        it('exception if user already exists', () => {
            save.mockRejectedValue({ code: '12345' }); // unhandled error
            expect(userRepository.signUp(mockCredentialDto)).resolves.toThrow(InternalServerErrorException);
        })
    });

    describe('validateUserPassword', () => {
        let user;

        beforeEach(() => {
            userRepository.findOne = jest.fn();
            user = new User;
            user.username = 'TestUsername';
            user.validatePassword = jest.fn();
        });

        it('returns the username as validation is successful', async () => {
            userRepository.findOne.mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(true);

            const result = await userRepository.validateUserPassword(mockCredentialDto);
            expect(result).toEqual('TestUsername');
        });

        it('returns null as user cannot be found', async () => {
            userRepository.findOne.mockResolvedValue(null);
            const result = await userRepository.validateUserPassword(mockCredentialDto);
            expect(user.validatePassword).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('returns null as password is invalid', async () => {
            userRepository.findOne.mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(false);
            const result = await userRepository.validateUserPassword(mockCredentialDto);
            expect(user.validatePassword).toHaveBeenCalled();
            expect(result).toBeNull();
        });
    });

    //describe('hashPassword', () => {
    //    it('calls bcrypt.hash to generate hash', async () => {
    //        bcrypt.hash = jest.fn().mockResolvedValue('testHash');
    //        expect(bcrypt.hash).not.toHaveBeenCalled();
    //        const result = await userRepository.hashPassword('testPassword', 'testSalt');
    //        expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
    //        expect(result).toEqual('testHash');
    //    });
    //});
});
