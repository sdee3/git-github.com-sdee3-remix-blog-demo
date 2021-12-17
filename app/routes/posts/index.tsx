import { Link, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { LoadedPostData } from "~/utils/types";

export const loader: LoaderFunction = async () => {
  const data = {
    posts: await db.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: false,
      },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

const PostItems = () => {
  const { posts } = useLoaderData<LoadedPostData>();

  return (
    <>
      <div className="page-header">
        <h1>All Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostItems;
