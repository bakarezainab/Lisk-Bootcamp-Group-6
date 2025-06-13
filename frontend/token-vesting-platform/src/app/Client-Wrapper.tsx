'use client';

import { useState, useEffect } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 !border-t-green-500 !border-b-green-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}