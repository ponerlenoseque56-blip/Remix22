const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
  res.send('Remix22 API OK - usa /pelis');
});

app.get('/pelis', (req,res)=>{
  const data = fs.readFileSync('./pelis.json','utf8');
  res.send(data);
});

app.post('/pelis', (req,res)=>{
  fs.writeFileSync('./pelis.json', JSON.stringify(req.body, null, 2));
  res.send({ok:true});
});

app.listen(PORT, ()=> console.log('Remix22 corriendo'));
