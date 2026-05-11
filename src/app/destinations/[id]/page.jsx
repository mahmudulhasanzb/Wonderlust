import { EditModal } from '@/components/EditModal';
import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { LuMapPin } from 'react-icons/lu';

const DestinationDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();

  if (!destination || destination.error) {
    return <div className="text-center mt-20 text-2xl font-bold">Destination Not Found</div>;
  }

  const {
    imageUrl,
    destinationName,
    price,
    category,
    departureDate,
    country,
    duration,
    description,
  } = destination;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex  items-center gap-3 justify-end mt-5 mb-3">
        <EditModal destination={destination} />
      </div>

      <Image
        className="w-full h-100 object-cover rounded-2xl"
        alt={destinationName}
        src={imageUrl}
        height={300}
        width={300}
      />

      <div>
        <div className="flex items-center gap-2">
          <LuMapPin className="text-red-500" />
          <p>{country}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <div>
              <h2 className="text-lg font-bold">{destinationName}</h2>
            </div>

            <div className="flex items-center gap-2">
              <CiCalendar />
              {duration}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">${price}</h3>
          </div>
        </div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
