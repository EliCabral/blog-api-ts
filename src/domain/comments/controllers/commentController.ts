import { Request, Response } from 'express';
import CommentService, { likeComment, getCommentLikes, dislike } from '../services/commentService';

export default {
    async getComments(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const comments = await CommentService.getAllCommentsById(postId);

            return res.status(200).json({
                status: 200, msg: comments
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao listar comentários" }
            });
        }
    },

    async addComment(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const { content } = req.body;

            const newComment = await CommentService.addComment(postId, content);

            return res.status(201).json({
                status: 201,
                msg: newComment
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                msg: { error: "Erro ao adicionar comentário" }
            });
        }
    }


};

export async function likeCommentById(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;

    try {
        // TODO: Chame a função do serviço para adicionar um likeao comentário.
        await likeComment(commentId);
        // TODO: Após adicionar o like, chame a função do serviçopara obter o número atualizado de likes.
        const likes = await getCommentLikes(commentId);
        // TODO: Retorne o número de likes como resposta em formato JSON.
        res.status(200).json({
            status: 200,
            msg: { likes, msg: "Like adicionado com sucesso ao comentário!" }
        });
    } catch (error: any) {
        if (error.message === 'Comentário não encontrado') {
            res.status(404).json({
                status: 404,
                msg: { error: "Comentário não encontrado" }
            });
        } else {
            res.status(400).json({
                status: 400, msg: { error: "Erro ao adicionar like ao comentário" }
            });
        }
    }
}

export async function getCommentLikesById(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;

    try {
        // TODO: Chame a função do serviço para obter o número delikes do comentário.
        const likes = await getCommentLikes(commentId);
        // TODO: Retorne o número de likes como resposta em formato JSON.
        res.status(200).json({
            status: 200, msg: likes
        });
    } catch (error) {
        res.status(400).json({
            status: 400, msg:
                { error: "Erro ao listar likes do comentario" }
        });
    }
}

export async function removeLikeById(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;

    try {
        // TODO: Chame a função do serviço para adicionar um deslikeao comentário.
        await dislike(commentId);
        // TODO: Após remover o like, chame a função do serviçopara obter o número atualizado de likes.        
        const likes = await getCommentLikes(commentId);
        // TODO: Retorne o número de likes como resposta em formato JSON.
        res.status(200).json({
            status: 200,
            msg: { likes, msg: "Like removido com sucesso!" }
        });
    } catch (error) {
        res.status(400).json({
            status: 400, 
            msg: { error: "Erro ao remover like do comentário" }
        });
    }
}
