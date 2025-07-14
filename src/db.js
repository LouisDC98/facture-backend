// Get the client
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    static connection = null; 

    static async connect() {
        // Create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            database: process.env.DATABASE,
        });

        Database.connection =  connection;
    }
}



export default Database;
