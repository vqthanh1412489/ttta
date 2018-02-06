import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Room } from '../../../src/models/Room';
import { AdminService } from '../../../src/service/admin.service';
import { RoomService } from '../../../src/service/room.service';
import { ScheduleRoomService } from '../../../src/service/scheduleRoom.service';

describe('add scheduleRoom Router', () => {
    let tk: any;
    let idRoom: any;
    beforeEach('Add new a Admin - Add new Room', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await RoomService.addRoom('E102', 500);
        const room = await Room.findOne({ name: 'E102' }) as Room;
        idRoom = room._id;
    });
    it('KT can add new a ScheduleRoom incase full infor && you are Admin', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = await request(app).post('/scheduleRoom/')
        .send({ dayOfWeek: 2, startTime, endTime, idRoom })
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    xit('KT cannot add new a scheduleRoom incase you arenot Admin', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = await request(app).post('/scheduleRoom/')
        .send({ dayOfWeek: 2, startTime, endTime, idRoom })
        .set({ token: 'sdfsfsf.asfsff' });
        assert.equal(response.status, 404);
    });

    xit('KT cannot add new a scheduleRoom incase is Admin && invalid Room', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = await request(app).post('/scheduleRoom/')
        .send({ dayOfWeek: 2, startTime, endTime, idRoom: 'askdfhaskhfasfs' })
        .set({ token: tk });
        assert.equal(response.status, 404);
    });
});