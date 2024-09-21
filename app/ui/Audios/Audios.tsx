import React, { MutableRefObject } from 'react'

const Audios = ({refs}: {refs: MutableRefObject<HTMLAudioElement | null>[]}) => {
  return (
    <div className='fixed top-[-200px]'>
      <audio controls ref={refs[0]} className="absolute top-0 opacity-0">
        <source src="/audio/music2.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={refs[1]} className="absolute top-0 opacity-0">
        <source src="/audio/music4.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={refs[2]} className="absolute top-0 opacity-0">
        <source src="/audio/success.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={refs[3]} className="absolute top-0 opacity-0">
        <source src="/audio/completed.mp3" type="audio/mpeg" />
      </audio>
      <audio controls ref={refs[4]} className="absolute top-0 opacity-0">
        <source src="/audio/gameover.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default Audios
