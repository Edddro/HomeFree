'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from 'next/image';

const attackTypes = ["Attack", "Disaster", "Panic", "Other"];

const names = [
    { name: 'Edward D', src: "/Edward.jpg" },
    { name: 'Krishna C.', src: "/krishna.webp" },
    { name: 'Elizabeth W.', src: "/elizabeth.jpg" },
  ];

const Page = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);
  const [error, setError] = useState("");

  const clickLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? names.length - 1 : prevIndex - 1));
  };

  const clickRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === names.length - 1 ? 0 : prevIndex + 1));
  };

  const handleAttackType = (type: string) => {
    setSelectedAttack(type);
    setError(""); // Clear error if a type is selected
  };

  const handleStartCall = () => {
    if (!selectedAttack) {
      setError("Please select an attack type before proceeding.");
      return;
    }
    router.push("/call");
  };

  return (
    <div className='flex flex-col gap-4 sm:gap-10 justify-center items-center'>

      {/* Profile Image (Fixed) */}
      <div className='w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden relative'>
        <Image
          src={names[currentIndex].src}
          alt={names[currentIndex].name}
          layout="fill" // Makes sure the image fully covers the container
          objectFit="cover" // Ensures no empty spaces
        />
      </div>

      {/* Name & Navigation */}
      <div className='flex flex-row gap-10 justify-center items-center'>
        <Button variant='ghost' onClick={clickLeft}><FaArrowLeft /></Button>
        <span className='min-w-20 text-center'>{names[currentIndex].name}</span>
        <Button variant='ghost' onClick={clickRight}><FaArrowRight /></Button>
      </div>

      {/* Attack Type Selection */}
      <div className='flex flex-col gap-2 justify-center items-center'>
        <span className='text-md text-center font-semibold mb-2'>What's happening?</span>
        {attackTypes.map((type) => (
          <Button
            key={type}
            variant={selectedAttack === type ? "default" : "outline"}
            className={`w-48 py-5 sm:py-6 sm:w-60 rounded-2xl hover:shadow-md ${
              selectedAttack === type ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleAttackType(type)}
          >
            {type}
          </Button>
        ))}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Start Call Button */}
      <Button
        className={`w-48 py-5 sm:py-6 sm:w-56 rounded-2xl hover:shadow-md ${
          selectedAttack ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedAttack}
        onClick={handleStartCall}
      >
        Start Call
      </Button>

    </div>
  );
};

export default Page;
