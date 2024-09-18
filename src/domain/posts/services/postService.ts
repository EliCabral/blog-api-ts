import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../../../db/database';

export default {
    async getPosts() {
        const db = await openDatabase();
        return await db.all('SELECT * FROM posts');
    },

    async createPost(title: string, content: string) {
        const id = uuidv4();
        const db = await openDatabase();

        await db.run('INSERT INTO posts (id, title, content) VALUES (?, ?, ?)', [id, title, content]);
        return { id, title, content };
    },

    async getPostById(id: string) {
        const db = await openDatabase();
        return await db.get('SELECT * FROM posts WHERE id = ?', id);
    }

};





