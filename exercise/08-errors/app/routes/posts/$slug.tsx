import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import { ErrorFallback } from "~/components";
import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, `params.slug is required`);

  throw new Response("not found", { status: 404 });

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json({ post, html });
}

// catch boundary will catch the error thrown in loader if you throw a response
// it will have access to the response object with status, statusText, data etc
// in this case if the status is 404 we will render a not found message
// otherwise we will throw an error, then the error boundary will catch it
export const CatchBoundary = ({ error }: { error: Error }) => {
  const caught = useCatch();
  console.log("🚀 ~ caught:", caught);

  if (caught.status === 404) {
    return <div>Not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  const { slug } = useParams();

  return (
    <ErrorFallback>
      <p>Something went wrong for the post with slug {slug}</p>
      <pre>{error.message}</pre>
    </ErrorFallback>
  );
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();
  console.log("🚀 ~ PostSlug:", PostSlug);

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
