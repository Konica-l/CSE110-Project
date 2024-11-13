import React from 'react'
import Navbar from '../navbar/Navbar'
import Event from '../carousel/Event'
import Data from '../../event_list.json'


const Home = () => {
  return (
    <div>
      <Navbar />
      {
        Data.map( data => {
          return(
            <Event title={data.title} date={data.date_time} text={data.preview} img={data.image} />
          )
        })
      }
    </div>
  )
}

export default Home
