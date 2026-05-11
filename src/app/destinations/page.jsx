import DestinationsCard from '@/components/DestinationsCard';
import Link from 'next/link';
import React from 'react'

const DestinationsPage = async () => {
  const res = await fetch('http://localhost:5000/destinations');
  const destinations = await res.json();

  console.log(destinations);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-5 mt-10'>All Destinations</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto mt-10'>
        {destinations.map(destination => (
<DestinationsCard destination={destination} key={destination._id}/>
        ))}
      </div>
    </div>
  );
}

export default DestinationsPage