import React from "react";
import InvestorsCard from "../components/Investors/InvestorsCard";
import CallToAction from "../components/LandingPage/CallToAction";
import DefaultLayout from "../components/layout/defaultLayout";
const Investor = () => {
  return (
    <div>
      <DefaultLayout>
        <InvestorsCard />
        <CallToAction />
      </DefaultLayout>
    </div>
  );
};

export default Investor;
