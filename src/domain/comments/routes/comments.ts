import { Router } from 'express';
import CommentController, { likeCommentById, getCommentLikesById, removeLikeById } from '../controllers/commentController';

const router = Router();

router.get('/:postId/comments', CommentController.getComments);
router.post('/:postId/comments', CommentController.addComment);
// Rota para adicionar um like a um comentário
router.post('/:commentId/like', likeCommentById);
// Rota para obter o número de likes de um comentário
router.get('/:commentId/likes', getCommentLikesById);
// Rota para remover um like de um comentário
router.post('/:commentId/dislike', removeLikeById);


export default router;
