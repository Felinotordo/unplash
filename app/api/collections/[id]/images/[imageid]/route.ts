import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

type Params = Promise<{
  id: string;
  imageid: string;
}>;

export async function DELETE(
  request: Request,
  segmentData: { params: Params }
) {
  const { id: collectionId, imageid } = await segmentData.params;

  const { error } = await supabase
    .from("images")
    .delete()
    .eq("id", imageid)
    .eq("collectionid", collectionId)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
