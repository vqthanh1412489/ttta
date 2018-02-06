import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { ClassService } from '../service/class.service';
import { IMyRequest } from '../types';

export const classRouter = Router();

classRouter.use(json());
classRouter.use(adminMiddleWare);

classRouter.post('/', (req, res) => {
    const { name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek } = req.body;
    ClassService.addClass(name, idCourse, idRoom, idTeacher, level, startTime, endTime, dayOfWeek)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Class Fail' }));
});

classRouter.delete('/:idClass', (req, res) => {
    const { idClass } = req.params;
    ClassService.deleteClass(idClass)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Delete Class Fail' }));
});

classRouter.put('/updateNameLevel/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { name, level } = req.body;
    ClassService.updateName_Level_Class(idClass, name, level)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Class Fail' }));
});
classRouter.put('/addStudentToClass/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { idStudent } = req.body;
    ClassService.addStudentToClass(idClass, idStudent)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Student into Class Fail' }));
});
classRouter.put('/updateRoomClass/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { idNewRoom } = req.body;
    ClassService.updateRoom_Class(idClass, idNewRoom)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Room for Class Fail' }));
});
classRouter.put('/updateScheduleClass/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { newDayOfWeek, newStartTime, newEndTime } = req.body;
    ClassService.updateSchedule_Class(idClass, newDayOfWeek, newStartTime, newEndTime)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Schedule for Class Fail' }));
});
classRouter.put('/updateTeacherClass/:idClass', (req, res) => {
    const { idClass } = req.params;
    const { idNewTeacher } = req.body;
    ClassService.updateTeacher_Class(idClass, idNewTeacher)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Teacher for Class Fail' }));
});