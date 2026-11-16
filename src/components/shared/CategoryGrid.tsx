import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Daum } from "@/types/categories";
import { CatalogImage } from "./CatalogImage";

export function CategoryGrid({ categories }: { categories: Daum[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/categories/${category._id}`}
          className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-hover transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
            <CatalogImage
              src={category.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-hover transition-colors">
            {category.name}
          </h3>
          <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-primary-hover flex items-center gap-1">
              View Products
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
