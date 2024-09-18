import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../../../db/database';

export default {
    async getAllCommentsById(postId: string) {
        const db = await openDatabase();
        return db.all('SELECT * FROM comments WHERE postId = ?', postId);
    },

    async addComment(postId: string, content: string) {
        const commentId = uuidv4();
        const db = await openDatabase();

        await db.run('INSERT INTO comments (id, postId, content) VALUES(?, ?, ?)', [commentId, postId, content]);
        return { commentId, postId, content };
    }

};