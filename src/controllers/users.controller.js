import Database from "../db.js";

class UsersController {
  static async getAll(req, res) {

    try {
      const [results, fields] = await Database.connection.query(
        'SELECT * FROM `users`'
      );

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ type: 'Erreur', message: error });
    }
  }

  static async getById(req, res) {
    const userId = req.params.id
    console.log(userId)

    try {
      const [results, fields] = await Database.connection.query(
        'SELECT * FROM `users` WHERE userID = ?', [userId]
      );

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ type: 'Erreur', message: error });
    }
  }

}

export default UsersController;
