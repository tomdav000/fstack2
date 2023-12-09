const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Gal = sequelize.define('Gal',{
	name:{
		type: DataTypes.STRING
	},
	photo:{
		type: DataTypes.STRING
	}
})

module.exports = Gal