"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BackendProductGalleryProps {
  images: { url: string }[];
  name: string;
}

export function BackendProductGallery({
  images,
  name,
}: BackendProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
        No images
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={images[selected].url}
          alt={name}
          fill
          className="object-contain"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md",
                selected === index
                  ? "ring-2 ring-zinc-900 dark:ring-zinc-100"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img.url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
