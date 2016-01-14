var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var cardSchema = new Schema({
  
  card_id: { type: String, required: true, unique: true },
  notify_days_before_expire: { type: String },
  title_expiration_date: { type: Date, required: true },

  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('card', cardSchema);
