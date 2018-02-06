import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Room } from '../../../src/models/Room';
import { ScheduleRoom } from '../../../src/models/ScheduleRoom';
import { AdminService } from '../../../src/service/admin.service';
import { RoomService } from '../../../src/service/room.service';
import { ScheduleRoomService } from '../../../src/service/scheduleRoom.service';

describe('update scheduleRoom Router', () => {
    let tk: any;
    let idRoom: any;
    let idSchedule: any;
    beforeEach('Add new a Admin - Add new Room - Add new Schedule Room', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await RoomService.addRoom('E102', 1000);
        const room = await Room.findOne({ name: 'E102' }) as Room;
        idRoom = room._id;

        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(21);
        endTime.setUTCMinutes(30);

        await ScheduleRoomService.addScheduleRoom(7, startTime, endTime, idRoom);
        const schedule = await ScheduleRoom.findOne({ dayOfWeek: 7, idRoom }) as ScheduleRoom;
        idSchedule = schedule._id;
    });
    xit('KT can Update ScheduleRoom incase Admin && idScheduleRoom', async () => {
        const res = await request(app).put(`/scheduleRoom/${idSchedule}`)
        .send({ newDayOfWeek: 3 })
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    it('KT cannot Update ScheduleRoom incase not Admin && idScheduleRoom', async () => {
        const res = await request(app).put(`/scheduleRoom/${idSchedule}`)
        .send({ newDayOfWeek: 3 })
        .set({ token: 'asdfsfica' });
        assert.equal(res.status, 404);
    });

});