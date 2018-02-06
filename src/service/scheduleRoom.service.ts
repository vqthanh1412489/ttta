import { Room } from '../models/Room';
import { ScheduleRoom } from '../models/ScheduleRoom';

export class ScheduleRoomService {
    static async addScheduleRoom(
        dayOfWeek: number,
        startTime: Date,
        endTime: Date,
        idRoom: string
    ) {
        const room = await Room.findById(idRoom);
        if (!room) throw new Error('Room not found');
        const scheduleRoom = new ScheduleRoom({ dayOfWeek, startTime, endTime, idRoom });
        await scheduleRoom.save();
        return scheduleRoom;
    }

    static async deleteScheduleRoom(idScheduleRoom: string) {
        return await ScheduleRoom.findByIdAndRemove(idScheduleRoom) as ScheduleRoom;
    }

    static async updateScheduleRoom(
        idScheduleRoom: string,
        newDayOfWeek: number,
        newStartTime: Date,
        newEndTime: Date,
        newIdRoom: string) {
        return await ScheduleRoom.findByIdAndUpdate(idScheduleRoom,
            {
                dayOfWeek: newDayOfWeek,
                startTime: newStartTime,
                endTime: newEndTime,
                idRoom: newIdRoom
            }, { new: true }) as ScheduleRoom;
    }
}