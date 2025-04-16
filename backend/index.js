const express=require('express')
const app =express()
const port=process.env.PORT||5030
const cors=require('cors')

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("hello world")
})
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://romanvasanth08:vasanth1210@cluster0.9c3wdn8.mongodb.net/?appName=Cluster0";

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

    
    // Send a ping to confirm a successful connection
 const trendingcollection=client.db("shopper").collection("stop");
  app.post("/upload",async(req,res)=>{
    const data=req.body;
    const result=await trendingcollection.insertOne(data);
    res.send(result);
  })
  app.get("/trend",async(req,res)=>{
    const trend= trendingcollection.find();
    const result=await trend.toArray();
    res.send(result);
  })
  app.get("/trending/:id",async(req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await trendingcollection.findOne(filter);
    res.send(result);
  })
  app.patch("/allproducts/:id",async(req,res)=>{
    const id=req.params.id;
    const updatetrenddata=req.body;
    const filter={_id:new ObjectId(id)};
    const updateDoc={
      $set:{
        ...updatetrenddata
      },
    }
      const options={upsert:true};
      const result=await trendingcollection.updateOne(filter,updateDoc,options);
      res.send(result);
  })
  app.delete("/trends/:id",async(req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await trendingcollection.deleteOne(filter);
    res.status(200).json({success:true,message:"data deleted successfully",result});
  })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port,()=>{
  console.log(`connected to ${port}`)
})





// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://romanvasanth08:<db_password>@cluster0.jl6e6aw.mongodb.net/?appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);
