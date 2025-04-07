import express from 'express'
import config from './config.js'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()

const connection = await mysql.createConnection(config.db)

app.use(express.static('static'))
app.use(express.json())
app.use(cors())

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

//
// Group endpoints
//

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


//
// Rubric endpoints
//
app.get("/assessment/:assessment_id",async function(req, res){
    let assessment_id = req.params.assessment_id
    try{
        const [rows, fields] = await connection.execute(
            'select Category.id as category_id,Category.title as category_title,\
	            Category.description as category_description,\
                Scale.id as scale_id, Scale.description as scale_description,\
                Scale.value as scale_value from Assessment \
	            inner join Rubric on Assessment.rubric_id=Rubric.id \
                inner join Category on Rubric.id = Category.rubric_id \
                inner join Scale on Scale.category_id = Category.id \
                where Assessment.id=?',[assessment_id]
        )
        res.status(200).send(rows)
    } catch(err){
        console.log(err)
        res.status(500)
    }
})

//
// Assessed endpoint
//

app.post('/assessed', async function (req, res){

    try{
        await connection.beginTransaction()
        req.body.forEach((data, index) => {
            const assessed = [parseInt(data.assessment_id),
                parseInt(data.assessed_student_id),
                parseInt(data.assessor_student_id),
                parseInt(data.scale_id)
            ]
            console.log(assessed)
            
            connection.execute(
                'INSERT INTO pas.Assessed\
                    (assessment_id, assessed_student_id, assessor_student_id, scale_id) \
                    values (?,?,?,?);',assessed
            )
        })
        await connection.commit()
    }catch(error){
        await connection.rollback()
        console.log(error)
        res.status(500)
    }

})

app.listen(12000,function(){
    console.log(`Server listening on port 12000`)
})