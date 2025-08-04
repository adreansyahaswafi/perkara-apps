import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout"
import { RouteConfig } from "./config/routes";
import { PrivateRoute, PublicRoute } from "./helper/Router";

function App() {
  return (
    <div className='text-5xl bg-white h-screen'>
      <BrowserRouter>
        <Routes>
          {RouteConfig.public.map((route, idx) => {
            const { component: Component, path, name, ...restConfig } = route;

            return Component ? (
              <Route
                key={idx}
                path={path}
                element={<PublicRoute><Component {...restConfig} title={name} /></PublicRoute>}
              />
            ) : null
          })}
          <Route path="/*" element={<PrivateRoute><Layout /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
