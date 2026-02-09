import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/client";

// Tipos para la base de datos
type Image = {
  id_image: string;
  url: string;
  author: string | null;
  created_at: string;
  width: number;
  height: number;
};

type CollectionImage = {
  created_at: string;
  id_images: string;
  id_collection: string;
  images: Image;
  collections: Collection;
};
type FormattedImage = {
  id: string;
  url: string;
  author: string | null;
  created_at: string;
  added_at: string;
  width: number;
  height: number;
};

type PostRequestBody = {
  id_image: string;
  url: string;
  author?: string;
  width: number;
  height: number;
};

type Collection = {
  id: string;
  name: string;
  created_at: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: collectionId } = await params;

    if (!collectionId) {
      return NextResponse.json(
        { error: "Collection ID is required" },
        { status: 400 },
      );
    }

    // ✅ Agregar collections al select
    const { data: collectionImages, error } = await supabase
      .from("collection_image")
      .select(
        `
        created_at,
        id_images,
        id_collection,
        images!inner (
          id_image,
          url,
          author,
          created_at,
          width,
          height
        ),
        collections!inner (
          id,
          name,
          created_at
        )
      `,
      )
      .eq("id_collection", collectionId)
      .order("created_at", { ascending: false })
      .returns<CollectionImage[]>();

    if (error) {
      console.error("Error fetching collection images:", error);
      return NextResponse.json(
        { error: "Error fetching images", details: error },
        { status: 500 },
      );
    }

    const formattedImages: FormattedImage[] =
      collectionImages?.map((item) => ({
        id: item.images.id_image,
        url: item.images.url,
        author: item.images.author,
        created_at: item.images.created_at,
        added_at: item.created_at,
        width: item.images.width,
        height: item.images.height
      })) || [];

    const collectionName = collectionImages?.[0]?.collections?.name || null;

    return NextResponse.json({
      collection_id: collectionId,
      collection_name: collectionName, // ✅ Agregar nombre
      images: formattedImages,
    });
  } catch (error) {
    console.error("Error fetching collection images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: PostRequestBody = await request.json();
    const { id_image, url, author, width, height } = body;

    if (!id_image || !url) {
      return NextResponse.json(
        { error: "id_image and url are required" },
        { status: 400 },
      );
    }

    // Insertar o actualizar la imagen
    const { error: imageError } = await supabase.from("images").upsert(
      {
        id_image: id_image,
        url: url,
        author: author || null,
        width: width,
        height: height,
      },
      {
        onConflict: "id_image",
        ignoreDuplicates: false,
      },
    );

    if (imageError) {
      console.error("Error upserting image:", imageError);
      return NextResponse.json(
        { error: "Error saving image" },
        { status: 500 },
      );
    }

    // Crear la relación en collection_image
    const { error: relationError } = await supabase
      .from("collection_image")
      .insert({
        id_collection: id,
        id_images: id_image,
      })
      .select()
      .single();

    if (relationError) {
      console.error("Error creating relation:", relationError);
      return NextResponse.json(
        { error: "Error adding image to collection" },
        { status: 500 },
      );
    }

    console.log("llego hasta");

    return NextResponse.json(
      {
        message: "Image added to collection successfully",
        data: {
          collection_id: id,
          image_id: id_image,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding image to collection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
