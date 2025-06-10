const loggerService = require('./services/logger.service.js');
const dbService = require('./services/db.service.js');
const backendConfig = require('./config/backend.config.json');
const userRoutes = require('./routes/users.route.js');
const clientRoutes = require('./routes/clients.route.js');
const criteriaRoutes = require('./routes/criteria.route.js');
const ratingsRoutes = require('./routes/ratings.route.js');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/criteria', criteriaRoutes);
app.use('/ratings', ratingsRoutes);
dbService.initializeAsync().then(() => {
    const listener = app.listen(backendConfig.port, () => {
        loggerService.logInfo('The app is listening on port ' + listener.address().port);
    });
}, (error) => {
    loggerService.logError(error);
});