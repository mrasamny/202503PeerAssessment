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

app.listen(12000,function(){
    console.log(`Server listening on port 12000`)
})