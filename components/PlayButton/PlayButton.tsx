import React from 'react'
import { FaPlay } from 'react-icons/fa6'

const PlayButton = ({StartGame}: {StartGame: ()=> void}) => {
  return (
    <div className='px-14 py-10 bg-[#0000004a] w-[100%] h-[100vh] backdrop-blur-md flex justify-center text-orange-400 min-h-[150px] items-center fixed z-50 min-w-[250px]'>
        <button onClick={StartGame} className='flex gap-[10px] hover:border-2 hover:border-white items-center px-10 py-2 rounded-full text-white bg-green-400'>
          <FaPlay size={20}/>
          <span className='text-[24px]'>Play</span>
        </button>
    </div>
  )
}

export default PlayButton
