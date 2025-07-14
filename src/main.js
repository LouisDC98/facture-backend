import  express from 'express'
import usersRoutes from './routes/users.route.js';
import Database from './db.js'


async function startApp() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(
    express.urlencoded({
      extended: false,
      limit: '50mb',
    })
  );

  app.use('/users', usersRoutes);

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




