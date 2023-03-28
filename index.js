// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient, ObjectId } from "mongodb";
const app = express();
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const MONGO_URL = process.env.PORT;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("<h1>student mentor task");
});

// 1 . create mentor
app.post("/mentor", express.json(), async function (request, response) {
  const data = request.body;
  const mentor = await client.db("b42wd2").collection("mentor").insertOne(data);
  response.send(mentor);
});

app.get("/mentor", async function (request, response) {
  const data = request.body;
  const mentor = await client
    .db("b42wd2")
    .collection("mentor")
    .find({})
    .toArray();
  response.send(mentor);
});

app.get("/student", async function (request, response) {
  const data = request.body;
  const student = await client
    .db("b42wd2")
    .collection("student")
    .find({})
    .toArray();
  response.send(student);
});

//2 . create student

app.post("/student", express.json(), async function (request, response) {
  const data = request.body;
  const student = await client
    .db("b42wd2")
    .collection("student")
    .insertOne(data);
  response.send(student);
});

//3 .  assign student

app.put("/mentor/:id", async function (request, response) {
  const no = request.params.id;
  const data = request.body;
  const student = await client
    .db("b42wd2")
    .collection("student")
    .updateOne(
      { _id: no },
      {
        $push: { student: data },
      }
    );
  response.send(student);
});

//4. assign mentor

app.put("/student/:id", async function (request, response) {
  const no = request.params.id;
  const data = request.body;
  const student = await client
    .db("b42wd2")
    .collection("student")
    .updateOne(
      { _id: no },
      {
        $push: {
          mentor: data,
        },
      }
    );
  response.send(student);
});

//5. mentors student

app.put("/std_mentor", express.json(), async function (request, response) {
  const data = request.body;
  const student = await client
    .db("b42wd2")
    .collection("student")
    .find({ mentor: data })
    .toArray();
  response.send(student);
});

//6. replace

app.put("/assing", express.json(), async function (request, response) {
  const data = request.body;
  const student = await client
    .db("b42wd2")
    .collection("student")
    .updateOne(
      { _id: ObjectId },
      {
        $pull: { name: "baskar" },
        $push: { name: "raju" },
      }
    );
  response.send(student);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
