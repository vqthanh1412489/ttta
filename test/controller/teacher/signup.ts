import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Teacher } from '../../../src/models/Teacher';

describe('Teacher signup Router', () => {
    it('KT can signup new Teacher incase full infor', async () => {
        const body = {
            username: 'tea2',
            password: '123',
            name: 'teacher2',
            email: 'tea2@gmai.com',
            phone: '1456789',
            nationality: 'Koreal',
            address: 'Seoul',
            bank: 'ACB',
            bankAccountNumber: '1234567894222',
            skill: ['Toiec', 'Ielts'],
            note: 'I refused to love her'
        };
        const res = await request(app).post('/teacher/signup')
            .send(body);

        const teacher = await Teacher.findOne({ username: 'tea2' }) as Teacher;
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    });
});