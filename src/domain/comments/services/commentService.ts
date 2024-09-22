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

export async function likeComment(commentId: string): Promise<void> {
    // TODO: Abra a conexão com o banco de dados.
    const db = await openDatabase();

    // validação se comentario existe
    const comment = await db.get('SELECT * FROM comments WHERE id = ?', commentId);

    if (!comment) {
        throw new Error('Comentário não encontrado');
    }

    // TODO: Atualize a tabela de comentários, incrementandoo número de likes.
    await db.run('UPDATE comments SET likes = likes + 1 WHERE id = ?', [commentId]);
}

export async function getCommentLikes(commentId: string): Promise<number> {
    // TODO: Abra a conexão com o banco de dados.
    const db = await openDatabase();

    // TODO: Retorne o número de likes para o comentário especificado pelo ID.
    const count = await db.get('SELECT likes FROM comments WHERE id = ?', commentId);
    return await count ? count.likes : 0;
}

export async function dislike(commentId: string): Promise<void> {
    const db = await openDatabase();
    
    // TODO: Atualize a tabela de comentários, decrementandoo número de likes.
    await db.run('UPDATE comments SET likes = likes - 1 WHERE id = ?', [commentId]);
}
