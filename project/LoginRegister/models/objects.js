const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectSchema = new Schema({
    name: {
      type: String,
      required: true,
      maxLength: 20
    },
    fields: [{
      Key: {
        type: String,
        required: true
      },
      Value: {
        type: {},
        required: true
      }
    }],
    tags: [{
      type: String
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: true
    }
  })

module.exports = mongoose.model('objects', objectSchema)






// const obj = {
// 	name: 'someObject',
// 	fields: [{
// 		Key: 'someKey',
// 		Value: 'someValue'
// 	}],
// 	tags: ['someTag', 'someTag2']
// }