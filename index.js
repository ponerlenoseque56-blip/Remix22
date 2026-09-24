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
<h1 style="color:red">REMIX22 ADMIN V4</h1>
<input id="t" placeholder="Nombre peli" style="width:90%;padding:12px;margin:6px;background:#222;color:#fff;border:none;border-radius:8px"><br>
<input id="i" placeholder="Link imagen" style="width:90%;padding:12px;margin:6px;background:#222;color:#fff;border:none;border-radius:8px"><br>
<input id="l" placeholder="Link youtube" style="width:90%;padding:12px;margin:6px;background:#222;color:#fff;border:none;border-radius:8px"><br>
<button id="bAdd" style="width:92%;padding:14px;background:#b30000;color:#fff;border:none;border-radius:8px;font-weight:bold;margin-top:10px">+ AGREGAR</button><br>
<button id="bSave" style="width:92%;padding:14px;background:#00aa00;color:#fff;border:none;border-radius:8px;margin-top:10px">GUARDAR TODO</button>
<div id="lista" style="margin-top:15px"></div>
<p><a href="/ver" style="color:#0f0;font-size:20px">IR A VER APP</a></p>
<script>
let pelis=[];
async function cargar(){let r=await fetch('/pelis');pelis=await r.json();mostrar();}
function mostrar(){let c=document.getElementById('lista');c.innerHTML='';pelis.forEach((p,idx)=>{let d=document.createElement('div');d.style="background:#111;padding:10px;margin:10px;border-radius:10px";d.innerHTML='<img src="'+p.imagen+'" style="width:60px;height:80px;object-fit:cover" onerror=this.src="https://via.placeholder.com/60x80"><b> '+p.titulo+'</b> <button onclick="borrar('+idx+')" style="background:red;color:#fff;border:none;padding:5px 10px;border-radius:5px;float:right">X</button>';c.appendChild(d);});}
document.getElementById('bAdd').onclick=()=>{let tit=document.getElementById('t').value;let img=document.getElementById('i').value;let link=document.getElementById('l').value;if(!tit||!img||!link){alert('Llena los 3');return;}pelis.push({titulo:tit,imagen:img,link:link});document.getElementById('t').value='';document.getElementById('i').value='';document.getElementById('l').value='';mostrar();};
document.getElementById('bSave').onclick=async()=>{await fetch('/pelis',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(pelis)});alert('GUARDADO! Anda a /ver');};
window.borrar=(i)=>{pelis.splice(i,1);mostrar();};
cargar();
</script>
</body>
`);
});

app.get('/ver', (req,res)=>{
res.send(`
<body style="background:#000;color:#fff;font-family:Arial;margin:0">
<div style="background:#b30000;padding:15px;text-align:center;font-weight:bold;position:sticky;top:0;z-index:10">REMIX22</div>
<div id="lista" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px">Cargando...</div>
<div id="player" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:100"><div style="padding:10px;display:flex;justify-content:space-between"><b id="pt"></b><button onclick="document.getElementById('player').style.display='none';document.getElementById('pv').innerHTML=''" style="background:red;color:#fff;border:none;padding:10px;border-radius:5px">X CERRAR</button></div><div id="pv" style="width:100%;height:85vh;background:#111"></div></div>
<script>
function getYT(u){let id='';if(u.includes('v='))id=u.split('v=')[1].split('&')[0];else if(u.includes('youtu.be/'))id=u.split('youtu.be/')[1].split('?')[0];else id=u;return id;}
async function cargar(){let r=await fetch('/pelis');let pelis=await r.json();let c=document.getElementById('lista');if(!pelis.length){c.innerHTML='Vacia';return;}c.innerHTML='';pelis.forEach(p=>{let d=document.createElement('div');d.style="background:#111;border-radius:12px;overflow:hidden";let yt=getYT(p.link);d.innerHTML='<img src="'+p.imagen+'" style="width:100%;height:200px;object-fit:cover" onerror=this.src="https://via.placeholder.com/300"><div style="padding:8px;text-align:center">'+p.titulo+'</div><button onclick="ver(\\''+yt+'\\',\\''+p.titulo.replace(/'/g,'')+'\\')" style="width:92%;background:#b30000;color:#fff;padding:10px;margin:8px;border:none;border-radius:8px">VER AHORA</button>';c.appendChild(d);});}
window.ver=(yt,tit)=>{document.getElementById('pt').innerText=tit;document.getElementById('pv').innerHTML='<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+yt+'" frameborder="0" allowfullscreen></iframe>';document.getElementById('player').style.display='block';}
cargar();
</script>
</body>
`);
});

app.get('/pelis', (req,res)=>{try{res.send(fs.readFileSync('./pelis.json','utf8'))}catch{res.send('[]')}});
app.post('/pelis', (req,res)=>{fs.writeFileSync('./pelis.json', JSON.stringify(req.body, null, 2));res.send({ok:true})});
app.listen(PORT, ()=>console.log('ok'));
