import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { IoReload } from 'react-icons/io5'
import { MdHomeFilled } from 'react-icons/md'

const GameSuccess = ({attempts, resetGame, path}: {attempts: number; resetGame: ()=> void; path: string}) => {
  return (
    <div className="fixed w-[100%] px-[20px] h-[100vh] left-0 top-0 flex justify-center items-center z-40 bg-[#000000a1] text-white">
            <div className="max-w-[400px] w-[100%] p-[20px] flex flex-col gap-[20px]">
              <h2 className="text-green-400 text-[24px] text-center">
                Congratulations! You've completed the game in {attempts}{" "}
                attempts!
              </h2>
              <div className="w-[100%] flex items-center flex-col justify-center gap-[10px]">
                <Link
                  href={"/"}
                  className='max-w-[200px] w-full justify-center border-2 border-transparent flex gap-[10px] hover:border-white items-center px-10 py-2 rounded-full text-white bg-green-400'
                >
                  <MdHomeFilled size={30}/>
                </Link>
                
                <button
                  className='max-w-[200px] w-full justify-center border-2 border-transparent flex gap-[10px] hover:border-white items-center px-10 py-2 rounded-full text-white bg-green-400'
                  onClick={resetGame}
                >
                  <IoReload size={30}/>
                </button>
                <Link
                  href={`/dashboard/levels/${path}`}
                  className='max-w-[200px] w-full justify-center border-2 border-transparent flex gap-[10px] hover:border-white items-center px-10 py-2 rounded-full text-white bg-green-400'
                >
                  <FaArrowRight size={30}/>
                </Link>
              </div>
            </div>
          </div>
  )
}

export default GameSuccess
