import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { AdminService } from '../../../src/service/admin.service';
import { RoomService } from '../../../src/service/room.service';
describe('add Room Router', () => {
    let tk: any;
    beforeEach('Add new a Admin', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;
    });
    it('KT can add new a Room incase full infor && you are Admin', async () => {
        const response = await request(app).post('/room/')
        .send({ name: 'E101', numberSeat: 300 })
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    it('KT cannot add new a Room incase full infor && you arenot Admin', async () => {
        const response = await request(app).post('/room/')
        .send({ name: 'E101', numberSeat: 300 })
        .set({ token: 'afasdfka.asfhsaf' });
        assert.equal(response.status, 404);
    });
});