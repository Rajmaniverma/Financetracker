import React from 'react'
import Header from '../Header/Header'
import Body from '../Body/Body'
import MobHeader from '../Header/MobHeader'

const Home = () => {
  return (
    <div>
      <div className='z-50 sm:flex hidden'>
        <Header  /></div>
        <div className='z-50 sm:hidden flex'>
          <MobHeader />
        </div>
        <Body />

    </div>
  )
}

export default Home