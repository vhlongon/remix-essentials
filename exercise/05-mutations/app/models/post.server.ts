import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

// 🐨 export a new function called createPost which accepts a title, slug, and markdown
// and returns the newly created post.

export const createPost = async (
  args: Pick<Post, "slug" | "title" | "markdown">,
) => {
  return prisma.post.create({ data: args });
};
