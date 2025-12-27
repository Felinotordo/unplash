import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

type Params = Promise<{
  id: string;
}>;

export async function GET(request: Request,segmentData: { params: Params }) {
    
  const { id } = await segmentData.params;

  const { data: collection, error } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(collection);
}
