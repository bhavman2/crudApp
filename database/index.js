var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/list', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to DB!');
});


var groceryListSchema = new mongoose.Schema({
  item: { type: String, required: true }
});

var GroceryList = mongoose.model('GroceryList', groceryListSchema);

module.exports = { GroceryList };