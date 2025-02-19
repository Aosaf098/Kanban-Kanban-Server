require("dotenv").config();
const express = require("express");
const cors = require("cors")
const port = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

// MiddleWare
app.use(cors())
app.use(express.json())

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r1x73.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    const userCollection = client.db("kanbanDB").collection('users')

    // Users API
    app.get('/users', async(req, res) => {
        const result = await userCollection.find().toArray()
        res.send(result)
    })

    app.post('/users', async(req, res) => {
        const newUser = req.body
        const result = await userCollection.insertOne(newUser)
        res.send(result)
    })
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Kanban Kanban Server is running");
});

app.listen(port, () => {
  console.log("Kanban Kanban Server is running on Port:", port);
});
