const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const app = express();
const { neon, neonConfig } =require('@neondatabase/serverless');
const AWS_region = 'us-east-2'
const STAGE = process.env.STAGE || 'prod'
const ssm= new AWS.SSM({AWS_region})
const {getDbClient} = require('./db/clients')
const validators = require('./db/validators')
const crud = require('./db/crud')
app.use(express.json())

const DATABASE_URL_SSM_PARAM= `/serverless-nodejs-api/${STAGE}/database-url`


app.get("/", async (req, res, next) => {
    console.log(process.env.DEBUG )
    const sql = await getDbClient()
    const now = Date.now()
    const [dbNowResult] = await sql`select now();`
    const delta = (dbNowResult.now.getTime() - now) / 1000
    return res.status(200).json({
      delta: delta,
      stage: STAGE
    });
  });

app.get("/path", (req,res,next)=> {
    return res.status(200).json({
       message: "Hello from Root!",
    });
});

app.get("/leads", async (req,res,next)=> {
    const results = await crud.listLeads()
    return res.status(200).json({
        results: results,
    });
});

app.post("/leads", async (req,res,next)=> {
// POST -> create data
  const postData = await req.body
  // validation???
  const {data, hasError, message} = await validators.validateLead(postData)
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. please try again",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: "Server Error",
    });
  }

  const result = await crud.newLead(data)
  // insert data to the database
  return res.status(201).json({
    results: result,
    });
});

app.use("/", (req,res,next)=> {
    return res.status(404).json({
       error: "Not found!",
    });
});

// server-full app
app.listen(3000, ()=>{
console.log("running at http://localhost:3000")
 });

module.exports.app = app
module.exports.handler = serverless(app);