const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectSchema = new Schema({
  name: {
    obj: {
      type: {},
      required: true
    },
    tags: [{
      type: String
    }],
   
  },
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



// {
//   name: {
//     'someKey': 'someValue',
//       'someKey': 'someValue',
//         'someKey': 'someValue',
//           'someKey': 'someValue',
//             'someKey': 'someValue',
//               'someKey': 'someValue',
//                 'someKey': 'someValue',
//                   'someKey': 'someValue',
//                     'someKey': 'someValue',
//                       'someKey': 'someValue',
//                         'someKey': 'someValue',
//                           'someKey': 'someValue',
//                             'someKey': 'someValue',
//                               'someKey': 'someValue',
//                                 'someKey': 'someValue',
//                                   tags: ['someTag', 'someTag2']
//   },
// {
//   name2: {
//     'someKey': 'someValue',
//               tags: ['someTag', 'someTag2']
//   }
// }