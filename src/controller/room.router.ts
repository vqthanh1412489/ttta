import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { RoomService } from '../service/room.service';
import { IMyRequest } from '../types';

export const roomRouter = Router();

roomRouter.use(json());
roomRouter.use(adminMiddleWare);

roomRouter.post('/', (req, res) => {
    const { name, numberSeat } = req.body;
    RoomService.addRoom(name, numberSeat)
    .then(room => res.send({ success: true, room }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Room Fail' }));
});

roomRouter.delete('/:idRoom', (req, res) => {
    const { idRoom } = req.params;
    RoomService.deleteRoom(idRoom)
    .then(room => res.send({ success: true, room }))
    .catch(err => res.status(404).send({ success: false, message: 'Delete Room Fail' }));
});

roomRouter.put('/:idRoom', (req, res) => {
    const { idRoom } = req.params;
    const { newName, newNumberSeat } = req.body;
    RoomService.updateRoom(idRoom, newName, newNumberSeat)
    .then(room => res.send({ success: true, room }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Room Fail' }));
});
