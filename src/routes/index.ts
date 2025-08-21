import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { getContacts, createContact, deleteContact} from '../services/contact.js';

    const router = express.Router();
    const dataSource = './data/list.txt';

    router.post('/contatos', async (req, res) => {
        const { name } = req.body;
        
        if(!name || name.length < 2) {
            return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres.' });
        }

        // Processamento de dados
            await createContact(name);
            res.status(201).json({ message: `Contato ${name} adicionado com sucesso!` });

    });

    router.get('/contatos', async (req, res) => {
        let list = await getContacts();
        res.json({ contatos: list });
    });

    router.delete('/contatos/', async (req, res) => {
        const { name } = req.query;
        
        if(!name){
            return res.status(400).json({ error: 'Nome é obrigatório para exclusão.' });
        }

        await deleteContact(name as string);
        res.json({ message: `Contato ${name} excluído com sucesso!` });

    });

    export default router;