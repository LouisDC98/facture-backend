import Database from "../db.js";

class PicturesController {
    static async getAll(req, res) {

        try {
            const [results, fields] = await Database.connection.query(
                'SELECT id, code FROM `pictures`'
            );

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error });
        }
    }

    static async getById(req, res) {
        const id = req.params.id;
        const multiple = req.query.multiple === 'true';
        try {
            const query = multiple
                ? 'SELECT * FROM `pictures` WHERE code = ?'
                : 'SELECT * FROM `pictures` WHERE code = ? ORDER BY RAND() LIMIT 1';

            const [results] = await Database.connection.query(query, [id]);

            if (results.length === 0) {
                return res.status(404).json({ message: 'Image non trouvée' });
            }

            const images = results.map(row => ({
                ...row,
                _data: row.data.toString('base64')
            }));
            res.status(200).json(multiple ? images : images[0]);
        } catch (error) {
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }

    static async insertPicture(req, res) {
        try {
            const { name, code } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'Image manquante' });
            }

            const [result] = await Database.connection.query(
                `INSERT INTO pictures (name, code, data) VALUES (?, ?, ?)`,
                [name, code, file.buffer]
            );

            res.status(201).json({ message: 'Insertion réussie', insertId: result.insertId });
        } catch (error) {
            console.error('Erreur SQL :', error);
            res.status(500).json({ type: 'Erreur', message: error.message });
        }
    }


    static async removePicture(req, res) {
        const id = req.params.id;

        try {
            const [result] = await Database.connection.query(
                'DELETE FROM `pictures` WHERE `id` = ?',
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

    // static async updateStore(req, res) {
    //     const id = req.params.id;
    //     const updatedData = req.body;

    //     try {
    //         const [result] = await Database.connection.query(
    //             `
    //   UPDATE stores 
    //   SET name = ?, primary_address = ?, secondary_address = ?, tel = ?, ticket = ?, horaires = ?
    //   WHERE id = ?
    //   `,
    //             [
    //                 updatedData.name,
    //                 updatedData.primary_address,
    //                 updatedData.secondary_address,
    //                 updatedData.tel,
    //                 updatedData.ticket,
    //                 updatedData.horaires,
    //                 id
    //             ]
    //         );

    //         if (result.affectedRows === 0) {
    //             return res.status(404).json({ type: 'NotFound', message: 'Aucun article trouvé avec ce code.' });
    //         }

    //         res.status(200).json({ message: 'Article modifié avec succès.' });
    //     } catch (error) {
    //         res.status(500).json({ type: 'Erreur', message: error.message });
    //     }
    // }

}

export default PicturesController;
