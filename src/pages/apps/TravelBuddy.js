import React from "react";
import { ProjectsTable } from "../../components/travelbuddy";

const TravelBuddy = () => {
  return (
    <div className="p-4 flex justify-center">
      <div className="w-full lg:max-w-5xl">
        <ProjectsTable />
      </div>
      <div className="h-screen"></div>
    </div>
  );
};

export default TravelBuddy;
