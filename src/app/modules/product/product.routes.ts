import experss from 'express';
import { ProductControllers } from './product.controller';

const router = experss.Router();

router.post('/', ProductControllers.creatPorduct);
router.get('/', ProductControllers.getsProduts);
router.get('/:productId', ProductControllers.productById);
router.put('/:productId', ProductControllers.updateProduct);
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
