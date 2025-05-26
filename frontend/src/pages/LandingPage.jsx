import React from 'react'
import HeroSection from '../components/LandingPage/HeroSection'
import PitchCards from '../components/LandingPage/PitchCards'
import Industries from '../components/LandingPage/industries'
import CallToAction from '../components/LandingPage/CallToAction'
import InvestorsCard from '../components/Investors/InvestorsCard'
import Investor1 from '../components/Investors/Investor1'
const LandingPage = () => {
  return (
    <div className=''>
<HeroSection/>
<PitchCards/>
<Investor1/>
<Industries/>
<CallToAction/>
    </div>
  )
}

export default LandingPage