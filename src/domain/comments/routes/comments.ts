import { Router } from 'express';
import CommentController from '../controllers/commentController';

const router = Router();
router.get('/:postId/comments', CommentController.getComments);
router.post('/:postId/comments', CommentController.addComment);

export default router;
