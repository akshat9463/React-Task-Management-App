if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Tasks = require('./models/tasks');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const dbUrl = process.env.MONGOATLAS_URL;

main()
  .then(() => {
    console.log("connected to db.");
  })
  .catch((err) => console.log("mongodb connection error", err));

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error",()=>{
  console.log("error in mongo session stroe", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}
app.use(session(sessionOptions));
app.use(express.json()); 
app.use(cors()); // allow all origins by default , it connect localhost: 8080 to 5173

// dashboard route
app.get('/api/tasks', async(req,res)=>{
    let tasks = await Tasks.find();
    res.json(tasks);
})

// add route
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask =  new Tasks(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// show route
app.get("/api/tasks/:id", async (req,res)=>{
  try{
    const task = await Tasks.findById(req.params.id);
    res.json(task);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

// edit route
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete route
app.delete("/api/tasks/:id", async (req,res)=>{
  try {
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    res.json(deletedTask)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.listen(port,()=>{
    console.log("app is listening at 8080");
});