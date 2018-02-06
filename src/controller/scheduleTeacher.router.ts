import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { ScheduleTeacherService } from '../service/scheduleTeacher.service';
import { IMyRequest } from '../types';

export const scheduleTeacherRouter = Router();

scheduleTeacherRouter.use(json());
scheduleTeacherRouter.use(adminMiddleWare);

scheduleTeacherRouter.post('/', (req, res) => {
    const { idTeacher, startTime, endTime, dayOfWeek } = req.body;
    ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime, endTime, dayOfWeek)
        .then(scheduleTeacher => res.send({ success: true, scheduleTeacher }))
        .catch(err => res.status(404).send({ success: false, message: 'Add ScheduleTeacher Fail' }));
});

scheduleTeacherRouter.delete('/:idScheduleTeacher', (req, res) => {
    const { idScheduleTeacher } = req.params;
    ScheduleTeacherService.deleteScheduleTeacher(idScheduleTeacher)
        .then(scheduleTeacher => res.send({ success: true, scheduleTeacher }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete ScheduleTeacher Fail' }));
});

scheduleTeacherRouter.put('/:idScheduleTeacher', (req, res) => {
    const { idScheduleTeacher } = req.params;
    const { idTeacher, startTime, endTime, dayOfWeek } = req.body;
    ScheduleTeacherService.updateScheduleTeacher(
            idScheduleTeacher,
            idTeacher,
            startTime,
            endTime,
            dayOfWeek)
        .then(scheduleTeacher => res.send({ success: true, scheduleTeacher }))
        .catch(err => res.status(404).send({ success: false, message: 'Update ScheduleTeacher Fail' }));
});
