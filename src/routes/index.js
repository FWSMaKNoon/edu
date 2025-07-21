import Home from '~/pages/Home';
import Favorites from '~/pages/Favorites';
import View from '~/pages/View';
import Cart from '~/pages/Cart';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/favorites', component: Favorites },
    { path: '/view', component: View },
    { path: '/cart', component: Cart },
];

//Private Routes
const privateRoutes = [];
export { publicRoutes, privateRoutes };
