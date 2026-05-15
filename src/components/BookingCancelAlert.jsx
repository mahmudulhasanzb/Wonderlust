'use client';
import { TrashBin } from '@gravity-ui/icons';
import { AlertDialog, Button } from '@heroui/react';
import { redirect } from 'next/navigation';

const BookingCancelAlert = ({ bookingId }) => {
  const handleCancelBooking = async () => {
    const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    redirect(`/my-bookings`);
  };

  return (
    <AlertDialog>
      <Button
        variant="outline"
        className={'rounded-none border-red-500 text-red-500'}
      >
        <TrashBin /> Cancel{' '}
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Do you want to cancel the tour?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            {/* <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong>{' '}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body> */}
            <AlertDialog.Footer>
              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Cancel tour
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingCancelAlert;
