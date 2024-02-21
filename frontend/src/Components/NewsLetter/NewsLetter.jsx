import React from 'react'
import '../NewsLetter/NewsLetter.css'


export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive offer on Your Email</h1>
        <p>Subscribe to our Newletter and stay updated</p>
        <div>
            <input  type='email' placeholder="Your Email id" />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
