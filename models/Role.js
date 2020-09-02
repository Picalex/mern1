const {Schema, model} = require('mongoose')

const schema = new Schema({
    roleName:{type: String, required: true ,unique: true},
    rights:{type:String, required: true,default:'r'}
})

module.exports = model('Role', schema)