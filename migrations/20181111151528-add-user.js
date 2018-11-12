module.exports = {
  async up(db) {
      await db.collection('users').createIndex({name : 1}, {unique: true});
      await db.collection('users').insertOne({name: 'Kirill'});
  },

  down(db) {}
};

