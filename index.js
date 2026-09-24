const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
  res.send(`
  <body style="background:#000;color:#fff;font-family:Arial;padding:15px;text-align:center">
  <h1 style="color:red">REMIX22 ADMIN</h1>
  <input id="titulo" placeholder="Nombre de la peli" style="width:90%;padding:12px;margin:6px;background:#222;color:#fff;border:none;border-radius:8px">
  <input id="imagen" placeholder="Link de la imagen (https://...)" style="width:90%;padding:12px;margin:6px;background:#222;color:#fff;border:none;border-radius:8px">
  <input id="link" placeholder="Link de la peli / Drive" style="width:90%;padding:12px;margin:6px;background:#222;color:#fff;border:none;border-radius:8px">
  <button onclick="agregar()" style="width:92%;padding:12px;background:#b30000;color:#fff;border:none;border-radius:8px;font-weight:bold">+ AGREGAR PELI</button>
  <button onclick="guardar()" style="width:92%;padding:12px;margin-top:8px;background:#00aa00;color:#fff;border:none;border-radius:8px;font-weight:bold">GUARDAR EN LA NUBE</button>
  <div id="lista" style="margin-top:15px"></div>
  <p style="margin-top:20px"><a href="/
