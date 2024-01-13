import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './errorPage';
import Login from './login/loginview'
import reportWebVitals from './reportWebVitals';
import TodoList from './tasks/todo/todoList';
import Detal from './tasks/detail';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    // element: <Login />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      {
        path: 'app',
        element: <App />,
      },
      {
        path: 'detail',
        element: <Detal />,
      },
    ],
  },
]);


root.render(
  <React.StrictMode>
    <Login />
    <hr />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
