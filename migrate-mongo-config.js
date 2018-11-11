module.exports = {
    mongodb: {
        url: "mongodb://localhost:27017",
        databaseName: "grabme",
        options: {
            useNewUrlParser: true
        }
    },
    migrationsDir: "migrations",
    changelogCollectionName: "migrations"
};