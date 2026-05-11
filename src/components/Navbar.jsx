import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-lg">

      <ul className='flex gap-3'>
        <li>
          {' '}
          <Link href="/">Home </Link>
        </li>
        <li>
          {' '}
          <Link href="/add-destination">Destinations </Link>
        </li>
        <li>
          {' '}
          <Link href="my-bookings">My Bookings </Link>
        </li>
      </ul>

      <div>
        <Image
          src={'/assets/Wanderlast.png'}
          width={100}
          height={100}
          alt="logo"
        />
      </div>

      <ul className='flex gap-3'>
        <li>
          {' '}
          <Link href="/profile">Profile</Link>{' '}
        </li>
        <li>
          {' '}
          <Link href="/login">Login</Link>{' '}
        </li>
        <li>
          {' '}
          <Link href="/sign-up">Sign Up</Link>{' '}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
