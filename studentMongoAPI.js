const express = require("express")
const app = express()
const router = express.Router()
const mongoose = require("mongoose")
const Student = require("../models/student")
const cors = require("cors")

app.use(express.json()) // To get posted data through body
app.use(cors())

mongoose.connect("mongodb://localhost:27017/studentdb",(err) => {
    if(err){
        throw err
    } else {
        console.log(`Connected to MongoDB successfully`)
    }
})

router.get("/", (req, res) => {
    res.json("Student API using MongoDB")
})

router.get("/students",(req, res)=>{
    Student.getStudents(function(err, data){
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.get("/students/:text", (req, res)=>{
    const text = req.params.text
    Student.getStudentByText(text, (err, data)=>{
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.post("/students", (req, res) => {
    const student = req.body
    Student.createStudent(student, (err, data)=>{
        if(err){
            res.send(err).status(500)
        }
        res.json(data)
    })
})

router.put("/students/:id", (req, res) => {
    const studentId = req.params.id
    const student = req.body

    Student.updateStudent(studentId, student, (err, data) => {
        if(err){
            res.send(err).status(500)
        }
        res.json(data)
    })
})

router.delete("/students/:id", (req, res)=>{
    const studentId = req.params.id
    Student.deleteStudent(studentId, (err, data) => {
        if(err){
            res.send(err).status(500)
        }
        res.json(data)
    })
})

app.use("/api", router)

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server listening at PORT ${PORT}`)
})