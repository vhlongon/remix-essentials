import { prisma } from "~/db.server";

export const getPostListItems = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: { authorId: userId },
  });

  return {
    posts,
  };
};
