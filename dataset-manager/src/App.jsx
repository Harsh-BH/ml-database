import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadComponent from "./components/UploadComponent";
import DataVisualizationComponent from "./components/DataVisualizationComponent";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Dataset Manager</h1>
        <Routes>
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/visualize" element={<DataVisualizationComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
