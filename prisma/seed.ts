import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPosts = () => {
  return [
    { id: "1", title: "Post 1", body: "This is post 1" },
    { id: "2", title: "Post 2", body: "This is post 2" },
    { id: "3", title: "Post 3", body: "This is post 3" },
  ];
};

const seed = async () => {
  const dummyUser = await prisma.user.create({
    data: {
      username: "john",
      // Hash for password - twixrox
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getPosts().map((post) => {
      const data = { userId: dummyUser.id, ...post };
      return prisma.post.create({ data });
    })
  );
};

seed();
