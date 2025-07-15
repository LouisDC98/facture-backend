import Database from "../db.js";

class RandomsController {
    static async getAll(req, res) {

        try {
            const [results, fields] = await Database.connection.query(
                'SELECT * FROM `randoms`'
            );

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error });
        }
    }

    static async insertRandom(req, res) {
        const body = req.body;

        try {
            const [result] = await Database.connection.query(
                `INSERT INTO randoms (
                code,
                libelle,
                qtyCmd,
                tva,
                prixUnit,
                prixRemise
            ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    body?.code,
                    body?.libelle,
                    body?.qtyCmd,
                    body?.tva,
                    body?.prixUnit,
                    body?.prixRemise
                ]
            );

            res.status(201).json({ message: 'Insertion réussie', insertId: result.insertId });
        } catch (error) {
            console.error('Erreur SQL :', error);
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }

    static async removeRandom(req, res) {
        const code = req.params.id;

        try {
            const [result] = await Database.connection.query(
                'DELETE FROM `randoms` WHERE `code` = ?',
                [code]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ type: 'NotFound', message: 'Aucun article trouvé avec ce code.' });
            }

            res.status(200).json({ message: 'Article supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }

    static async updateRandom(req, res) {
        const code = req.params.id;
        const updatedData = req.body;

        try {
            const [result] = await Database.connection.query(
                `
      UPDATE randoms 
      SET libelle = ?, qtyCmd = ?, tva = ?, prixUnit = ?, prixRemise = ?
      WHERE code = ?
      `,
                [
                    updatedData.libelle,
                    updatedData.qtyCmd,
                    updatedData.tva,
                    updatedData.prixUnit,
                    updatedData.prixRemise,
                    code
                ]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ type: 'NotFound', message: 'Aucun article trouvé avec ce code.' });
            }

            res.status(200).json({ message: 'Article modifié avec succès.' });
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }

}

export default RandomsController;
