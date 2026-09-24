const express=require('express');
const fs=require('fs');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
let pelis=[];
try{pelis=JSON.parse(fs.readFileSync('pelis.json'))}catch(e){pelis=[]}
const guardar=()=>fs.writeFileSync('pelis.json',JSON.stringify(pelis,null,2));
app.get('/api/pelis',(q,r)=>r.json(pelis));
app.post('/api/pelis',(q,r)=>{const n={...q.body,id:Date.now()};pelis.push(n);guardar();r.json(n)});
app.delete('/api/pelis/:id',(q,r)=>{pelis=pelis.filter(p=>p.id!=q.params.id);guardar();r.json({ok:1})});
app.get('/',(q,r)=>r.send('Remix22 API OK'));
app.listen(process.env.PORT||3000,()=>console.log('Remix22 corriendo'));
