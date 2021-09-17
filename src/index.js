import express from 'express'
import bodyParser from 'body-parser'
import req from 'express/lib/request'
import auth from "./auth.js"
import connect from './db.js';
//const mongoose = require('mongoose')
var fileUpload = require('express-fileupload')
var fs = require('fs')
var cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(fileUpload())
app.use(cors())
app.use('/Photos',express.static(__dirname+'/Photos'))



var DATABASE = "Football"
var database
app.listen(port,() => 
{

  console.log("succes ")
})


app.get('/test',async (request,response)=>{

    database.collection("club").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/users', async (req,res)=>{
  let user = req.body

  auth.registerUser(user);

  res.json(user);

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


/*app.post('/test/savefile ',(request,response)=>{

  fs.writeFile("./Photos/"+request.files.file.name,
  request.files.file.data, function (err){
    if(err){
      console.log(err)
    }
    response.send(request.files.file.name)
  }  
  )
})*/






