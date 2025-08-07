// import Header from './Header';
import Header from './Header';
import Sidemenu from './Sidemenu';
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from '../config/routes';
import { Suspense, useState } from 'react';
import ContextMenu from './Context';
import useProfile from './Header/hooks-integration/useProfile';

const Layout = () => {
    const [open, setopen] = useState(false);
    const { data } = useProfile();
    // console.log(data?.level);
    return (
        <ContextMenu.Provider value={{
            open,
            setopen
        }}>
            <div className='flex h-screen'>
                <Sidemenu level={data?.level} />
                <div className='w-full flex flex-col'>
                    <Header data={data} />
                    <main className='p-6 overflow-auto h-screen flex-1 shadow-sm bg-white'>
                        <div className='w-full'>
                            <Suspense fallback={"loading..."}>
                                <Routes>
                                    {RouteConfig.private.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                element={
                                                    (
                                                        <route.component
                                                            title={route.name}
                                                            action={route.action}
                                                            level={data?.level}
                                                        // access={payload?.permission?.permissionList[route.access]}
                                                        // allAccess={payload?.permission?.permissionList}
                                                        // actionGroup={payload?.permission?.actionGroup}
                                                        />
                                                    )
                                                }
                                            />
                                        ) : (null);
                                    })}
                                </Routes>
                            </Suspense>
                        </div>
                    </main>
                </div>
            </div>
        </ContextMenu.Provider>
    );
};

export default Layout;
