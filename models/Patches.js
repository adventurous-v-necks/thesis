const mongoose = require('mongoose');

const patchSchema = mongoose.Schema({
  user: { type: Schema.ObjectId, ref: 'User' ],
  configuration: [Schema.Types.Mixed]},
});

var Patch = mongoose.model('Patch', patchSchema);

module.exports = Patch;