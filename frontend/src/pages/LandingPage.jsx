import React from 'react'
import HeroSection from '../components/LandingPage/HeroSection'
import Industries from '../components/LandingPage/Industries'
import CallToAction from '../components/LandingPage/CallToAction'
// import InvestorsCard from '../components/Investors/InvestorsCard'
import DefaultLayout from '../components/layout/defaultLayout'
import PitchListView from '../components/PitchEntreprenuer/PitchCards'
import Investor1 from '../components/Investors/InvestorsCard'
const LandingPage = () => {
  return (
    <div className=''>
<DefaultLayout>
  <HeroSection/>
{/* <PitchCards/> */}
<PitchListView/>
{/* <PitchCards/> */}
<Investor1/>
<Industries/>
<CallToAction/>
</DefaultLayout>
    </div>
  )
}

export default LandingPage