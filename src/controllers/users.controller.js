import Database from "../db.js";

class UsersController {
  static async getAll(req, res) {

    try {
      const [results, fields] = await Database.connection.query(
        'SELECT * FROM `profiles`'
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
        'SELECT * FROM `profiles` WHERE userID = ?', [userId]
      );

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ type: 'Erreur', message: error });
    }
  }

  static async removeProfile(req, res) {
    const id = req.params.id;

    try {
      const [result] = await Database.connection.query(
        'DELETE FROM `profiles` WHERE `profileID` = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ type: 'NotFound', message: 'Aucun article trouvé avec cet ID.' });
      }

      res.status(200).json({ message: 'Article supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ type: 'Erreur', message: error.message });
    }
  }

  static async insertProfile(req, res) {
    const body = req.body;

    try {
      const [result] = await Database.connection.query(
        `INSERT INTO profiles (
                firstName,
                lastName,
                adresse,
                city,
                codePostal,
                country,
                clientID,
                cardNumber,
                magasinID,
                ownerID
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body?.firstName,
          body?.lastName,
          body?.adresse,
          body?.city,
          body?.codePostal,
          body?.country,
          body?.clientID,
          body?.cardNumber,
          body?.magasinID,
          body?.ownerID
        ]
      );

      res.status(201).json({ message: 'Insertion réussie', insertId: result.insertId });
    } catch (error) {
      console.error('Erreur SQL :', error);
      res.status(500).json({ type: 'Erreur', message: error.message });
    }
  }

  static async updateProfile(req, res) {
    console.log('back')
    const profileID = req.params.id;
    const updatedData = req.body;

    try {
      const [result] = await Database.connection.query(
        `UPDATE profiles 
      SET firstName = ?, lastName = ?, adresse = ?, city = ?, codePostal = ?, country = ?, cardNumber = ?, magasinID = ?, ownerID = ?
      WHERE profileID = ?
      `,
        [
          updatedData?.firstName,
          updatedData?.lastName,
          updatedData?.adresse,
          updatedData?.city,
          updatedData?.codePostal,
          updatedData?.country,
          updatedData?.cardNumber,
          updatedData?.magasinID,
          updatedData?.ownerID,
          profileID
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ type: 'NotFound', message: 'Aucun profil trouvé avec cet ID.' });
      }

      res.status(200).json({ message: 'Profil modifié avec succès.' });
    } catch (error) {
      res.status(500).json({ type: 'Erreur', message: error.message });
    }
  }

}

export default UsersController;
