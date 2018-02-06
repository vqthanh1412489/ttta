import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';

describe('Admin signup Router', () => {
    it('KT can signup new Admin incase full infor', async () => {
        const body = {
            username: 'vqthanh1',
            password: '123',
            name: 'Thanh123',
            email: 'vqthanh1@gmail.com',
            phone: '01698312555',
            address: '5/22 le van chi',
            birthDay: '1995-09-30'
        };
        const res = await request(app).post('/admin/signup')
        .send(body);

        const admin = await Admin.findOne({ username: 'vqthanh1' }) as Admin;
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    });
});