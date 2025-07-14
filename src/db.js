// Get the client
import mysql from 'mysql2/promise';

class Database {
    static connection = null; 

    static async connect() {
        // Create the connection to database
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            database: 'facture',
        });

        Database.connection =  connection;
    }
}



export default Database;
