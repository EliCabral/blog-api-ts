import { Router } from 'express';
import PostController, { likePostById, getPostLikesById, removeLikeById } from '../controllers/postController';

const router = Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPost);
router.post('/', PostController.addPost);
// Rota para adicionar um like a uma postagem
router.post('/:id/like', likePostById);
// Rota para obter o número de likes de uma postagem
router.get('/:id/likes', getPostLikesById);
router.post('/:id/dislike', removeLikeById);

export default router;
