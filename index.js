import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express"; // "type": "module"
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1:27017";

console.log(process.env.MONGO_URL);

const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.post("/details", async function (request, response) {
  const data = request.body;
  const result = await client
    .db("detail")
    .collection("details")
    .insertMany(data);
  response.send(result);
});
app.get("/details", async function (request, response) {
  const users = await client
    .db("detail")
    .collection("details")
    .find({})
    .toArray();

  response.send(users);
});

app.delete("/details/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("detail")
    .collection("details")
    .deleteOne({ _id: new ObjectId(id) });
  response.send(result);
});

app.get("/details/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("detail")
    .collection("details")
    .findOne({ id: id });

  response.send(result);
});
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
