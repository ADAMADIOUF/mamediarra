import React from 'react'
import Hero from './Hero'
import HeroTwo from './HeroTwo'
import Uniques from './Uniques'
import UniqueTwo from './UniqueTwo'
import HeroThree from './HeroThree'
import Client from './Client'
import HomeProduct from './HomeProduct'
import LastProducts from './LastProducts'
import { useParams } from 'react-router-dom'


const Home = () => {
    const { pageNumber, keyword } = useParams()
  return (
    <div>
      {!keyword && <Hero />}
      {!keyword && <HeroTwo />}
      <HomeProduct />
      <Uniques />
      <UniqueTwo />
      {!keyword && <HeroThree />}
      <HomeProduct />
      {!keyword && <Client />}
      <LastProducts />
    </div>
  )
}

export default Home
