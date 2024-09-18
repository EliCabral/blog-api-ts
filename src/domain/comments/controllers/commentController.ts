import { Request, Response } from 'express';
import CommentService from '../services/commentService';

export default {
    async getComments(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const comments = await CommentService.getAllCommentsById(id);
            return res.status(200).json({
                status: 200, msg:comments });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao listar comentários" }
            });
        }
    },

    async addComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const newComment = await CommentService.addComment(id, content);
            return res.status(200).json({
                status: 200, msg:newComment });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao adicionar comentario" }
            });
        }
    }

};