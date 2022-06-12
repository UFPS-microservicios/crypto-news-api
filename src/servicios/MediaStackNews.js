const express = require('express')
const endpoints = express.Router()
const axios = require('axios')
const { response } = require('../server')
const app = express();
module.exports = endpoints

endpoints.get('/media/:busqueda', async(req, res)=> {
   let busqueda=req.params.busqueda
    const urlAPI = `http://api.mediastack.com/v1/news?access_key=574bd6512d018b2de9d6e833ebefd665&keywords=`+busqueda;
    const respuestaAPI = await axios.get(urlAPI)
    const datos = await  respuestaAPI.data.data

    
    console.log(datos)


    if (datos && datos.length > 0){
res.json({datos})
    }
    else
    res.json({"mensaje":"no hay datos"})
})
  
endpoints.get('/prueba', async (req, res) =>{
  res.json({mensaje: 'API funcionando bien :D'})
})

 endpoints.post('/news/get/', async(req, res)=> {
    console.log(req.body,"este es el body")

    
    const buff = Buffer.from(req.body.message.data, 'base64');

    const id=buff.toString('utf-8')
    const chat= JSON.parse(id).chat_id
    
    
    
    
    const urlAPI = 'https://newsapi.org/v2/everything?q=Crypto&language=es&sortBy=popularity&apiKey=3b67b1606d934062b206f3f9e56307fb';
    const respuestaAPI = await axios.get(urlAPI)
    const datos = await respuestaAPI.data.articles
    const notice =Math.floor(Math.random() * (datos.length - 0)) + 0;
    let filter=[1];

        if(0<datos.length){
       filter= {
           "chat_id":chat,
           "titulo":datos[notice].title ,
           ////"descripcion":datos[i].description,
           "link":datos[notice].url 
      
       }
  };
  console.log(filter) 
   if (datos && datos.length > 0)
   {
   res.json({
       "message":filter
})
filter =JSON.stringify(filter);
publishMessage(filter);
   }
   else
   res.json({"mensaje":"no hay datos"})


})
//gcloud auth application-default login   
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const data = JSON.stringify({foo: 'bar'});

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();
GOOGLE_APPLICATION_CREDENTIALS = '.\cryptobot-345516-0047de703f40.json'
async function publishMessage(messaging) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(messaging);

  try {
    const messageId = await pubSubClient
      .topic("projects/cryptobot-345516/topics/news-topic")
      .publishMessage({data:dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}


