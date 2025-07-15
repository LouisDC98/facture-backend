import Database from "../db.js";

class EssentialsController {
    static async getAll(req, res) {

        try {
            const [results, fields] = await Database.connection.query(
                'SELECT * FROM `essentials`'
            );

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error });
        }
    }

    static async insertEssential(req, res) {
        const body = req.body;
        
        try {
            const [result] = await Database.connection.query(
                `INSERT INTO essentials (
                marque,
                code,
                libelle,
                qtyCmd,
                tva,
                prixUnit,
                prixRemise
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    body?.marque,
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

    static async removeEssential(req, res) {
        const code = req.params.id;

        try {
            const [result] = await Database.connection.query(
                'DELETE FROM `essentials` WHERE `code` = ?',
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

    static async updateEssential(req, res) {
        const code = req.params.id;
        const updatedData = req.body;

        try {
            const [result] = await Database.connection.query(
                `
      UPDATE essentials 
      SET marque = ?, libelle = ?, qtyCmd = ?, tva = ?, prixUnit = ?, prixRemise = ?
      WHERE code = ?
      `,
                [
                    updatedData.marque,
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

export default EssentialsController;
