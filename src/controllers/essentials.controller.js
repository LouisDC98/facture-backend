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
}

export default EssentialsController;
