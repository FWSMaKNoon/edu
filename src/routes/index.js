import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Detail from '~/pages/Detail';
import Shop from '~/pages/Shop';
import Cart from '~/pages/Cart';
import User from '~/pages/User';
import Favorites from '~/pages/Favorites';
import { Route } from 'react-router-dom';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/detail/products/:id', component: Detail },
    { path: '/shop', component: Shop },
    { path: '/cart', component: Cart },
    { path: '/user', component: User },
    { path: '/favorites', component: Favorites },
];

//Private Routes
const privateRoutes = [];
<Route path="/detail/products/:id" element={<Detail />} />;
<Route path="/favorites" element={<Favorites />} />;
export { publicRoutes, privateRoutes };
