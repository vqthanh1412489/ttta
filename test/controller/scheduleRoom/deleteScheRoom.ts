import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Room } from '../../../src/models/Room';
import { ScheduleRoom } from '../../../src/models/ScheduleRoom';
import { AdminService } from '../../../src/service/admin.service';
import { RoomService } from '../../../src/service/room.service';
import { ScheduleRoomService } from '../../../src/service/scheduleRoom.service';

describe('delete scheduleRoom Router', () => {
    let tk: any;
    let idRoom: any;
    let idSchedule: any;
    beforeEach('Add new a Admin - Add new Room - Add new ScheduleRoom', async () => {
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
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);

        await ScheduleRoomService.addScheduleRoom(4, startTime, endTime, idRoom);
        const schedule = await ScheduleRoom.findOne({ dayOfWeek: 4, idRoom }) as ScheduleRoom;
        idSchedule = schedule._id;
    });
    xit('KT can Delete ScheduleRoom incase Admin && idScheduleRoom', async () => {
        const res = await request(app).delete(`/scheduleRoom/${idSchedule}`)
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    it('KT cannot Delete ScheduleRoom incase not Admin && idScheduleRoom', async () => {
        const res = await request(app).delete(`/scheduleRoom/${idSchedule}`)
        .set({ token: 'asdfsfica' });
        assert.equal(res.status, 404);
    });

});