import React, { useState } from "react";
import axios from "axios";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [hyperparameters, setHyperparameters] = useState({
    param1: "",
    param2: "",
  });

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onHyperparametersChange = (e) => {
    setHyperparameters({ ...hyperparameters, [e.target.name]: e.target.value });
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("param1", hyperparameters.param1);
    formData.append("param2", hyperparameters.param2);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" onChange={onFileChange} />
      <input
        type="text"
        name="param1"
        placeholder="Parameter 1"
        onChange={onHyperparametersChange}
      />
      <input
        type="text"
        name="param2"
        placeholder="Parameter 2"
        onChange={onHyperparametersChange}
      />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
};

export default UploadComponent;
