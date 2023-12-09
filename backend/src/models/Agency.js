const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Agency = sequelize.define('Agency',{
	title:{
		type: DataTypes.STRING
	},
	location:{
		type: DataTypes.STRING
	}
})

module.exports = Agency