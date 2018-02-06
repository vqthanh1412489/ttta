import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';
import { Class } from '../models/Class';

const courseSchema = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    numberSession: { type: Number, required: true },
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    tuition: { type: Number, required: true, trim: true },
    detailInfor: { type: String, trim: true },
    listClass: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

const CourseMongo  = model('Course', courseSchema);

export class Course extends CourseMongo {
    _id: string;
    name: string;
    numberSession: number;
    startDate: Date;
    endDate: Date;
    tuition: number;
    detailInfor: string;
    listClass: [Class];
}