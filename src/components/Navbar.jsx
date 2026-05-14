'use client';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log('user from navbar ', user);

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-lg">
      <ul className="flex gap-3">
        <li>
          <Link href="/">Home </Link>
        </li>
        <li>
          <Link href="/destinations">Destinations </Link>
        </li>
        <li>
          <Link href="/my-bookings">My Bookings </Link>
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

      <ul className="flex gap-3">
        {user ? (
          <>
            <li className="flex items-center gap-2">
              <Link href="/profile">
                <Image
                  src={user?.image}
                  width={50}
                  height={50}
                  alt="user image"
                  className="rounded-full border border-gray-300 hover:border-sky-600 hover:shadow-md hover:shadow-sky-300 transition-all duration-300"
                />
              </Link>
              <li className="font-bold">{user?.name}</li>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
