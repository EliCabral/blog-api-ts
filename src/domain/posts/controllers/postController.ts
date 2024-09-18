import { Request, Response } from 'express';
import PostService from '../services/postService';

export default {
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await PostService.getPosts();
            return res.status(200).json({
                status: 200, msg:posts });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao listar posts" }
            });
        }
    },

    async getPost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await PostService.getPostById(id);
            return res.status(200).json({
                status: 200, msg:post });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Post não encontrado" }
            });
        }
    },

    async addPost(req: Request, res: Response) {
        try {
            const { title, content } = req.body;
            const newPost = await PostService.createPost(title, content);
            return res.status(200).json({
                status: 200, msg:newPost });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao criar post" }
            });
        }
    },

};