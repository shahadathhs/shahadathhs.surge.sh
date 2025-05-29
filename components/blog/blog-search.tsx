"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const params = new URLSearchParams(searchParams)
        params.set("query", searchQuery)
        router.push(`/blogs?${params.toString()}`)
      } else if (searchParams.has("query")) {
        const params = new URLSearchParams(searchParams)
        params.delete("query")
        router.push(`/blogs?${params.toString()}`)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, router, searchParams])

  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search blogs..."
        className="w-full pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
