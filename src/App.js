import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';

function App() {
    const [currentUser, setCurrentUser] = useState(false);
    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === undefined ? DefaultLayout : route.layout || Fragment;
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
                                        <Page currentUser={currentUser} setCurrentUser={setCurrentUser} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </Router>
    );
}

export default App;
