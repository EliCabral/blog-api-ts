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

export async function likePost(id: string): Promise<void> {
    const db = await openDatabase();

    // TODO: Atualize a tabela de posts, incrementando o número de likes.
    await db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [id]);
}

export async function getPostLikes(id: string): Promise<number> {
    const db = await openDatabase();

    // TODO: Retorne o número de likes para o post especificado pelo ID.
    const count = await db.get('SELECT likes FROM posts WHERE id = ?', id);
    return await count ? count.likes : 0;
}

export async function dislike(id: string): Promise<void> {
    const db = await openDatabase();
    
    // TODO: Atualize a tabela de comentários, decrementandoo número de likes.
    await db.run('UPDATE posts SET likes = likes - 1 WHERE id = ?', [id]);
}



