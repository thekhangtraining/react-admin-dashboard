import React from "react";
import { LinesChartContainer } from "../../components/stocks";
import dataStocks from "../../data/stocks/stocks10.csv";

const Stocks = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full lg:max-w-7xl flex flex-col items-center py-4">
        <LinesChartContainer width={600} height={400} dataPath={dataStocks} />
      </div>
    </div>
  );
};

export default Stocks;
