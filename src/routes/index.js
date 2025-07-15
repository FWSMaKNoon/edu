import Home from '~/pages/Home';
import Detail from '~/pages/Detail';
import Favorites from '~/pages/Favorites';
import View from '~/pages/View';
import { Route } from 'react-router-dom';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/detail/products/:id', component: Detail },
    { path: '/favorites', component: Favorites },
    { path: '/view', component: View },
];

//Private Routes
const privateRoutes = [];
<Route path="/detail/products/:id" element={<Detail />} />;
<Route path="/favorites" element={<Favorites />} />;
export { publicRoutes, privateRoutes };
