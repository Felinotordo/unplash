import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

type Params = Promise<{
  id: string;
}>;

export async function GET(request: Request, segmentData: { params: Params }) {
  try {
    const { id } = await segmentData.params;
    console.log(`Fetching collections for image ID: ${id}`);

    const { data: collections, error } = await supabase
      .from("collection_image")
      .select(
        `
        created_at,
        collections (
          id,
          name,
          created_at
        )
      `,
      )
      .eq("id_images", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching image collections:", error);
      return NextResponse.json(
        { error: "Error fetching collections" },
        { status: 500 },
      );
    }

    // Formatear la respuesta
    const formattedCollections =
      collections?.map((item) => ({
        ...item.collections,
        added_at: item.created_at,
      })) || [];

    return NextResponse.json({
      image_id: id,
      collections: formattedCollections,
    });
  } catch (error) {
    console.error("Error fetching image collections:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
