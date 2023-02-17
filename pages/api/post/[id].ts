import prisma from "../../../lib/prisma";

// DELETE /api/post/:id
export default async function handle({ query, method }, res) {
  const postId = query.id;
  if (method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${method} method is not supported at this route.`
    );
  }
}
