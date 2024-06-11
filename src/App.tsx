import * as React from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <main>
    <AppRoutes />
  </main>
);

export default App;
