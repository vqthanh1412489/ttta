import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';
import { Teacher } from './Teacher';

const ScheduleTeacherSchema = new Schema({
    idTeacher: { type: Schema.Types.ObjectId, required: true, trim: true, ref: 'Teacher' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    dayOfWeek: { type: Number, required: true, trim: true, min: 2, max: 8 }
});

const ScheduleTeacherMongo = model('ScheduleTeacher', ScheduleTeacherSchema);

export class ScheduleTeacher extends ScheduleTeacherMongo {
    _id: string;
    idTeacher: Teacher;
    dayOfWeek: number;
    startTime: Date;
    endTime: Date;
}