import { ScheduleTeacher } from '../models/ScheduleTeacher';
import { Teacher } from '../models/Teacher';

export class ScheduleTeacherService {
    static async addScheduleTeacher(
        idTeacher: string,
        startTime: Date,
        endTime: Date,
        dayOfWeek: number
    ) {
        const teacher = await Teacher.findById(idTeacher);
        if (!teacher) throw new Error('Teacher not found');
        const scheduleTeacher = new ScheduleTeacher({ idTeacher, startTime, endTime, dayOfWeek });
        await scheduleTeacher.save();
        return scheduleTeacher;
    }

    static async deleteScheduleTeacher(idScheduleTeacher: string) {
        return await ScheduleTeacher.findByIdAndRemove(idScheduleTeacher) as ScheduleTeacher;
    }

    static async updateScheduleTeacher(
        idScheduleTeacher: string,
        newIdTeacher: string,
        newStartTime: Date,
        newEndTime: Date,
        newDayOfWeek: number
        ) {
        return await ScheduleTeacher.findByIdAndUpdate(idScheduleTeacher,
            {
                dayOfWeek: newDayOfWeek,
                startTime: newStartTime,
                endTime: newEndTime,
                idTeacher: newIdTeacher
            }, { new: true }) as ScheduleTeacher;
    }
}