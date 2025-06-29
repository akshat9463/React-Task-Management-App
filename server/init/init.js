const mongoose = require('mongoose');
const Task = require('../models/tasks');
const initData = require('./data');

main().then(()=>{
    console.log("connected to db.");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:28017/taskmanagement');
}

const initDB = async () => {
  await Task.deleteMany({});
//   initData.data = initData.data.map((obj)=>({
//     ...obj,
//     owner: '685113da9a63685b401ecaab'
//   }));
  await Task.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();