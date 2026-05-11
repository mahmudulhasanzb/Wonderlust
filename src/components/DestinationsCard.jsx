import Image from 'next/image';
import {LuMapPin} from 'react-icons/lu';
import Link from 'next/link';
import React from 'react'
import { CiCalendar } from 'react-icons/ci';

const DestinationsCard = ({ destination }) => {

  const {imageUrl, destinationName, price, category, departureDate, country, duration, description} = destination

    return (
      <div
        key={destination._id}
        className="card rounded-2xl p-5 border border-gray-200 shadow-lg"
      >
        <Image
          className="w-full h-48 object-cover rounded-2xl"
          src={imageUrl}
          alt={destinationName}
          width={300}
          height={300}
        />

        <div>
          <div className='flex items-center gap-2'>
            <LuMapPin className='text-red-500'/>
            <p>{country}</p>
          </div>
          <div>
            <h2 className='text-lg font-bold'>{destinationName}</h2>
          </div>
          <div className='flex items-center gap-2'>
            <CiCalendar/>
            {duration}
          </div>
        </div>
      </div>
    );
}

export default DestinationsCard