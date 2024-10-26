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
import LastHomeProduct from './LastHomeProduct'


const Home = () => {
    const { pageNumber, keyword } = useParams()
  return (
    <div>
      {!keyword && <Hero />}
      {!keyword && <HeroTwo />}
       <HomeProduct />
      {!keyword && <Uniques />}

      {!keyword && <UniqueTwo />}
      {!keyword && <HeroThree />}
      {!keyword && <LastHomeProduct />}
      {!keyword && <Client />}
       <LastProducts />
    </div>
  )
}

export default Home
