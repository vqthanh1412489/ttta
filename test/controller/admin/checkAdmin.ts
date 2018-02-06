import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';
import { AdminService } from '../../../src/service/admin.service';

describe('Admin checkUser Router', () => {
    let tk: any;
    beforeEach('Add new Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    });

    it('KT can signin incase token', async () => {
        const res = await request(app).post('/admin/checkAdmin')
        .set({ token: tk });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    });

    it('KT cannot signin incase token invalid', async () => {
        const res = await request(app).post('/admin/checkAdmin')
        .set({ token: 'asdfsfasfdmasfw' });
        assert.equal(res.body.success, false);
        assert.equal(res.status, 404);
    });
});