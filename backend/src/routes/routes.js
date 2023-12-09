const express = require('express')
const Gal = require('../models/Gal')
const Agency = require('../models/Agency')
const sequelize = require('../config/db')
const router = express.Router()

Agency.belongsTo(Gal)
Gal.hasMany(Agency,{as:'agencys'})

sequelize.sync().then(()=>console.log('Database is in sync'))
.catch((err)=>console.log('Database is not synchronized at the moment',err))

//Ag routes//
router.get('/test',(req,res)=>{
	res.send('Hello World, NiHao')
})

router.get('/:id/agencys',async(req,res)=>{
	try{
		const gal = await Gal.findByPk(req.params.id)
		res.send(gal.agencys)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.get('/:id/agencys/:id',async(req,res)=>{
	try{
		const ag = await Agency.findByPk(req.params.id)
		res.send(ag)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.put('/:id/agencys/:id',async(req,res)=>{
	try{
		const ag = await Agency.findByPk(req.params.id)
		if(ag){
			ag.title = req.body.title;
			ag.location = req.body.location;
			ag.GalId = ag.GalId;
			await ag.save()
			res.redirect('/api/content')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.delete('/:id/agencys/:id',async(req,res)=>{
	try{
		const ag = await Agency.findByPk(req.params.id)
		if(ag){
			ag.destroy()
			res.redirect('/api/content')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.post('/:id/agencys',async(req,res)=>{
	try{
		const newAg = {
			title: req.body.title,
			location: req.body.location,
			GalId: req.params.id
		}
		const ag = await Agency.create(newAg)
		console.log(ag)
		res.redirect('/api/content')
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})
//End Ag routes//

//Gal routes//
router.get('/',async(req,res)=>{
	try{
		const gals = await Gal.findAll({include:'agencys'})
		res.send(gals)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.get('/:id',async(req,res)=>{
	try{
		const gal = await Gal.findByPk(req.params.id,{include:'agencys'})
		res.send(gal)
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.delete('/:id',async(req,res)=>{
	try{
		const gal = await Gal.findByPk(req.params.id)
		if(gal){
			await gal.destroy()
			res.redirect('/api/content')
		}
	}catch(error){
		console.log(error)
		res.status(500).send('Not Available...')
	}
})

router.put('/:id',async(req,res)=>{
	try{
		const gal = await Gal.findByPk(req.params.id)
		gal.name = req.body.name;
		let photo = '';
		if(!req.files){
			return res.status(500).send('No Files Attached.')
		}
		const file = req.files.photo;
		const img_name = file.name;

		if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/webp'){
			file.mv('images/'+file.name,function(err){
				if(err){
					return res.status(500).send(err)
				}
				gal.photo = img_name;
				gal.save()
				res.redirect('/api/content')
			})
		} else {
			console.log('This format is not Allow. Upload file with .png, .gif, .jpeg, or .webp')
		}
		
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available')
	}
})

router.post('/',async(req,res)=>{
	try{
		const name = req.body.name;
		let photo = '';
		if(!req.files){
			return res.status(500).send('No Files Attached.')
		}
		const file = req.files.photo;
		const img_name = file.name;

		if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/webp'){
			file.mv('images/'+file.name,function(err){
				if(err){
					return res.status(500).send(err)
				}
				const newGal = {
					name:name,
					photo: img_name,
				}
				Gal.create(newGal)
				res.redirect('/api/content')
			})
		} else {
			console.log('This format is not Allow. Upload file with .png, .gif, .jpeg, or .webp')
		}
		
	}catch(err){
		console.log(err)
		res.status(500).send('Not Available')
	}
})
//End Routes//

module.exports = router