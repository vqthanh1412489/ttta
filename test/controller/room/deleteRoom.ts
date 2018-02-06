import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Room } from '../../../src/models/Room';
import { AdminService } from '../../../src/service/admin.service';
import { RoomService } from '../../../src/service/room.service';

describe('delete Room Router', () => {
    let tk: any;
    let idRoom: any;
    beforeEach('Add new a Admin - Room', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await RoomService.addRoom('E102', 500);
        const room = await Room.findOne({ name: 'E102' }) as Room;
        idRoom = room._id;
    });
    it('KT can delete the Room incase idRoom && you are Admin', async () => {
        const response = await request(app).delete(`/room/${idRoom}`)
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    it('KT cannot delete the Room incase full infor && you arenot Admin', async () => {
        const response = await request(app).delete(`/room/${idRoom}`)
        .set({ token: 'afasdfka.asfhsaf' });
        assert.equal(response.status, 404);
    });
});