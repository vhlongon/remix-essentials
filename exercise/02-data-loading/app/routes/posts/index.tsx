import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostListItems } from "~/models/post.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const authorId = await requireUserId(request);
  return getPostListItems(authorId);
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
