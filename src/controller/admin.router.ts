import { json } from 'body-parser';
import { Router } from 'express';
import { adminMiddleWare } from '../middleWare/adminMiddleWare';
import { AdminService } from '../service/admin.service';
import { IMyRequest } from '../types';

export const adminRouter = Router();
adminRouter.use(json());

adminRouter.post('/signup', (req, res) => {
    const { username, password, name, email, phone, address, birthDay } = req.body;
    AdminService.signUpAdmin(username, password, name, email, phone, address, birthDay)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signup Fail' }));
});

adminRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    AdminService.signInAdmin(username, password)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Signin Fail' }));
});

adminRouter.post('/checkAdmin', (req, res) => {
    const { token } = req.headers;
    AdminService.checkUser(token as string)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});

adminRouter.delete('/:idAdminRemoved', adminMiddleWare, (req, res) => {
    const { idAdminRemoved } = req.params;
    AdminService.deleteAdmin(idAdminRemoved)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});

adminRouter.put('/changePassword', adminMiddleWare, (req: IMyRequest, res) => {
    const { newPassword } = req.body;
    AdminService.updatePasswordAdmin(req.id, newPassword)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});

adminRouter.put('/changeName', adminMiddleWare, (req: IMyRequest, res) => {
    const { newName } = req.body;
    AdminService.updateNameAdmin(req.id, newName)
        .then(data => res.send({ success: true, data }))
        .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
});
adminRouter.get('/', (req, res) => {
    AdminService.getAllAdmin()
    .then(data => res.send({ success: true, data }))
    .catch(err => res.status(404).send({ success: false, message: 'Get Admin Fail' }));
});