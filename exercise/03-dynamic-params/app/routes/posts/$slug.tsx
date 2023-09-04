import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  invariant(slug, "expected params.slug");

  const post = await getPost(slug);

  invariant(post, "no post found");

  const html = marked(post.markdown);
  return json({ title: post?.title, html });
};
const Post = () => {
  const { html, title } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};

export default Post;
