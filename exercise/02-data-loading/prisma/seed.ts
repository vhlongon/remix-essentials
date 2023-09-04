import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "kody@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("kodylovesyou", 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      body: "This is my first post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      body: "This is a mixtape I made just for you",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
