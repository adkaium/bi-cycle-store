import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/orders/order.router";
import { AdminRoute } from "../modules/admin/admin.route";
import { UserRouter } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";


const router = Router();

const moduleRoute = [
 
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoute.forEach((route)=>router.use(route.path,route.route));

export default router;