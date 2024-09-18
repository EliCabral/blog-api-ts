import { Router } from 'express';
import CommentController from '../controllers/commentController';

const router = Router();

router.get('/posts/:id/comments', CommentController.getComments);
router.post('/posts/:id/comments', CommentController.addComment);

export default router;
