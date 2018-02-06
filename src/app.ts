import * as express from 'express';
import './db';
export const app = express();

import { adminRouter } from './controller/admin.router';
import { classRouter } from './controller/class.router';
import { courseRouter } from './controller/course.router';
import { roomRouter } from './controller/room.router';
import { scheduleRoomRouter } from './controller/scheduleRoom.router';
import { scheduleTeacherRouter } from './controller/scheduleTeacher.router';
import { studentRouter } from './controller/student.router';
import { teacherRouter } from './controller/teacher.router';

app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/room', roomRouter);
app.use('/scheduleRoom', scheduleRoomRouter);
app.use('/scheduleTeacher', scheduleTeacherRouter);
app.use('/class', classRouter);
app.use('/course', courseRouter);