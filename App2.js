import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './src/components/Header.js';
import Body from './src/components/Body.js';
import About from './src/components/About.js';
import Contact from './src/components/Contact.js';
import RestaurantMenu from './src/components/RestaurantMenu.js';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from './src/components/Error.js';
import {Provider} from 'react-redux';
import appStore from './src/components/appStore.js';
import Cart from './src/components/Cart.js';
import Login from './src/components/Login.js';
import { Toaster } from 'react-hot-toast';

const AppLayout=()=>{
    return (
    <Provider store={appStore}>
        
        <div className="app">
            <Toaster position="top-right" reverseOrder={false} />
            <Header/>
            {/* <Body/> */}
            <Outlet/> {/* Outlet is component. Whenever there is change in path, outlet will be filled with children according to the path .imported from react router dom. read it in Ep 7 */}
        </div>
    
    </Provider>
    )
};

// configuration
// configurations means some information that will define what will happen specific route
// It takes a list of path
const appRouter= createBrowserRouter([
    {
        path:'/', // means if my path is '/' , then load AppLayout component which is our main component
        element: <AppLayout/>,
        errorElement: <Error/>, // If some page doesnt exist, then we will throw the error. Read in Ep 7
        children:[     // Read in Ep 7
            {
                path:'/',
                element:<Body/>
            },
            // {
            //     path:'/about', // Whenever i m on about, our outlet will be filled with about component
            //     element: <About/>
            // },
            {
                path: '/contact',
                element: <Contact/>
            },
            {
                path: 'restaurants/:resId', // :resId is a parameter. Read in Ep 7
                element: <RestaurantMenu/>
            },
            {
                path:'/cart',
                element: <Cart/>
            },
            {
                path: 'login',
                element: <Login/>
            }
        ]
    },
    // {
    //     path:'/',
    //     element:<About/>
    // },
    // {
    //     path:'/about',
    //     element: <About/>
    // },
    // {
    //     path: 'contact',
    //     element: <Contact/>
    // }
])


const root= ReactDOM.createRoot(document.getElementById('root'));
// root.render(<AppLayout/>);
// Instead of doing this, we will now provide RouterProvider component
root.render(<RouterProvider router={appRouter}/>)


// named export is used to export multiple components from one file
// default export is used to export one component from one file
// eg of named export-  export const CDN_LINK=" https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
// now to import it in another file we will use import {CDN_LINK} from './file.js' ..... in curly braces we will write the name of the component we want to import