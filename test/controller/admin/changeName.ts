import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';
import { AdminService } from '../../../src/service/admin.service';

describe('admin/changeName Router', () => {
    let tk: any;
    beforeEach('Add new a Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    });

    it('KT can change Name Admin incase right token', async () => {
        const res = await request(app).put(`/admin/changeName`)
        .send({ newName: 'VuQuocThanh' })
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    it('KT cannot change Name Admin incase wrong token', async () => {
        const res = await request(app).put(`/admin/changeName`)
        .send({ newName: 'VuQuocThanh' })
        .set({ token: 'asdfsafaskhayasf.afskfaf' });
        assert.equal(res.status, 404);
    });
});