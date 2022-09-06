import React from "react";
import { LinesChartContainer } from "../../components/stocks";
import dataStocks from "../../data/stocks/stocks10.csv";

const Stocks = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-full lg:max-w-7xl flex flex-col gap-4 p-4">
        <LinesChartContainer dataPath={dataStocks} title="Top 10 Companies" />
        {/* <LinesChartContainer dataPath={dataStocks} title="Top 10 Companies" /> */}
      </div>
    </div>
  );
};

export default Stocks;
