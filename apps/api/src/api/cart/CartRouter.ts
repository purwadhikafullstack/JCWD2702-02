import { Router } from 'express';
import { CartController} from './CartController';

const cartController = new CartController()
const router = Router();

router.get('/count', cartController.getCartItem.bind(cartController))
router.post('/', cartController.addToCart.bind(cartController))
router.delete('/', cartController.deleteCartItem.bind(cartController))
router.put('/', cartController.updateCartItem.bind(cartController))

export default router;