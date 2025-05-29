import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Our Blog Platform
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover insightful articles, tutorials, and stories from our community of writers.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/blogs">Explore Blogs</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard/login">Writer Login</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Hero Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="550"
              src="/placeholder.svg?height=550&width=800"
              width="800"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
