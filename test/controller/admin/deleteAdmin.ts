import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';
import { AdminService } from '../../../src/service/admin.service';

describe('admin/deleteAdmin Router', () => {
    let tk: any;
    let idAdmin2: any;
    beforeEach('Add new 2 Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        const birthDay2 = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt2', '123', 'Thanh2', 'vqt2@gmail.com', '016983102222', '22 Le Van Chi', birthDay);
        const admin2 = await Admin.findOne({ username: 'vqt2' }) as Admin;
        idAdmin2 = admin2._id;
    });

    it('KT can delele Admin by orhter Admin', async () => {
        const res = await request(app).delete(`/admin/${idAdmin2}`)
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
});