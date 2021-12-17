import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const getPosts = () => {
  return [
    { id: "1", title: "Post 1", body: "This is post 1" },
    { id: "2", title: "Post 2", body: "This is post 2" },
    { id: "3", title: "Post 3", body: "This is post 3" },
  ];
};

const seed = async () => {
  await Promise.all(
    getPosts().map((post) => {
      return db.post.create({ data: post });
    })
  );
};

seed();
