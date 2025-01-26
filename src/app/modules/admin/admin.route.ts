import { Router } from 'express';

import { AdminController } from './admin.controller';
import { adminMiddleware } from '../../middlewares/adminAuth';


const router = Router();

// Block a user
router.patch(
  '/users/:userId/block',
  adminMiddleware,
  AdminController.blockUser,
);

// Delete a blog
// router.delete('/blogs/:id', adminMiddleware, AdminController.deleteBlog);

export const AdminRoute = router;
