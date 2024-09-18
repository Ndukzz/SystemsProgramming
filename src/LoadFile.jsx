import { useState, useEffect } from "react";
import Loader from "./NdukweE1";
import classes from "./LoadFile.module.css";

const FileInputComponent = () => {
  const [programFileContent, setProgramFileContent] = useState(null);
  const [searchFileContent, setSearchFileContent] = useState(null);
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [loader, setLoader] = useState(null);
  const [searchList, setSearchList] = useState([]);

  const handleProgramFileSelect = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      readProgramFileContents(selectedFile);
    }
    setIsTableLoaded(true);
  };

  const handleSearchFileSelect = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      readSearchFileContents(selectedFile);
    }
  };

  const readProgramFileContents = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      setProgramFileContent(result);
    };

    reader.readAsText(file);
  };

  const readSearchFileContents = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      setSearchFileContent(result);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    if (programFileContent) {
      const loader = new Loader(programFileContent);
      loader.parseProgram();
      setLoader(loader);
    }
  }, [programFileContent]);

  useEffect(() => {
    if (searchFileContent) {
      const searchList = searchFileContent.split("\n");
      setSearchList(searchList);
    }
  }, [searchFileContent]);

  useEffect(() => {
    if (loader && searchList.length > 0) {
      const searchResult = loader.parseSearch(searchList);
      // console.log(searchResult);
    }
  }, [loader, searchList]);

  return (
    <div className={classes.inputs}>
      <div className={classes.input}>
        <label htmlFor="Program">Drop Program File</label>
        <br />
        <input type="file" onChange={handleProgramFileSelect} />
        {programFileContent && (
          <div>
            <h4>Program File Content:</h4>
            <pre>{programFileContent}</pre>
          </div>
        )}
      </div>
      <div className={classes.input}>
        <label htmlFor="Program">Drop Search File</label>
        <br />
        <input type="file" onChange={handleSearchFileSelect} />
        {searchFileContent && (
          <div>
            <h4>Search File Content:</h4>
            <pre>{searchFileContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInputComponent;
