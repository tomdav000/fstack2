require('dotenv').config()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQLDATABASE,process.env.MYSQLUSER,process.env.MYSQLPASSWORD,{
	host:process.env.MYSQLHOST,
	port: process.env.MYSQLPORT,
	dialect:'mysql'
})

sequelize.authenticate().then(()=>console.log('database authenticated'))
.catch((err)=>console.log('DB not Authenticated'))

module.exports = sequelize