'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';

export default function AppLayout({
  children,
  breadcrumbs = [],
}: {
  children: React.ReactNode;
  breadcrumbs?: { href: string; label: string }[];
}) {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="">
        <Breadcrumbs items={breadcrumbs} />

        <main className="">{children}</main>
      </div>
    </div>
  );
}
