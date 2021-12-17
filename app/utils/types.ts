import { Post } from "@prisma/client";

export interface LoadedPostData {
  posts: Post[];
}
