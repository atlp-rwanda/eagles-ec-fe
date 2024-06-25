import * as React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => (
  <main>
    <AppRoutes />
  </main>
);

export default App;
