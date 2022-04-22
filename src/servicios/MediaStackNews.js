const express = require('express')
const endpoints = express.Router()
const axios = require('axios')
const { response } = require('../server')



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
endpoints.get('/media', async(req, res)=> {
    let busqueda=req.params.busqueda
     const urlAPI = `http://api.mediastack.com/v1/news?access_key=574bd6512d018b2de9d6e833ebefd665`;
     const respuestaAPI = await axios.get(urlAPI)
     const datos = await respuestaAPI.data.data
 
     
     console.log(datos)
 
 
     if (datos && datos.length > 0){
 res.json({datos})
     }
     else
     res.json({"mensaje":"no hay datos"})
 })
endpoints.get('/', (req,res)=>{
    res.json({"funciona":"la api"})
})
module.exports = endpoints

 endpoints.get('/News/:busqueda/:lenguaje', async(req, res)=> {
     
    let busqueda=req.params.busqueda
    let lenguaje=req.params.lenguaje

     const urlAPI = 'https://newsapi.org/v2/everything?q='+busqueda+'&language='+lenguaje+'&sortBy=popularity&apiKey=3b67b1606d934062b206f3f9e56307fb';
     const respuestaAPI = await axios.get(urlAPI)
     const datos = await respuestaAPI.data.articles

     let filter=[datos.length];
     for(let i=0;i<datos.length;i++){  
        filter[i]= {
       //"author":datos[i].author ,
       "titulo":datos[i].title ,
       //"descripcion":datos[i].description,
       "url":datos[i].url 
   };
   console.log(datos)
       }
  
   
    if (datos && datos.length > 0)
    {
    res.json({"mensajes":filter})
    }
    else
    res.json({"mensaje":"no hay datos"})
 })
 endpoints.get('/News/:busqueda/:lenguaje/:amount', async(req, res)=> {
     
    let busqueda=req.params.busqueda
    let lenguaje=req.params.lenguaje
    let amount=req.params.amount

     const urlAPI = 'https://newsapi.org/v2/everything?q='+busqueda+'&language='+lenguaje+'&sortBy=popularity&apiKey=3b67b1606d934062b206f3f9e56307fb';
     const respuestaAPI = await axios.get(urlAPI)
     const datos = await respuestaAPI.data.articles

     let filter=[datos.length];
     for(let i=0;i<amount;i++){  
         if(i<datos.length){
        filter[i]= {
       ////"author":datos[i].author ,
       
       "titulo":datos[i].title ,
       ////"descripcion":datos[i].description,
       "url":datos[i].url 
        }
   };
   console.log(datos)
       }
  
   
    if (datos && datos.length > 0)
    {
    res.json({"mensajes":filter})
    }
    else
    res.json({"mensaje":"no hay datos"})
 })
 endpoints.get('/getNews/:chat_id', async(req, res)=> {
     

    let id=req.params.chat_id

     const urlAPI = 'https://newsapi.org/v2/everything?q=Crypto&language=es&sortBy=popularity&apiKey=3b67b1606d934062b206f3f9e56307fb';
     const respuestaAPI = await axios.get(urlAPI)
     const datos = await respuestaAPI.data.articles

     let filter=[1];

         if(0<datos.length){
        filter= {
       ////"author":datos[i].author ,
       
        }
   };

   fetch("http://4e7a-179-32-119-75.ngrok.io/publishMessage")
   .then(response=>response.json)
   console.log(datos) 
    if (datos && datos.length > 0)
    {
    res.json({
        "chat_id":id,
    "titulo":datos[0].title ,
    ////"descripcion":datos[i].description,
    "link":datos[0].url 
})
    }
    else
    res.json({"mensaje":"no hay datos"})


 })

 endpoints.get('/messages/news/send', async(req, res)=> {
     

   

     const urlAPI = 'https://newsapi.org/v2/everything?q=Crypto&language=es&sortBy=popularity&apiKey=3b67b1606d934062b206f3f9e56307fb';
     const respuestaAPI = await axios.get(urlAPI)
     const datos = await respuestaAPI.data.articles

     let filter=[1];

         if(0<datos.length){
        filter= {
            "chat_id":10000,
            "titulo":datos[0].title ,
            ////"descripcion":datos[i].description,
            "link":datos[0].url 
       
        }
   };
   console.log(datos) 
    if (datos && datos.length > 0)
    {
    res.json({
        "message":filter
})
    }
    else
    res.json({"mensaje":"no hay datos"})


 })