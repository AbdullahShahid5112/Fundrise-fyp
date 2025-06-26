import React from "react";
import SearchFilters from "../components/PitchEntreprenuer/SearchFilters";
// import PitchCards from "../components/LandingPage/PitchCards";
import CallToAction from "../components/LandingPage/CallToAction";
import DefaultLayout from "../components/layout/defaultLayout";
import PitchCards from "../components/PitchEntreprenuer/PitchCards";

const Pitches = () => {
  return (
    <div className="mt-20 bg-white">
      <DefaultLayout>
        <SearchFilters/>
        {/* <PitchCards/> */}
        <PitchCards/>
        <CallToAction/>
      </DefaultLayout>
    </div>
  );
};

export default Pitches;
