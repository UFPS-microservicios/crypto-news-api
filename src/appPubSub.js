const express = require(`express`);
const { PubSub } = require('@google-cloud/pubsub');

const pubsubClient = new PubSub();
const app = express
app.use(express.urlencoded)
app.use(express.json())
const port= process.env.PORT ||5000;

app.listen(port,()=>{

    console.log("listening on port",port);
});
app.post('/',async(req,res)=>{
try{
    const notice=req.body;
    await publishPubSubMessage(notice);
    res.status(204).send();
}catch(ex){
        console.log(ex);
        res.status(500).send(ex);
    }
});
async function publishPubSubMessage(notice){
    const buffer=Buffer.from(JSON.stringify(notice));
    await pubsub.topic('new-notice').publish(buffer);
}
