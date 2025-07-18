import Home from '~/pages/Home';
import Favorites from '~/pages/Favorites';
import View from '~/pages/View';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/favorites', component: Favorites },
    { path: '/view', component: View },
];

//Private Routes
const privateRoutes = [];
export { publicRoutes, privateRoutes };
