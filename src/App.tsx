import Form from "./component/Form";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import Board from "./component/Board";
import Update from "./component/Update";
function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Board /> }, 
        { path: "add", element: <Form /> }, 
        { path: "update/:id", element: <Update></Update> } 
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
