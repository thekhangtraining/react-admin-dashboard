import React from "react";
import { ProjectsTable } from "../../components/travelbuddy";

const TravelBuddy = () => {
  return (
    <div className="p-4 bg-zinc-800 grid grid-cols-12">
      <div className="col-span-12 md:px-0 md:col-start-2 md:col-span-10 overflow-auto">
        <ProjectsTable />
        <div className="h-screen"></div>
      </div>
    </div>
  );
};

export default TravelBuddy;
