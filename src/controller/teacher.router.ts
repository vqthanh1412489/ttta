import { json } from 'body-parser';
import { Router } from 'express';
import { TeacherService } from '../service/teacher.service';

export const teacherRouter = Router();

teacherRouter.use(json());

teacherRouter.post('/signup', (req, res) => {
    const {username, password, name, email, phone, nationality, address,
        bank, bankAccountNumber, skill, note } = req.body;
    TeacherService.signUpTeacher(
        username,
        password,
        name,
        email,
        phone,
        nationality,
        address,
        bank,
        bankAccountNumber,
        skill,
        note)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});

teacherRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    TeacherService.signInTeacher(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Username of Password invalid' }));
});

teacherRouter.post('/checkteacher', (req, res) => {
    const { token } = req.headers;
    TeacherService.checkTeacher(token as string)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
