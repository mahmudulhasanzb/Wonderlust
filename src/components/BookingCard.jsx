'use client';
import { authClient } from '@/lib/auth-client';
import { Button, Card, DateField } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  console.log(new Date(departureDate));

  const { price, image, country, _id, destinationName } = destination;

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      userImage: user?.image,
      userEmail: user?.email,
      destinationId: _id,
      destinationName,
      price,
      destinationImage: image,
      country,
      departureDate: new Date(departureDate),
    }
  const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
  })
    const data = await res.json()
    toast.success("Booking successful")

  }

  return (
    <Card className="space-y-3 p-5 rounded-none border border-gray-200 min-w-[200px]">
      <div>
        <p>Starting from:</p>
        <h1 className="font-bold text-2xl text-cyan-500">${price}</h1>
        <p>per person</p>
      </div>

      <DateField onChange={setDepartureDate} className="w-full" name="date">
        <DateField.Group>
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      <Button onClick={handleBooking} className="w-full text-white" color="primary">
        Book Now
      </Button>

      <div className="text-center border border-gray-200">
        <p>Cancelation available</p>
        <p>Cancelation available</p>
        <p>Cancelation available</p>
      </div>
    </Card>
  );
};

export default BookingCard;
