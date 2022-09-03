import React from "react";
import { LinesChart } from "../../components/stocks";

const Stocks = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full lg:max-w-7xl flex flex-col items-center">
        {/* <StocksChartHighcharts /> */}
        <LinesChart width={800} height={600} />
      </div>
    </div>
  );
};

export default Stocks;
