import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { postCreateSchema, postUpdateSchema } from "@/lib/schema";
import { toBackObject } from "@/lib/videoLinkUtil";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "2", 10);
  const offset = (page - 1) * limit;

  try {
    const data = await prisma.post.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
      },
      where: {
        status: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const totalItems = await prisma.post.count({ where: { status: true } });
    const totalPages = Math.ceil(totalItems / limit);
    logger.debug(data, totalItems, totalPages);

    return NextResponse.json(
      {
        posts: data,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error fetching data: ", error);
    return NextResponse.json({ error: "Failed to get post" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  logger.debug(body);
  try {
    const validatedData = postCreateSchema.parse(body);
    const musics = toBackObject(validatedData.musics);
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        description: validatedData.desc,
        status: validatedData.status,
        authorId: validatedData.userId,
        musics: {
          create: musics,
        },
      },
      include: { musics: true },
    });
    return NextResponse.json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  logger.debug(body);
  try {
    const validatedData = postUpdateSchema.parse(body);
    const musics = toBackObject(validatedData.musics);
    const post = await prisma.$transaction(async (tx) => {
      await tx.music.deleteMany({ where: { postId: validatedData.postId } });

      return tx.post.update({
        where: {
          id: validatedData.postId,
        },
        data: {
          title: validatedData.title,
          description: validatedData.desc,
          status: validatedData.status,
          authorId: validatedData.userId,
          musics: {
            create: musics,
          },
        },
        include: { musics: true },
      });
    });
    return NextResponse.json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
