
const express = require('express')
const { decodeGuildExperiment } = require('discord-experiments')
const app = express()
const port = 8080
const axios = require('axios')

app.get('/', (req, res) => {
  res.send('Made by <@1083437693347827764> (| __.JS.__ |#4546)!')
})
app.get('/api/v1/calculate/:string', (req,res)=>{
    function hash(x) {
        var e, a = 0, c = 3432918353, h = 461845907, r = 0;
        for (var t = x; r < t.length - t.length % 4; r += 4) {
          e = 5 * (65535 & (e = (e ^= a = (65535 & (a = (a = (65535 & (a = 255 & t.charCodeAt(r) | (255 & t.charCodeAt(r + 1)) << 8 | (255 & t.charCodeAt(r + 2)) << 16 | (255 & t.charCodeAt(r + 3)) << 24)) * c + (((a >>> 16) * c & 65535) << 16)) << 15 | a >>> 17)) * h + (((a >>> 16) * h & 65535) << 16)) << 13 | e >>> 19)) + ((5 * (e >>> 16) & 65535) << 16) + 3864292196;
        }
        switch (a = 0, t.length % 4) {
          case 3:
            a ^= (255 & t.charCodeAt(r + 2)) << 16;
          case 2:
            a ^= (255 & t.charCodeAt(r + 1)) << 8;
          case 1:
            e ^= a = (65535 & (a = (a = (65535 & (a ^= 255 & t.charCodeAt(r))) * c + (((a >>> 16) * c & 65535) << 16)) << 15 | a >>> 17)) * h + (((a >>> 16) * h & 65535) << 16);
        }
        e ^= t.length;
        e = 2246822507 * (65535 & (e ^= e >>> 16)) + ((2246822507 * (e >>> 16) & 65535) << 16);
        e = 3266489909 * (65535 & (e ^= e >>> 13)) + ((3266489909 * (e >>> 16) & 65535) << 16);
        e ^= e >>> 16;
        return (e >>> 0) % 1e4;
    }
    if (req.params.string == undefined || req.params.string == "None"){
        var err = "❌ Enter the required args : experiment_name:guild_id";
        res.send(err)
    }else{
    res.send({result:hash(req.params.string)})
    }
    })

app.get('/api/v1/rollouts/:exp', (req, res) => {
    const experiment = req.params.exp
    const r = axios.get('https://api.rollouts.advaith.io/').then(response => {
    const rollouts = response.data
    const d = rollouts[rollouts.findIndex(e => e.data.id === experiment)]
    res.send({"result":decodeGuildExperiment(d.rollout) })
  })
});
app.get('/api/v1/experiments',(req,res) =>{
  const r = axios.get('https://api.rollouts.advaith.io/').then(response => {
  const exps = response.data
  const ids = []
  for (d of exps){
    ids.push(d.data.id)
  }
  res.send(ids)
  })
})
app.listen(port, () => {
  console.log(`Server is ready in https://localhost:${port}`)
})
