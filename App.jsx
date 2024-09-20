import React, { useEffect, useState } from "react";
import FileInputComponent from './LoadFile'
import './App.css'

// Component to display logs and tables
const ConsoleLogDisplay = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Store original console functions
    const originalConsoleLog = console.log;
    const originalConsoleTable = console.table;

    // Override console.log
    console.log = function (...args) {
      // Call the original console.log
      originalConsoleLog.apply(console, args);

      // Add new log message to the state
      setLogs((prevLogs) => [...prevLogs, { type: "log", content: args.join(" ") }]);
    };

    // Override console.table
    console.table = function (tableData) {
      // Call the original console.table
      originalConsoleTable.apply(console, [tableData]);

      // Convert table data into a table format and add to state
      const tableHeaders = Object.keys(tableData[0] || {});
      const tableRows = tableData.map((row) => Object.values(row));

      setLogs((prevLogs) => [
        ...prevLogs,
        {
          type: "table",
          headers: tableHeaders,
          rows: tableRows,
        },
      ]);
    };

    // Cleanup: Restore original console.log and console.table
    return () => {
      console.log = originalConsoleLog;
      console.table = originalConsoleTable;
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#0000", padding: "10px", border: "1px solid #ccc", height: "300px", overflowY: "auto", fontFamily: "monospace" }}>
      {logs.map((log, index) =>
        log.type === "log" ? (
          // Render normal log messages
          <div key={index}>{log.content}</div>
        ) : (
          // Render table logs with all flags (including iflag and mflag)
          <div key={index} style={{ marginTop: "10px" }}>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%", marginBottom: "10px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {log.headers.map((header, headerIndex) => (
                    <th key={headerIndex}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {log.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

// Example usage in a React app
const App = () => {
  return (
    <>
    <h1>Systems Programming</h1>
    <p>Open up the console to view results</p>
    <FileInputComponent />
    <ConsoleLogDisplay />
    </>
  )
}

export default App
