import { csv } from "d3";
import { useEffect, useState } from "react";

const useData = (dataPath) => {
  const [data, setData] = useState();
  useEffect(() => {
    csv(dataPath).then((data) => {
      setData(data);
    });
  }, [dataPath]);
  return data;
};

export default useData;
