import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/client";


export async function GET(
  request: NextRequest,
  { params }: { params: { collectionId: string } },
) {
  try {
    const { collectionId } = params;

    // Obtener todas las imágenes de una colección con JOIN
    const { data: images, error } = await supabase
      .from("collection_image")
      .select(
        `
        created_at:created_at,
        images (
          id_image,
          url,
          author,
          created_at
        )
      `,
      )
      .eq("id_collection", collectionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching collection images:", error);
      return NextResponse.json(
        { error: "Error fetching images" },
        { status: 500 },
      );
    }

    // Formatear la respuesta
    const formattedImages =
      images?.map((item) => ({
        ...item.images,
        added_at: item.created_at,
      })) || [];

    return NextResponse.json({
      collection_id: collectionId,
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
  { params }: { params: { collectionId: string } },
) {
  try {
    const { collectionId } = params;
    const body = await request.json();
    const { id_image, url, author } = body;

    if (!id_image || !url) {
      return NextResponse.json(
        { error: "id_image and url are required" },
        { status: 400 },
      );
    }

    //ESTO ES PARA VER SI LA COLECCION EXISTE
    const { data: collection, error: collectionError } = await supabase
      .from("collections")
      .select("id")
      .eq("id", collectionId)
      .single();

    if (collectionError || !collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }

    //sobreescribo si ya hay una fila con ese id_image
    const { error: imageError } = await supabase.from("images").upsert(
      {
        id_image: id_image,
        url: url,
        author: author || null,
      },
      {
        onConflict: "id_image", // Columna única
        ignoreDuplicates: false, // Actualizar si existe
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
        id_collection: collectionId,
        id_images: id_image,
      })
      .select()
      .single();

    if (relationError) {
      // Verificar si es error de duplicado
      if (relationError.code === "23505") {
        // Unique constraint violation
        return NextResponse.json(
          { error: "Image already exists in this collection" },
          { status: 409 },
        );
      }

      console.error("Error creating relation:", relationError);
      return NextResponse.json(
        { error: "Error adding image to collection" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Image added to collection successfully",
        data: {
          collection_id: collectionId,
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
