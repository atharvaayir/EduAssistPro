const SeatAllocation=require('../models/seatAllocationModel');
const ExamTimetable=require('../models/examTimeTableModel');
const Student=require('../models/studentModel');
const Classroom=require('../models/classroomModel');
const Invigilator=require('../models/invigilatorModel')
const asyncHandler=require('express-async-handler');
const getStudentAnsweringExam=async(subject_check)=>{
    try {
        let students = await Student.find({ subjects: subject_check });
        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }

}
const findInvigilators=async(exam_id,exam_date,subject_id,classroom_id,start_time,end_time)=>{
    const invigilatorsAvailable= await Invigilator.find();
    //console.log(invigilatorsAvailable);
    for(let invigilator of invigilatorsAvailable){
        const isOccupied = invigilator.assignedExams.some(entry =>
            entry.exam_date.toISOString().split("T")[0] === exam_date.toISOString().split("T")[0] &&
            (
                (start_time >= entry.start_time && start_time < entry.end_time) ||  // Overlapping start
                (end_time > entry.start_time && end_time <= entry.end_time) ||      // Overlapping end
                (start_time <= entry.start_time && end_time >= entry.end_time)      // Full overlap
            )
        );
        
        if(!isOccupied)
        {
            const makingChangesToInvigilator=await Invigilator.findOneAndUpdate({_id:invigilator._id},{$push:{
                assignedExams:{
                    exam_id,
                    subject_id,
                    classroom_id,
                    exam_date,
                    start_time,
                    end_time
                }
            }})
            return invigilator._id;
        }
        
       
    }
}
const findAvailableClassrooms = async (seatsRequired, examDate, startTime, endTime) => {
    try {
        let remainingSeats = seatsRequired;
        let allocatedClassrooms = [];

        // Fetch classrooms sorted by largest capacity first
        const classrooms = await Classroom.find({}).sort({ rows: -1, columns: -1 });
        console.log(classrooms);
        for (let classroom of classrooms) {
            const totalSeats = classroom.rows * classroom.columns;

            // Check if the classroom is available
            const isOccupied = classroom.inUse.some(entry =>
                entry.date.toISOString().split("T")[0] === examDate.toISOString().split("T")[0] &&
                (
                    (startTime >= entry.start_time && startTime < entry.end_time) ||  // Overlapping start
                    (endTime > entry.start_time && endTime <= entry.end_time) ||      // Overlapping end
                    (startTime <= entry.start_time && endTime >= entry.end_time)      // Full overlap
                )
            );

            if (!isOccupied) {
                allocatedClassrooms.push({ classroom, seatsAllocated: Math.min(remainingSeats, totalSeats) });
                remainingSeats -= totalSeats;

                // Stop when all students are allocated
                if (remainingSeats <= 0) break;
            }
        }

        return allocatedClassrooms.length > 0 ? allocatedClassrooms : [];
    } catch (error) {
        console.error("Error finding available classrooms:", error);
        return [];
    }
};
const generateSeatingArrangment=async(subject_id,students,classrooms,column)=>{
    let p=0;
    const classroomsWithSeatingData=[];
    for(let i=0;i<classrooms.length&&p<students.length;i++){
        //traversing through each seat in the classroom
        const allocated_seats=[];
        const rows=classrooms[i].classroom.rows,cols=classrooms[i].classroom.columns;
        console.log(classrooms[i].classroom);
        for(let j=0;j<rows*cols&&p<students.length;j++){
            allocated_seats.push(
            {
                student_id:students[p]._id,
                seat_position:{
                    row:j,
                    col:column
                }
            })
            p++;
        }
        console.log(allocated_seats);
        classroomsWithSeatingData.push({
            classroom_id:classrooms[i].classroom._id,
            // invigilator_id:"",
            allocated_seats
        });
    }
    return (
        {
            subject_id,
            classrooms:classroomsWithSeatingData
        }
    )
}
const allocateSeats=asyncHandler(async (req,res)=>{
    const {exam_id}=req.body;
    //console.log(exam_id);
    let exam_details=await ExamTimetable.findById(exam_id);
    //exam id not found
    /*
    exam_details[i] will contain:
    subject_id
    exam_date
    start_time
    end_time
    */
   const allocations=[]
   if(!exam_details){
    res.status(400);
    throw new Error("Exam timetable with given id doesnt exist");
   }
   exam_details=(exam_details.exams);
   let n=exam_details.length;
   let used=new Array(n).fill(0);
   //console.log(used);
   const inv=findInvigilators(exam_id,exam_details[0].exam_date,exam_details[0].subject_id,"67bf275c7daa82a9e8066d5a",exam_details[0].start_time,exam_details[0].end_time)
    for(let i=0;i<n;i++)
    {
        if(used[i]===1)
            continue;
        for(let j=i+1;j<n;j++)
        {
            if(used[j]===1)
                continue;
            let studentsFromFirstExam=await getStudentAnsweringExam(exam_details[i].subject_id);
            let studentsFromSecondExam=await getStudentAnsweringExam(exam_details[j].subject_id);
            if(studentsFromFirstExam.date===studentsFromSecondExam && studentsFromSecondExam.start_time==studentsFromSecondExam.start_time)
            {
            
             let maxSizeRequired=max(studentsFromFirstExam.length,studentsFromSecondExam.length);
             let classroomAllocated= await findAvailableClassrooms(maxSizeRequired,exam_details[i].exam_date,exam_details[i].start_time,exam_details[i].end_time)
             console.log(classroomAllocated);
            //  const invigilators=[];
            //  for(let classroomOne of classroomAllocated){
            //  let invigilatorAssigned=await findInvigilators(exam_details[i].exam_id,exam_details[i].subject_id,classroomAllocated[0],exam_details[i].start_time,exam_details.end_time);
                
            //  if(!invigilatorAssigned){
            //     res.status(400);
            //     throw new Error("No invigilator found for the exam");
            //  }
            //  invigilators.push(invigilatorAssigned);
             
            // }
             
             if(classroomAllocated.length===0){
                res.status(400);
                throw new Error("All the classrooms are full for the configuration");
            }
             used[i]=1;
             used[j]=1;
             //console.log(exam_details[i]);
            allocations.push(await generateSeatingArrangment(exam_details[i].subject_id,studentsFromFirstExam,classroomAllocated,1));
            allocations.push(await generateSeatingArrangment(exam_details[j].subject_id,studentsFromFirstExam,classroomAllocated,2));
            for(let k=0;k<classroomAllocated.length;i++){
                const _id=classroomAllocated[k].classroom._id;
                await Classroom.findOneAndUpdate({_id},{$push:{inUse:{
                    date:exam_details[i].exam_date,
                    start_time:exam_details[i].start_time,
                    end_time:exam_details[i].start_time
                }}})
            }

            }
            
        }
    }

    //for remaining exams
    
    for(let i=0;i<n;i++){
        if(used[i]===0){
            //console.log(i);
            let studentsFromFirstExam=await getStudentAnsweringExam(exam_details[i].subject_id);
            console.log(studentsFromFirstExam);
            let classroomAllocated= await findAvailableClassrooms(studentsFromFirstExam.length,exam_details[i].exam_date,exam_details[i].start_time,exam_details[i].end_time);
            if(classroomAllocated.length===0){
                res.status(400);
                throw new Error("All the classrooms are full for the configuration");
            }
            console.log(classroomAllocated);
            // const invigilators=[];
            // for(let classroomOne of classroomAllocated){
            //     let invigilatorAssigned=await findInvigilators(exam_details[i].exam_id,exam_details[i].subject_id,classroomAllocated[0],exam_details[i].start_time,exam_details.end_time);
                
            //     if(!invigilatorAssigned){
            //        res.status(400);
            //        throw new Error("No invigilator found for the exam");
            //     }
            //     invigilators.push(invigilatorAssigned);
                
            // }
            allocations.push(await generateSeatingArrangment(exam_details[i].subject_id,studentsFromFirstExam,classroomAllocated,1));
            used[i]=1;

            for(let k=0;k<classroomAllocated.length;k++){
                const _id=classroomAllocated[k].classroom._id;
                await Classroom.findOneAndUpdate({_id},{$push:{inUse:{
                    date:exam_details[i].exam_date,
                    start_time:exam_details[i].start_time,
                    end_time:exam_details[i].start_time,
                    
                }}})
            }
        }
        
    }
   
    
    await SeatAllocation.insertOne({exam_id,allocations});
    res.json({
        exam_id,
        allocations
    });
    //console.log(await getStudentAnsweringExam("67bb47f87595cf700eca4619"));


    //
    

    //res.status(200).json({msg:"This is seat allocation module"});
});



module.exports={allocateSeats};