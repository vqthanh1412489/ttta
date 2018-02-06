import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { CourseService } from '../service/course.service';
import { IMyRequest } from '../types';

export const courseRouter = Router();

courseRouter.use(json());
courseRouter.use(adminMiddleWare);

courseRouter.post('/', (req, res) => {
    const { name, numberSession, startDate, endDate, tuition, detailInfor } = req.body;
    CourseService.addCourse(name, numberSession, startDate, endDate, tuition, detailInfor)
    .then(course => res.send({ success: true, course }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Course Fail' }));
});

courseRouter.delete('/:idCourse', (req, res) => {
    const { idCourse } = req.params;
    CourseService.deleteCourse(idCourse)
    .then(course => res.send({ success: true, course }))
    .catch(err => res.status(404).send({ success: false, message: 'Delete Course Fail' }));
});

courseRouter.put('/:idCourse', (req, res) => {
    const { idCourse } = req.params;
    const { name, numberSession, startDate, endDate, tuition, detailInfor } = req.body;
    CourseService.updateCourse(idCourse, name, numberSession, startDate, endDate, tuition, detailInfor)
    .then(course => res.send({ success: true, course }))
    .catch(err => res.status(404).send({ success: false, message: 'Update Course Fail' }));
});
courseRouter.put('/addClassToCourse/:idCourse', (req, res) => {
    const { idCourse } = req.params;
    const { idClass } = req.body;
    CourseService.addClassToCourse(idCourse, idClass)
    .then(course => res.send({ success: true, course }))
    .catch(err => res.status(404).send({ success: false, message: 'Add Class into Course Fail' }));
});
