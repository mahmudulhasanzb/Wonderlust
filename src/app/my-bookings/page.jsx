import BookingCancelAlert from '@/components/BookingCancelAlert';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { id } = session?.user;

  const res = await fetch(`http://localhost:5000/booking/${id}`);
  const bookings = await res.json();

  return (
    <div className="max-w-7xl">
      <h1 className="text-center font-semibold text-2xl my-10">My Bookings</h1>
      <div className="space-y-5">
        {bookings.map(booking => (
          <div className="flex gap-5 border p-5 min-w-3xl" key={booking._id}>
            <Image
              src={booking.destinationImage}
              alt={booking.destinationName}
              width={300}
              height={300}
            />
            <div>
              <h1 className="font-bold text-2xl">{booking.destinationName}</h1>
              <p>{booking.departureDate}</p>
              <p>id: {booking._id}</p>
              <p className="text-2xl font-bold text-cyan-500">
                ${booking.price}
              </p>

              <BookingCancelAlert bookingId={booking._id} />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
