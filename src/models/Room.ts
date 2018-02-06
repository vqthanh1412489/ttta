import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';

const RoomSchema = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    numberSeat: { type: Number, required: true }
});

const RoomMongo  = model('Room', RoomSchema);

export class Room extends RoomMongo {
    _id: string;
    name: string;
    numberSeat: number;
}