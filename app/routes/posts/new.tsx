import { ActionFunction, Link, redirect, useActionData, json } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

function validateTitle(title: any) {
  if (typeof title !== "string" || title.length < 3) {
    return "Title should be at least 3 characters long!";
  }
}

function validateBody(body: any) {
  if (typeof body !== "string" || body.length < 10) {
    return "Body should be at least 10 characters long!";
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const user = await getUser(request);

  const fields = { title: title as string, body: body as string };

  const fieldErrors = {
    title: validateTitle(title),
    body: validateBody(body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const post = await db.post.create({ data: { ...fields, userId: user!.id } });

  return redirect(`/posts/${post.id}`);
};

const NewPost = () => {
  const actionData = useActionData();

  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={actionData?.fields?.title}
            />
            <div className="error">
              <p>{actionData?.fieldErrors?.title ?? null}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="body">Body</label>
            <textarea
              defaultValue={actionData?.fields?.body}
              name="body"
              id="body"
            />
            <div className="error">
              <p>{actionData?.fieldErrors?.body ?? null}</p>
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
