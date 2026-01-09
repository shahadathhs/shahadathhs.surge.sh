'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/constant/blogs';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      if (value !== 'all') {
        params.set('category', value);
      } else {
        params.delete('category');
      }
    } else {
      params.delete('category');
    }

    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <Select value={currentCategory} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
