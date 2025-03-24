import express from 'express'
import config from './config.js'
import mysql from 'mysql2/promise'

const app = express()

const connection = await mysql.createConnection(config.db)

app.use(express.static('static'))
app.use(express.json())

app.get("/course", async function(req, res){
    try{
        const [rows, fields] = await connection.execute(
            'select * from pas.Course',[]
        )
        res.status(200).send(rows)
    } catch (err){
        console.log(err)
        res.status(500)
    }
})

app.get("/groupMembers/:group_id", async function(req, res){
    let gid = req.params.group_id
    try{
        const[rows, fields] = await connection.execute(
            'SELECT Member.group_id, student.* FROM pas.Member \
                inner join student where group_id=? and student.id = Member.student_id;',
            [gid]
        )
        res.status(200).send(rows)
    } catch(err){
        console.log(err)
        res.status(500)
    }
})

app.listen(12000,function(){
    console.log(`Server listening on port 12000`)
})