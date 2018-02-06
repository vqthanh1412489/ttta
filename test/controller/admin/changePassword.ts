import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';
import { AdminService } from '../../../src/service/admin.service';

describe('admin/changePassword Router', () => {
    let tk: any;
    beforeEach('Add new a Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    });

    it('KT can change Password Admin incase right token', async () => {
        const res = await request(app).put(`/admin/changePassword`)
        .send({ newPassword: 'Yennhi123' })
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    xit('KT cannot change Password Admin incase wrong token', async () => {
        const res = await request(app).put(`/admin/changePassword`)
        .send({ newPassword: 'Yennhi123' })
        .set({ token: 'asdfsafaskhayasf.afskfaf' });
        assert.equal(res.status, 404);
    });
});