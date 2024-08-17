import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
