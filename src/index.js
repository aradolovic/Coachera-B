import express, { response } from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import { MongoClient } from 'mongoose/node_modules/mongodb'
//const mongoose = require('mongoose')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const port = 3000

let dbURI = "mongodb+srv://antonio:admin@cluster0.ksyz5.mongodb.net/testdb?retryWrites=true&w=majority"
var DATABASE = "testdb"
var database
app.listen(port,()=>{
MongoClient.connect(dbURI,{
  useNewUrlParser: true, 
  useUnifiedTopology: true
},(error,client) =>{
  database = client.db(DATABASE);
  console.log("succes ")
})
})

app.get('/test',(req,res) => {
  database.collection("club").find({}).toArray((error,result)=>{
    if(error){
      console.log(error)
    }

    res.send(result)
  })
} ) 


app.get('/',(req,res) =>{
    res.send('Hello world')
})




