import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { studentMiddleWare } from '../middleWare/studentMiddleWate';
import { StudentService } from '../service/student.service';
import { IMyRequest } from '../types';

export const studentRouter = Router();

studentRouter.use(json());

studentRouter.post('/signup', adminMiddleWare, (req, res) => {
    const {
        username, password,
        name,
        email, address, phone,
        score, level
    } = req.body;
    StudentService.signUpStudent(
        username, password,
        name,
        email, address, phone,
        score, level
    )
        .then(student => res.send({ success: true, student }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});

studentRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    StudentService.signInStudent(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Sign in Fail' }));
});

studentRouter.post('/checkStudent', studentMiddleWare, (req, res) => {
    const { token } = req.headers;
    StudentService.checkStudent(token as string)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
studentRouter.delete('/:idStudent', adminMiddleWare, (req, res) => {
    const { idStudent } = req.params;
    StudentService.deteleStudent(idStudent)
        .then(student => res.send({ success: true, student }))
        .catch(err => res.status(404).send({ success: false, message: 'Delete Student Fail' }));
});
studentRouter.put('/changePassword', studentMiddleWare, (req: IMyRequest, res) => {
    const { newPassword } = req.body;
    StudentService.updatePasswordStudent(req.id, newPassword)
        .then(student => res.send({ success: true, student }))
        .catch(err => res.status(404).send({ success: false, message: 'Change Password Student Fail' }));
});
