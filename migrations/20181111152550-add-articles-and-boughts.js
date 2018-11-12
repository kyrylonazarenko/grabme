const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async up(db) {
    const pencilInstances = [new ObjectId(), new ObjectId(), new ObjectId(), new ObjectId()];
    const bookInstances = [new ObjectId(), new ObjectId(), new ObjectId(), new ObjectId(), new ObjectId()];
    const calculatorInstances = [new ObjectId()];
    const articles = [
      {
        name: 'pencil',
        price: 0.92,
        instances: pencilInstances
      },
      {
        name: 'book',
        price: 10.13,
        instances: bookInstances
      },
      {
        name: 'calculator',
        price: 23.54,
        instances: calculatorInstances
      }
    ];

    await db.collection('articles').createIndex({name : 1}, {unique: true});
    await db.collection('articles').insertMany(articles);

    const user = await db.collection('users').findOne({name: 'Kirill'});
    await db.collection('boughts').insertOne({
        userId: user._id,
        articles: [
            pencilInstances[0], pencilInstances[1],
            bookInstances[2], bookInstances[3], bookInstances[4],
            calculatorInstances[0]
        ]
    });
  },

  down(db) {}
};
