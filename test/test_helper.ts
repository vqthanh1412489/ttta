import '../src/db';
import { Admin } from '../src/models/Admin';
import { Class } from '../src/models/Class';
import { Course } from '../src/models/Course';
import { Room } from '../src/models/Room';
import { ScheduleRoom } from '../src/models/ScheduleRoom';
import { ScheduleTeacher } from '../src/models/ScheduleTeacher';
import { Student } from '../src/models/Student';
import { Teacher } from '../src/models/Teacher';

beforeEach('Remove all', async () => {
    await Admin.remove({});
    await Teacher.remove({});
    await Student.remove({});
    await Room.remove({});
    await ScheduleRoom.remove({});
    await ScheduleTeacher.remove({});
    await Class.remove({});
    await Course.remove({});
});