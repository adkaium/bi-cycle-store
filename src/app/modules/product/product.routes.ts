import experss from 'express';
import { ProductControllers } from './product.controller';

import { auth } from '../../middlewares/auth';

const router = experss.Router();

router.post('/',auth(), ProductControllers.creatPorduct);
router.get('/', ProductControllers.getsProduts);
router.get('/:productId', ProductControllers.productById);
router.put('/:productId', auth(), ProductControllers.updateProduct);
router.delete('/:productId',auth(), ProductControllers.deleteProduct);

export const ProductRoutes = router;
