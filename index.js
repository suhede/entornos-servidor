const express = require("express");
const PORT = process.env.PORT || '';
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const mensajesUsuario = [
  {
    id: 0,
    remitente: "Robert Cavalli",
    destinatario: "Maritza Carrion",
    asunto: "Reunión planificación aniversario empresa",
    mensaje: "Saludos; La reunión se realizará el próximo lunes a 4:30 pm."
  },
  {
    id: 1,
    remitente: "Gonzalo Urrique",
    destinatario: "Robert Cavalli",
    asunto: "Presupuesto Anual", 
    mensaje:"Buenos Dias; El presupuesto para los proximos eventos ha sido aprobado con varios caambios que afectan a varios departamentos de la empresa."
  },
  {
    id: 2,
    remitente: "Carlos Ortega",
    destinatario: "Robert Cavalli",
    asunto: "Convocatoria de Verano",
    mensaje:"Buenas Tardes; Siguiendo la planificación anual, las inscripciones para la convocatoria del verano estarán oficialmente abierta a partir de mañana a primera hora."
  },
  {
    id: 3,
    remitente: "Doris Garcia",
    destinatario: "Robert Cavalli",
    asunto: "Reunion Comida Socios",
    mensaje:"Saludos; La reunión se realizará el próximo miercoles a las 2:00pm, en el Restaurante Milenium de la calle Arteaga."
  },
  {
    id: 4,
    remitente: "Robert Cavalli",
    destinatario: "Roberto Casas",
    asunto: "Documentación Pendiente",
    mensaje:"Buenos Dias; Se informa mediante este mensaje que deberá visitar una de nuestras oficinas comerciales a firmar los documentos pendientes. Necesitará traer su DNI y copia del impreso con su número de ficha."
  },
];
//--------------------------------------------------------------------------------
app.get('/',(req,res)=>{

  try{
    res.status(200).json('Url lanzada en ruta de inicio /')
  }catch (error){
    res.status(500).json('Error dentro de Express')
  }

});
//-----------------------------------------------------------------------------

app.get('/mensajes',(req,res, next)=>{

  try{

    res.json({contenido:mensajesUsuario})
    let arrayA = mensajesUsuario.map((desc=>{
      return{
        id:desc.id,
        asunto:desc.asunto
      } 

    }));
  res.json({contenido:arrayA})

  }
  
  catch(error){
    next (error)
  }

  });

app.use((err,req,res,next)=>{
  res.status(500).json('Error en la Api')
 });

//-------------------------------------------------

app.post('/enviar',(req,res, next)=>{
  try{
    let destinatario = req.body.destinatario;
    let asunto = req.body.asunto;
    let mensaje = req.body.mensaje;
    let id = mensajesUsuario.length;
   
    let objeto = {
     id:id,
     destinatario: destinatario,
     asunto: asunto,
     mensaje: mensaje
    }
    mensajesUsuario.push(objeto);
    res.redirect(process.env.LINK_CLIENTE);
  }catch (error){
    next(error)
  }
});
app.use((err,req,res,next)=>{
  res.status(501).json('Error en la lectura del formulario')
})


//-----------------------------------------
app.listen(process.env.PORT, ()=>{
  console.log("Servidor Encendido");
});
