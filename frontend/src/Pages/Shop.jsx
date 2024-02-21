import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Offer } from '../Components/Offer/Offer'
import { NewColletion } from '../Components/NewCollections/NewColletion'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'


export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offer />
      <NewColletion />
      <NewsLetter />
    </div>
  )
}
