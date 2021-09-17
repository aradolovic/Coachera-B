import express from 'express'
import bodyParser from 'body-parser'
import req from 'express/lib/request'
//const mongoose = require('mongoose')
var fileUpload = require('express-fileupload')
var fs = require('fs')

//app.use(fileUpload())
//app.use('/Photos',Express.static(__dirname+'/Photos') )
var cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const port = 3000
var MongoClient = require("mongodb").MongoClient
const uri= "mongodb+srv://antonio:antonio@cluster0.ksyz5.mongodb.net/Football?retryWrites=true&w=majority"


var DATABASE = "Football"
var database
app.listen(port,() => 
{
    MongoClient.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, (error,client)=>{
        database=client.db("Football")
    })
  console.log("succes ")
})


app.get('/test',(request,response)=>{

    database.collection("club").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/test',(request,response)=>{

  database.collection("club").count({},function(error,numOfDocs){
      if(error){
          console.log(error);
      }

      database.collection("club").insertOne({
              _id : numOfDocs+1,
              name : request.body['name'] ,
              city : request.body['city'],
              country : request.body['country'],
      });

      response.json("sad Successfully");
  })

})

app.put('/test',(request,response)=>{

  database.collection("club").updateOne(
      //Filter Criteria
      {
          "_id":request.body['_id']
      },
      //Update
      {$set:
          {
              "name":request.body['name']
          }

      }
  );

  response.json("Updated Successfully");
})

app.delete('/test/:id',(request,response)=>{

  database.collection("club").deleteOne({
     _id:parseInt(request.params.id)
  });

  response.json("Deleted Successfully");
})


app.post('/test/savefille ',(request,response)=>{

  fs.writeFile("./Photos/"+request.files.file.name,
  request.files.file.data, function (err){
    if(err){
      console.log(err)
    }
    response.send(request.files.file.name)
  }  
  )
})






