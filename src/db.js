/*app.get('/test',(req,res) => {
  database.collection("club").find({}).toArray((error,result)=>{
    if(error){
      console.log(error)
    }

    res.send(result)
  })
} ) 


app.post('/test',(req,res) =>{
    database.collection("club").count({},function(error,numofdocs){
        if(error){
            console.log(error)
        }
        database.collection("club").insertOne({
           Departmentid : numofdocs+1,
           name : req.body['name'],
           city : req.body['city'],
           country : req.body['country']
        })

        res.send("added success")
    })

   app.patch('/test',(req,res) =>{

            database.collection("club").updateOne(
            {
                "city" :req.body['city']
            },
            {
                 $set:{
                    "name":req.body['name']
                }
            })
    
            res.send("updated success")
        })
        /*app.delete('/test/:id',(req,res)=>{
            
            database.collection("club").deleteOne(
            {
                DepartmentId:parseInt(req.params.id)
            })            
            res.send("delete success")

        })*/