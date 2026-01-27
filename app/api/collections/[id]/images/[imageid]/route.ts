import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { collectionId: string; imageId: string } },
) {
  try {
    const { collectionId, imageId } = params;

    // Eliminar la relación entre la colección y la imagen nashe
    const { error: deleteError, count } = await supabase
      .from("collection_image")
      .delete({ count: "exact" })
      .eq("id_collection", collectionId)
      .eq("id_images", imageId);

    if (deleteError) {
      console.error("Error deleting relation:", deleteError);
      return NextResponse.json(
        { error: "Error removing image from collection" },
        { status: 500 },
      );
    }

    // Verificar si se eliminó algún registro
    if (count === 0) {
      return NextResponse.json(
        { error: "Image not found in this collection" },
        { status: 404 },
      );
    }

    const { data: otherRelations } = await supabase
      .from("collection_image")
      .select("id_images")
      .eq("id_images", imageId)
      .limit(1);

    if (!otherRelations || otherRelations.length === 0) {
      await supabase.from("images").delete().eq("id_image", imageId);
    }

    return NextResponse.json({
      message: "Image removed from collection successfully",
      data: {
        collection_id: collectionId,
        image_id: imageId,
      },
    });
  } catch (error) {
    console.error("Error removing image from collection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
