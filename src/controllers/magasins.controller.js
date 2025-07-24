import Database from "../db.js";

class MagasinsController {
    static async getAll(req, res) {

        try {
            const [results, fields] = await Database.connection.query(
                'SELECT * FROM `stores`'
            );

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error });
        }
    }

    static async insertStore(req, res) {
        const body = req.body;
        try {
            const [result] = await Database.connection.query(
                `INSERT INTO stores (
                name,
                primary_address,
                secondary_address,
                tel,
                ticket,
                horaires
            ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    body?.name,
                    body?.primary_address,
                    body?.secondary_address,
                    body?.tel,
                    body?.ticket,
                    body?.horaires
                ]
            );

            res.status(201).json({ message: 'Insertion réussie', insertId: result.insertId });
        } catch (error) {
            console.error('Erreur SQL :', error);
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }

    static async removeStore(req, res) {
        const id = req.params.id;

        try {
            const [result] = await Database.connection.query(
                'DELETE FROM `stores` WHERE `id` = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ type: 'NotFound', message: 'Aucun élément trouvé avec cet id.' });
            }

            res.status(200).json({ message: 'Elément supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }

    static async updateStore(req, res) {
        const id = req.params.id;
        const updatedData = req.body;

        try {
            const [result] = await Database.connection.query(
                `
      UPDATE stores 
      SET name = ?, primary_address = ?, secondary_address = ?, tel = ?, ticket = ?, horaires = ?
      WHERE id = ?
      `,
                [
                    updatedData.name,
                    updatedData.primary_address,
                    updatedData.secondary_address,
                    updatedData.tel,
                    updatedData.ticket,
                    updatedData.horaires,
                    id
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

export default MagasinsController;
