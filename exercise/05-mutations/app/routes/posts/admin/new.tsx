import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { createPost } from "~/models/post.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 chars" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 chars" }),
  markdown: z.string().min(4, { message: "Markdown must be at least 4 chars" }),
});

export const action = async ({ request }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    return json({ errors: parsed.error.flatten().fieldErrors });
  }

  const newPost = await createPost(parsed.data);

  return redirect(`/posts/${newPost.slug}`);
};

export default function NewPost() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {actionData?.errors?.title ? (
            <em className="text-red-600">{actionData.errors.title}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {actionData?.errors?.slug ? (
            <em className="text-red-600">{actionData.errors.slug}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {actionData?.errors?.markdown ? (
          <em className="text-red-600">{actionData.errors.markdown}</em>
        ) : null}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
