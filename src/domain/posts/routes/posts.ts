import { Router } from 'express';
import PostController from '../controllers/postController';

const router = Router();

router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPost);
router.post('/posts', PostController.addPost);

export default router;
