import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';
import { AdminService } from '../../../src/service/admin.service';

describe('Admin signin Router', () => {
    beforeEach('Add new Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
    });
    it('KT can signin incase with username && password', async () => {
        const body = {
            username: 'vqt1',
            password: '123',
        };
        const res = await request(app).post('/admin/signin')
        .send(body);

        const admin = await Admin.findOne({ username: 'vqt1' }) as Admin;
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    });
});