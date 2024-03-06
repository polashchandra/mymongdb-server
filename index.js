const express=require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT ||7000;
app.use(cors());
app.use(express.json())




const uri = "mongodb+srv://polashchandrasutradhar57:QNvohklrkOqJBd5G@cluster0.i92bcq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("userDB");
    const usercalection = database.collection("user");
    app.get('/users',async(req,res)=>{
      const corsor=usercalection.find();
      const result=await corsor.toArray();
      res.send(result);
    })
    app.get('/update/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)}
      const user=await usercalection.findOne(query)
      res.send(user)
    })
    app.post('/users',async(req,res)=>{
      const newuser=req.body;
      console.log(newuser);
      const result = await usercalection.insertOne(newuser);
      res.send(result)
    })
    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
      console.log('place delete',id);
      const query={_id:new ObjectId(id)}
      const result=await usercalection.deleteOne(query);
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(port,()=>{
  console.log(`this run port,${port}`);
})
//
// polashchandrasutradhar57


