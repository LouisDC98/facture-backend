import express from 'express'
import Database from './db.js'
import cors from 'cors'

import usersRoutes from './routes/users.route.js';
import essentialsRoutes from './routes/essentials.route.js';
import randomsRoutes from './routes/randoms.route.js';
import magasinsRoutes from './routes/magasins.route.js';


async function startApp() {
    const app = express();
    app.use(cors())
    app.use(express.json({ limit: '50mb' }));
    app.use(
        express.urlencoded({
            extended: false,
            limit: '50mb',
        })
    );

    app.use('/profiles', usersRoutes);
    app.use('/essentials', essentialsRoutes);
    app.use('/randoms', randomsRoutes);
    app.use('/magasins', magasinsRoutes);

    console.log('FACTURE SERVER STARTING...');

    // INIT DATABASE CONNECTION
    try {
        await Database.connect();
    } catch (error) {
        console.log(error);
        throw error;
    }

    app.listen(process.env.APP_PORT || 3000, () => {
        console.log('SERVER RUNNING ON PORT ' + (process.env.APP_PORT || 3000));
    });
}

startApp();




