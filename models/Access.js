const {Schema, model} = require('mongoose')

const schema = new Schema({
    Name:{type: String, required: true ,unique: true},
    Pages:{type: String, required: true ,unique: true}
})

module.exports = model('Access', schema)