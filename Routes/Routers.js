const express = require('express')
const Mentor = require('../Schemas/Mentor.js')
const Student = require('../Schemas/Student.js')

const router = express.Router();

router.post('/mentor', async (req, res) => {  // for creating mentor

    const newMentor = new Mentor(req.body)
    const savedMentor = await newMentor.save()
    res.send(savedMentor)
})

router.post('/student', async (req, res) => {  // for creating student

    const newStudent = new Student(req.body)
    const savedStudent = await newStudent.save()
    res.send(savedStudent)
})

router.put('/mentor/:mentorId/:studentId', async (req, res) => { //for assigning students to mentor

    try {
        const studentId = req.params.studentId;
        const mentorId = req.params.mentorId;
        const mentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { Students: studentId.toString() } }, { new: true })
        const student = await Student.findByIdAndUpdate(studentId, { Mentor: mentorId.toString() }, { new: true })
        const updatedMentor = await mentor.save();
        await student.save();
        res.send(updatedMentor);
    } catch (error) {
        console.log(error.body);
    }
})

router.put('/student/:studentId/:mentorId', async (req, res) => { //for changing student's mentor

    try {

        const studentId = req.params.studentId;
        const mentorId = req.params.mentorId;
        const student = await Student.findById(studentId)
        const previous = student.Mentor ? student.Mentor.toString() : null
        const updatedStudent = await Student.findByIdAndUpdate(studentId, { Mentor: mentorId, PreviousMentor: previous }, { new: true })
        const updatedMentor = await Mentor.findByIdAndUpdate(previous, { $pull: { Students: studentId } },
            { new: true })
        const mentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { Students: studentId.toString() } }, { new: true })
        await mentor.save()
        await updatedMentor.save();
        await updatedStudent.save();
        res.send(updatedStudent)
    } catch (error) {

        console.log(error.body)

    }
})

router.get('/studentsofmentor/:id', async (req, res) => { //for fetchig all students of a particular mentor

    try{

        const mentorId = req.params.id
        const students = await Mentor.findById(mentorId).select('Students')
        const stu = students.Students;
        const studentDetails = []
       for(let id of stu){
        const students = await Student.findById(id)
        studentDetails.push(students)
       }
        res.send(studentDetails)
     

    }catch(error){

        console.log(error)

    }
})

router.get('/previous/:id', async (req,res) =>{ // for getting the previous mentor of a student

    try{

        const studentId = req.params.id;
        const student = await Student.findById(studentId)
        const previous = student.PreviousMentor ? student.PreviousMentor : null;
        if(previous!==null){
            const previousMentorDetails = await Mentor.findById(previous)
            const previousMentor = previousMentorDetails.Name;
            res.send(previousMentor)
        }else{
            const previousMentor = "Mentor Not Changed"
            res.send(previousMentor)
        }
       
        

       
        

    }catch(error){
        console.log(error.body)
    }
})


module.exports = router;