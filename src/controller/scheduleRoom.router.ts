import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { ScheduleRoomService } from '../service/scheduleRoom.service';
import { IMyRequest } from '../types';

export const scheduleRoomRouter = Router();

scheduleRoomRouter.use(json());
scheduleRoomRouter.use(adminMiddleWare);

scheduleRoomRouter.post('/', (req, res) => {
    const { dayOfWeek, startTime, endTime, idRoom } = req.body;
    ScheduleRoomService.addScheduleRoom(dayOfWeek, startTime, endTime, idRoom)
        .then(scheduleRoom => res.send({ success: true, scheduleRoom }))
        .catch(err => res.status(404).send({ success: false, message: 'Add ScheduleRoom Fail' }));
});

scheduleRoomRouter.delete('/:idScheduleRoom', (req, res) => {
    const { idScheduleRoom } = req.params;
    ScheduleRoomService.deleteScheduleRoom(idScheduleRoom)
        .then(scheduleRoom => res.send({ success: true, scheduleRoom }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete ScheduleRoom Fail' }));
});

scheduleRoomRouter.put('/:idScheduleRoom', (req, res) => {
    const { idScheduleRoom } = req.params;
    const { newDayOfWeek, newStartTime, newEndTime, newIdRoom } = req.body;
    ScheduleRoomService.updateScheduleRoom(
            idScheduleRoom,
            newDayOfWeek,
            newStartTime,
            newEndTime,
            newIdRoom)
        .then(scheduleRoom => res.send({ success: true, scheduleRoom }))
        .catch(err => res.status(404).send({ success: false, message: 'Update ScheduleRoom Fail' }));
});
