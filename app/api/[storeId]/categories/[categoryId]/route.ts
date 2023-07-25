import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string; } }
  ) {
    // DON'T DELETE REQ CAUSE PARAMS ARE AVELABLE ONLY IN THE SECOND ARGUMENT OF DELETE FUNCTION
    try {
      
     
      if (!params.categoryId)
        return new NextResponse("Category Id is required", { status: 400 });
  
      
  
      const category = await prismadb.category.findUnique({
        where: {
          id: params.categoryId,
        },
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log("[CATEGORY_GET]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    if (!params.categoryId)
      return new NextResponse("Billboard Id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  // DON'T DELETE REQ CAUSE PARAMS ARE AVELABLE ONLY IN THE SECOND ARGUMENT OF DELETE FUNCTION
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store Id is required", { status: 400 });
    if (!params.categoryId)
      return new NextResponse("CATEGORY Id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


