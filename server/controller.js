var { GroceryList } = require('../database/index.js')

module.exports = {
  post: (req, res) => {
    var { item } = req.body;
    console.log(item);
    GroceryList.create({ item: item }, (err, item) => {
      if (err) {
        res.status(404).send('Failed to save to DB');
      } else {
        res.status(200).send('Success: Saved to DB');
      }
    });
  },

  get: (req, res) => {
    GroceryList
      .find({})
      .exec((err, data) => {
        if (err) {
          res.status(404).send('Error getting from database');
        } else {
          res.status(200).json(data);
        }
      });
  },

  put: (req, res) => {
    var { itemID, item } = req.body;
    GroceryList
      .findByIdAndUpdate(itemID, { $set: { item: item } }, (err, data) => {
        if (err) {
          res.status(404).send('Error updating item');
        } else {
          res.status(200).send('Success');
        }
      });
  },

  delete: (req, res) => {
    var { itemID } = req.query;
    GroceryList
      .findByIdAndRemove(itemID, (err, data) => {
        if (err) {
          res.status(404).send('Error deleting item');
        } else {
          res.status(200).send('Success');
        }
      });
  }
}