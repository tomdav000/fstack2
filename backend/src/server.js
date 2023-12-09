const express = require('express')
const cors = require('cors')
const path = require('path')
const upload = require('express-fileupload')
const app = express()

app.use(cors())
app.use(upload())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname,'../dist'),{maxAge:'1y',etag:false}))
app.use('/images',express.static(path.resolve(__dirname,'../images')))
app.use('/api/content',require('./routes/routes'))

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'../dist/index.html'))
})

app.listen(process.env.MYSQLPORT,()=>console.log(`live on port ${process.env.MYSQLPORT}`))