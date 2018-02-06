import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';
import { Class } from './Class';

const StudentSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required:  true, trim: true },
    phone: { type: String, required: true, trim: true },
    iamge: { type: String, trim: true },
    score: { type: Number, required: true },
    level: { type: Number, required: true },
    authority: { type: Number, required: true },
    listClass: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

const StudentMongo  = model('Student', StudentSchema);

export class Student extends StudentMongo {
    _id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    image: string;
    score: number;
    level: number;
    authority: number;
    listClass: [Class];
}