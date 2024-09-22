import { Request, Response } from 'express';
import PostService, { likePost, getPostLikes, dislike } from '../services/postService';

export default {
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await PostService.getPosts();
            return res.status(200).json({
                status: 200, msg: posts
            });
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
                status: 200, msg: post
            });
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
                status: 200, msg: newPost
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao criar post" }
            });
        }
    },

};

export async function likePostById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        // TODO: Chame a função do serviço para adicionar um likeà postagem.
        await likePost(id);
        // TODO: Após adicionar o like, chame a função do serviço para obter o número atualizado de likes.
        const likes = await getPostLikes(id);
        // TODO: Retorne o número de likes como resposta em formato JSON.
        res.status(200).json({
            status: 200, msg: { likes, msg: "Like adicionado com sucesso ao post!" }
        });
    } catch (error) {
        res.status(400).json({
            status: 400, msg:
                { error: "Erro ao adicionar like ao post" }
        });
    }
}

export async function getPostLikesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        // TODO: Chame a função do serviço para obter o número de likes da postagem.
        const likes = await getPostLikes(id);
        // TODO: Retorne o número de likes como resposta em formato JSON.
        res.status(200).json({
            status: 200, msg: likes
        });
    } catch (error) {
        res.status(400).json({
            status: 400, msg:
                { error: "Erro ao listar os likes do post" }
        });
    }
}

export async function removeLikeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        // TODO: Chame a função do serviço para adicionar um deslikeao comentário.
        await dislike(id);
        // TODO: Após remover o like, chame a função do serviçopara obter o número atualizado de likes.        
        const likes = await getPostLikes(id);
        // TODO: Retorne o número de likes como resposta em formato JSON.
        res.status(200).json({
            status: 200,
            msg: { likes, msg: "Like removido com sucesso!" }
        });
    } catch (error) {
        res.status(400).json({
            status: 400, 
            msg: { error: "Erro ao remover like do post" }
        });
    }
}