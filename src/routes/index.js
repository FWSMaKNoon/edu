import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Shop from '~/pages/Shop';
import Cart from '~/pages/Cart';
import User from '~/pages/User';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/shop', component: Shop },
    { path: '/cart', component: Cart },
    { path: '/user', component: User },
];

//Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
