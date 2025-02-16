'use client'

import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Favicon from '@public/globe.svg';
import Image from 'next/image';

const attackType = [
  "Attack",
  "Disaster",
  "Panic",
  "Other"
]

const names = [
  {
    name: 'Krishna C.',
    src: Favicon,
  },
  {
    name: 'Jane Doe',
    src: Favicon,
  },
  {
    name: 'Alice',
    src: Favicon,
  },
];

const page = () => {
  const [currentName, setCurrentName] = React.useState(names[0]);

  // handle attack type
  const handleAttackType = (type: string) => {
    console.log(type)
  };

  const clickLeft = () => {
    names.map((name, index) => {
      if (currentName.name === name.name) {
        if (index === 0) return setCurrentName(names[names.length - 1]);

        setCurrentName(names[index - 1]);
      }
    })
  };
  
  const clickRight = () => {
    console.log('left');
    names.map((name, index) => {
      if (currentName.name === name.name) {
        if (index === names.length - 1) return setCurrentName(names[0]);
  
        setCurrentName(names[index + 1]);
      }
    })
  }


  return (
    <>
      <div className='flex flex-col gap-4 sm:gap-10 justify-center items-center'>
        <div className='rounded-full p-2 w-40 h-40 sm:w-60 sm:h-60'>
          <Image src={currentName.src} alt="favicon" className='w-full h-full' />
        </div>
        <div className='flex flex-row gap-10 justify-center items-center'>
          <Button variant={'ghost'} onClick={() => clickLeft()}>
            <FaArrowLeft />
          </Button>
          <span className='min-w-20 text-center'>{currentName.name}</span>
          <Button variant={'ghost'} onClick={() => clickLeft()}>
            <FaArrowRight />
          </Button>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <span className='text-md text-center font-semibold mb-2'>What's happening?</span>
          {attackType.map((type, index) => (
            <Button key={index} variant={'outline'} className='w-48 py-5 sm:py-6 sm:w-60 rounded-2xl hover:shadow-md' onClick={() => handleAttackType(type)}>
              {type}
            </Button>
          ))}
        </div>
        <Button className='w-48 py-5 sm:py-6 sm:w-56 rounded-2xl hover:shadow-md' variant={'outline'}>
          Start Call
        </Button>
      </div>
    </>
  )
}

export default page