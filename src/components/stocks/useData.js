import { csv } from "d3";
import { useEffect, useState } from "react";
import aaplStockPrices from "../../data/stocks/aapl.csv";

const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (d) => {
      d.close = +d.close;
      d.timestamp = new Date(d.timestamp);
      return d;
    };
    csv(aaplStockPrices, row).then((data) => setData(data));
  }, []);
  return data;
};

export default useData;
