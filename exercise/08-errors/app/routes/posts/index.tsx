import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ErrorFallback } from "~/components";
import { getPostListItems } from "~/models/post.server";

export const loader = async () => {
  return json({
    posts: await getPostListItems(),
  });
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <ErrorFallback>
      Somethine went wrong with the posts:
      <pre>{error.message}</pre>
    </ErrorFallback>
  );
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
              prefetch="intent"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
