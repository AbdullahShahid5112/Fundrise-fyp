import React from 'react'
import SearchFilters from '../components/PitchEntreprenuer/SearchFilters'
import PitchCards from '../components/LandingPage/PitchCards'
import CallToAction from '../components/LandingPage/CallToAction'

const Pitches = () => {
  return (
    <div className='mt-20 bg-white'>
      <SearchFilters/>
      <PitchCards/>
      <CallToAction/>
  
    </div>
  )
}

export default Pitches