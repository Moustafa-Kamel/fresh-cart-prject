import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Brand } from "@/types/brands";
import { CatalogImage } from "./CatalogImage";

export function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <Link
          key={brand._id}
          href={`/products?brand=${brand._id}`}
          className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
            <CatalogImage
              src={brand.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
              className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
            {brand.name}
          </h3>
          <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            <span className="text-xs text-violet-600 flex items-center gap-1">
              View Products
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
