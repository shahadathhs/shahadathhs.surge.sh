"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TextEditor } from "@/components/text-editor";
import { createBlog, updateBlog } from "@/lib/blog-service";
import { categories } from "@/constant/blogs";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  excerpt: z
    .string()
    .min(10, { message: "Excerpt must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  thumbnailUrl: z.string().url({ message: "Please enter a valid URL" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  blog?: {
    _id: string;
    title: string;
    excerpt: string;
    category: string;
    thumbnailUrl: string;
    content: string;
  };
}

export function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: blog
      ? {
          title: blog.title,
          excerpt: blog.excerpt,
          category: blog.category,
          thumbnailUrl: blog.thumbnailUrl,
          content: blog.content,
        }
      : {
          title: "",
          excerpt: "",
          category: "",
          thumbnailUrl: "",
          content: "",
        },
  });

  async function onSubmit(values: BlogFormValues) {
    setIsSubmitting(true);
    try {
      if (blog) {
        await updateBlog(blog._id, values);
        toast("Blog updated", {
          description: "Your blog post has been updated successfully",
        });
      } else {
        await createBlog(values);
        toast("Blog created", {
          description: "Your blog post has been created successfully",
        });
      }
      router.push("/dashboard/blogs");
    } catch (error) {
      console.log("Error creating/updating blog:", error);
      toast("Error", {
        description: blog
          ? "Failed to update blog post"
          : "Failed to create blog post",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormDescription>
                A catchy title for your blog post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a short excerpt"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief summary of your blog post (displayed on blog cards)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The category your blog post belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter thumbnail URL" {...field} />
              </FormControl>
              <FormDescription>
                URL to the thumbnail image (from Cloudinary)
              </FormDescription>
              {field.value && (
                <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                  <Image
                    src={field.value || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                The main content of your blog post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? blog
                ? "Updating..."
                : "Creating..."
              : blog
                ? "Update Blog"
                : "Create Blog"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/blogs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
