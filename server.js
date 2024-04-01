const {logger} = require("./src/libs/logger");
const cfg = require("./src/config/server");
const database = require("./src/config/database");
const app = require("./src/index");

//Start the database
database.sequelize.sync()
    .then(() => {
        logger.info("Sync database success")
    })
    .catch((err) => {
        logger.error("Failed to sync db: " + err.message);
    });

app.listen(cfg.port, () => {
    logger.info(`Server is listening on port ${cfg.port}`);
});