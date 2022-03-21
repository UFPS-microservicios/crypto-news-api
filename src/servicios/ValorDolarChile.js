const express = require('express')
const endpoints = express.Router()
const axios = require('axios')

endpoints.get('/dia/:dia/mes/:mes/anio/:anio', async(req, res)=> {
    const {dia, mes, anio} = req.params
    const fecha = dia + '-' + mes + '-' + anio
    console.log(fecha)
    const urlAPI = `https://mindicador.cl/api/dolar/${fecha}`;

    const respuestaAPI = await axios.get(urlAPI)
    const datos = respuestaAPI.data
    const serie = datos.serie
    
    console.log(serie)

    if (serie && serie.length > 0){
        res.json({
            'PAIS': 'CHILE',
            'VALOR': serie[0].valor,
            'FECHA': fecha
        })
    }

})

module.exports = endpoints