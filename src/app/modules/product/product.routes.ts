import experss from 'express';
import { ProductControllers } from './product.controller';

import { auth } from '../../middlewares/auth';
import { adminMiddleware } from '../../middlewares/adminAuth';

const router = experss.Router();

router.post('/',adminMiddleware, ProductControllers.creatPorduct);
router.get('/', ProductControllers.getsProduts);
router.get('/:productId', ProductControllers.productById);
router.put('/:productId', auth(), ProductControllers.updateProduct);
router.delete('/:productId',adminMiddleware, ProductControllers.deleteProduct);

export const ProductRoutes = router;
