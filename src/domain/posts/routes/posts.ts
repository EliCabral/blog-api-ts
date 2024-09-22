import { Router } from 'express';
import PostController from '../controllers/postController';

const router = Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPost);
router.post('/', PostController.addPost);

export default router;
