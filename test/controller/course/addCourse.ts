import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { AdminService } from '../../../src/service/admin.service';
import { CourseService } from '../../../src/service/course.service';

describe('add COurse Router', () => {
    let tk: any;
    beforeEach('Add new a Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    });
    xit('KT can add new a Course incase full infor && you are Admin', async () => {
        let startDate;
        startDate = new Date('2018-01-25');
        let endDate;
        endDate = new Date('2018-05-14');

        const body = {
            name: 'FEC357',
            numberSession: 12,
            startDate,
            endDate,
            tuition: 5000000,
            detailInfor: 'Basic Englist'
        };
        const response = await request(app).post('/course/')
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    it('KT cannot add new a Course incase full infor && you arenot Admin', async () => {
        let startDate;
        startDate = new Date('2018-01-25');
        let endDate;
        endDate = new Date('2018-05-14');

        const body = {
            name: 'FEC246',
            numberSession: 12,
            startDate,
            endDate,
            tuition: 5000000,
            detailInfor: 'Advance Englist'
        };
        const response = await request(app).post('/room/')
        .send({ name: 'E101', numberSeat: 300 })
        .set({ token: 'afasdfka.asfhsaf' });
        assert.equal(response.status, 404);
    });
});