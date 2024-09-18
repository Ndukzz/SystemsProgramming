import { useState } from "react";
import NdukweE1 from "./NdukweE1";

const LoadSearchFile = () => {
  const [fileContent, setFileContent] = useState(null);
  const [list, setList] = useState([]);

  const handleSearchSelect = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      readFileContents(selectedFile);
    }
  };

  const readFileContents = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      const fileList = result.split("\n");
      setFileContent(result);
      setList(fileList);
    };

    reader.readAsText(file);
    if (list) {
      const results = new NdukweE1().parseSearch(list);
      console.log(list);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleSearchSelect} />
      {fileContent && (
        <div>
          <h4>Drop Search File</h4>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default LoadSearchFile;
