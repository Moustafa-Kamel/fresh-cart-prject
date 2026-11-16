"use client";

import { ImageOff } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CatalogImage({
  alt,
  className,
  onError,
  ...props
}: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(
    null,
  );
  if (failedSource === props.src) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center bg-muted text-muted-foreground",
          props.fill && "absolute inset-0",
          className,
        )}
      >
        <ImageOff aria-hidden="true" className="size-8" />
        <span className="sr-only">
          {alt ? `${alt}: image unavailable` : "Image unavailable"}
        </span>
      </span>
    );
  }
  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailedSource(props.src);
        onError?.(event);
      }}
    />
  );
}
