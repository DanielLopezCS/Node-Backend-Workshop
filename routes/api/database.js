
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


// redisDemo.js
const redis = require('redis');
const cacheClient = redis.createClient(6379); // this creates a new client
const {Pool, Client} = require('pg');

//REPLACE WITH YOUR OWN POSTGRES URL
const connectionString = 'postgres://node:x123456x@localhost:5432/dbdstack'



const client = new Client({
  connectionString:connectionString
})

client.connect()



cacheClient.on('connect', function() {
  console.log('Redis client connected');
});

cacheClient.on('error', function (err) {
  console.log('Something went wrong ' + err);
});




// @route    GET api/polls
// @desc     Get all polls
// @access   Public
router.get('/redis', async (req, res) => {
  try {



    
    cacheClient.get('postgres', (error,cachedTable)=>{ 
      if(cachedTable){ 
      console.log("SERVING FROM REDIS");
      return res.send (cachedTable);}
    
      client.query('SELECT * from actor',(err,table)=>{
        console.log("SERVING FROM POSTGRES");
      
        cacheClient.set('postgres',JSON.stringify(table.rows));
        
        return res.send(table.rows);
        //client.end()
      
        })  
    }
      

    );



  


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/polls
// @desc     Get all polls
// @access   Public
router.get('/postgres', async (req, res) => {
  try {


 
  client.query('SELECT * from actor',async(err,table)=>{

  console.log("SERVING FROM POSGRES");
  

  return res.send(table.rows); 
  //client.end()

  })
 


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//TODO: Query Postgres with PM2 
//TODO: Query Postgres with Worker Threads
//TODO: Query Redis using PM2
//TODO: Query Redis using Worker Threads
module.exports = router;
