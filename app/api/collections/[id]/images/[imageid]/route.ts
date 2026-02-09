import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageid: string }> }, // ✅ Promise
) {
  try {
    const { id, imageid } = await params; 
    
    console.log("Attempting to delete image from collection:", {
      id,
      imageid,
    });

    // Eliminar la relación entre la colección y la imagen
    const { error: deleteError, count } = await supabase
      .from("collection_image")
      .delete({ count: "exact" })
      .eq("id_collection", id)
      .eq("id_images", imageid);

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

    // Verificar si la imagen está en otras colecciones
    const { data: otherRelations } = await supabase
      .from("collection_image")
      .select("id_images")
      .eq("id_images", imageid)
      .limit(1);

    // Si no está en ninguna otra colección, eliminarla de la tabla images
    if (!otherRelations || otherRelations.length === 0) {
      await supabase.from("images").delete().eq("id_image", imageid);
    }

    return NextResponse.json({
      message: "Image removed from collection successfully",
      data: {
        collection_id: id,
        image_id: imageid,
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