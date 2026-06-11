import { cache } from "react";

import { prisma } from "@/lib/db/prisma";

export type AdminDashboardMetrics = {
  quotesThisWeek: number;
  pendingTestimonials: number;
  draftBlogPosts: number;
  publishedProjects: number;
};

export type AdminActivityItem = {
  id: string;
  type: "quote" | "testimonial" | "blog" | "project";
  title: string;
  subtitle: string;
  occurredAt: Date;
  href: string;
};

function startOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diff);
  return monday;
}

async function fetchDashboardMetrics(): Promise<AdminDashboardMetrics> {
  const weekStart = startOfWeek();

  try {
    const [
      quotesThisWeek,
      pendingTestimonials,
      draftBlogPosts,
      publishedProjects,
    ] = await Promise.all([
      prisma.quoteRequest.count({
        where: { createdAt: { gte: weekStart } },
      }),
      prisma.testimonial.count({
        where: { isVerified: false },
      }),
      prisma.blogPost.count({
        where: { isPublished: false },
      }),
      prisma.portfolioProject.count({
        where: { isPublished: true },
      }),
    ]);

    return {
      quotesThisWeek,
      pendingTestimonials,
      draftBlogPosts,
      publishedProjects,
    };
  } catch (error) {
    console.error("[admin] Dashboard metrics failed:", error);
    return {
      quotesThisWeek: 0,
      pendingTestimonials: 0,
      draftBlogPosts: 0,
      publishedProjects: 0,
    };
  }
}

async function fetchRecentActivity(): Promise<AdminActivityItem[]> {
  try {
    const [quotes, testimonials, posts, projects] = await Promise.all([
      prisma.quoteRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          suburb: true,
          projectType: true,
          createdAt: true,
        },
      }),
      prisma.testimonial.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          authorName: true,
          isVerified: true,
          isPublished: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          isPublished: true,
          publishedAt: true,
          updatedAt: true,
        },
      }),
      prisma.portfolioProject.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          isPublished: true,
          updatedAt: true,
        },
      }),
    ]);

    const activity: AdminActivityItem[] = [
      ...quotes.map((quote) => ({
        id: `quote-${quote.id}`,
        type: "quote" as const,
        title: `Quote received from ${quote.firstName}`,
        subtitle: `${quote.projectType} · ${quote.suburb}`,
        occurredAt: quote.createdAt,
        href: `/admin/quotes/${quote.id}/`,
      })),
      ...testimonials.map((testimonial) => ({
        id: `testimonial-${testimonial.id}`,
        type: "testimonial" as const,
        title: testimonial.isVerified
          ? `Testimonial verified — ${testimonial.authorName}`
          : `Testimonial pending — ${testimonial.authorName}`,
        subtitle: testimonial.isPublished ? "Published" : "Awaiting review",
        occurredAt: testimonial.updatedAt,
        href: `/admin/testimonials/${testimonial.id}/`,
      })),
      ...posts.map((post) => ({
        id: `blog-${post.id}`,
        type: "blog" as const,
        title: post.isPublished
          ? `Post published — ${post.title}`
          : `Draft updated — ${post.title}`,
        subtitle: post.publishedAt
          ? post.publishedAt.toLocaleDateString("en-AU")
          : "Not scheduled",
        occurredAt: post.updatedAt,
        href: `/admin/blog/${post.id}/edit/`,
      })),
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        type: "project" as const,
        title: project.isPublished
          ? `Project published — ${project.title}`
          : `Project updated — ${project.title}`,
        subtitle: project.isPublished ? "Live on site" : "Draft",
        occurredAt: project.updatedAt,
        href: `/admin/projects/${project.id}/edit/`,
      })),
    ];

    return activity
      .sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime())
      .slice(0, 10);
  } catch (error) {
    console.error("[admin] Activity feed failed:", error);
    return [];
  }
}

export const getAdminDashboardMetrics = cache(fetchDashboardMetrics);
export const getAdminRecentActivity = cache(fetchRecentActivity);
