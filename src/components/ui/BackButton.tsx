"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function BackButton({ label = 'Back' }: { label?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full inline-flex items-center cursor-pointer"
      onClick={() => router.back()}
      aria-label={label}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
