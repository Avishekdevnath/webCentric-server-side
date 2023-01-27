const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const path = require("path");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

//middle ware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://avinil_it:f2sKbkBlNGbrPf2A@cluster0.iyjwjrz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log('database connected');
    const userCollection = client.db("Ghuraghuri").collection("users");
    const dataCollection = client.db("Ghuraghuri").collection("dataCollection");
    const messagesCollection = client.db("Ghuraghuri").collection("messages");
    const hotelBookingCollection = client.db("Ghuraghuri").collection("bookingHotels");
    const reviewCollection = client.db("Ghuraghuri").collection("review");
    const specialtourCollection = client.db("Ghuraghuri").collection("specialtour");
    



    // /* Get method for all user data load and  showing ui */
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    app.post("/user", async (req, res) => {
      const requests = req.body;
      const result = await userCollection.insertOne(requests);
      res.send(result);
    });

    /* forum section get and post method here  */
    app.post("/messages", async (req, res) => {
      const requests = req.body;
      // console.log(requests)
      const result = await messagesCollection.insertOne(requests);
      // console.log(forumResult);
      res.send(result);
    });

    app.get("/messages", async (req, res) => {
      const query = {};
      const cursor = messagesCollection.find(query);
      const messages = await cursor.toArray();
      res.json(messages);
    });

    app.get("/data", async (req, res) => {
      const query = {};
      const cursor = dataCollection.find(query);
      const data = await cursor.toArray();
      res.json(data);
    });
    
    
    /* get method for special tour package */

    app.get("/specialtour", async (req, res) => {
      const query = {};
      const cursor = specialtourCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });


    


    /* get method for all products data loading in UI  */
    // app.get("/products", async (req, res) => {
    //   const query = {};
    //   const cursor = productCollection.find(query);
    //   const products = await cursor.toArray();
    //   res.send(products);
    // });

    // /* post method for adding new product */
    // app.post("/products", async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await productCollection.insertOne(newProduct);
    //   res.send(result);
    // });

    // //  single data finding for showing
    // app.get("/product/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const product = await productCollection.findOne(query);
    //   res.send(product);
    // });

    // /* post method for orders details */
    // app.post("/orderDetails", async (req, res) => {
    //   const orders = req.body;
    //   // console.log(orders);
    //   const newOrder = await ordersCollection.insertOne(orders);
    //   console.log(newOrder);
    //   res.send(newOrder);
    // });

    // app.get("/orderDetails", async (req, res) => {
    //   const query = {};
    //   const cursor = ordersCollection.find(query);
    //   const allOrder = await cursor.toArray();
    //   res.send(allOrder);
    // });

    // // Deleting  product  data from admin and farmer
    // app.delete("/products/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const deletedData = await productCollection.deleteOne(query);
    //   res.send(deletedData);
    // });

    // // Deleting  ordered product data from dashboard
    // app.delete("/orderDetails/:id", async (req, res) => {
    //   const id = req.params.id;
    //   // console.log(id);
    //   const query = { _id: ObjectId(id) };
    //   // console.log(query)
    //   const deletedData = await ordersCollection.deleteOne(query);
    //   // console.log(deletedData);
    //   res.send(deletedData);
    // });

    // /* post method for add review in database */
    // app.post("/review", async (req, res) => {
    //   const review = req.body;
    //   const result = await reviewCollection.insertOne(review);
    //   res.send(result);
    // });

    // /* Get method for review showing ui */
    // app.get("/review", async (req, res) => {
    //   const query = {};
    //   const cursor = reviewCollection.find(query);
    //   const review = await cursor.toArray();
    //   res.send(review);
    // });

    // // delete review from admin dashboard
    // app.delete("/review/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const deletedData = await reviewCollection.deleteOne(query);
    //   res.send(deletedData);
    // });



    // /* ==================================================================================== */
    // /* Get order details for dashboard  */

    // // Farmer Requests for Dashboard
    // app.get("/farmerRequest", async (req, res) => {
    //   const cursor = farmerCollection.find({});
    //   const farmerRequests = await cursor.toArray();
    //   res.send(farmerRequests);
    // });

    // app.post("/farmerRequest", async (req, res) => {
    //   const requests = req.body;
    //   const result = await farmerCollection.insertOne(requests);
    //   res.json(result);
    // });

    // app.put("/farmerRequest/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedRequest = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       status: updatedRequest.status,
    //     },
    //   };
    //   const result = await farmerCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   res.json(result);
    // });


    // // farmer delete request from admin dashboard 
    // app.delete("/farmerRequest/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await farmerCollection.deleteOne(query);
    //   res.json(result);
    // });

    // /* user information put process (update data) */


    // /////Adding All People/////////
    // app.post("/allPeople", async (req, res) => {
    //   const requests = req.body;
    //   const result = await peopleCollection.insertOne(requests);
    //   res.json(result);
    // });
    // app.post("/user", async (req, res) => {
    //   const requests = req.body;
    //   const result = await userCollection.insertOne(requests);
    //   res.json(result);
    // });


    // app.put("/user/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = req.body;
    //   const filter = { email: email };
    //   const options = { upsert: true };
    //   const updateDoc = { $set: user };
    //   const result = await userCollection.updateOne(filter, updateDoc, options);
    //   res.send(result);
    // });

    // /* Make a admin from user  */
    // app.put("/user/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   // const requester = req.decoded.email;
    //   // const requesterAccount = await userCollection.findOne({ email: requester });
    //   // if (requesterAccount.role === 'admin') {
    //   const filter = { email: email };
    //   const updateDoc = { $set: { role: "admin" } };
    //   const result = await userCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // /* get method for admin call */
    // app.get("/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = await userCollection.findOne({ email: email });
    //   const isAdmin = user.role === "admin";
    //   res.send({ admin: isAdmin });
    // });






  







  } 
  finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome ghuraGhuri website");
});

app.listen(port, () => {
  console.log(`Ghuraghuri website listening on port ${port}`);
});

module.exports = app;