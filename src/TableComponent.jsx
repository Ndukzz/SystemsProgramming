import React, { useState, useEffect } from "react";
import "./TableComponent.css"

const TableComponent = ({data}) => {
  console.log(data[0].rflag.toString());
  
  const [tableData, setTableData] = useState([
    {
      symbol: "AAPL",
      value: 100,
      rFlag: true,
      iFlag: false,
      mFlag: true,
    },
    {
      symbol: "GOOG",
      value: 200,
      rFlag: false,
      iFlag: true,
      mFlag: false,
    },
    {
      symbol: "MSFT",
      value: 300,
      rFlag: true,
      iFlag: true,
      mFlag: true,
    },
  ]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Value</th>
          <th>RFlag</th>
          <th>IFlag</th>
          <th>MFlag</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.symbol}</td>
            <td>{row.value}</td>
            <td>{row.rflag.toString()}</td>
            <td>{row.iflag.toString()}</td>
            <td>{row.mflag.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;