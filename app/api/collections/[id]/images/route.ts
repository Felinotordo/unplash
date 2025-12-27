import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";


type Params = Promise<{
  id: string;
}>;

export async function GET(request: Request,segmentData: { params: Params }) {

  const { id } = await segmentData.params;

  const { data: collections, error } = await supabase
    .from("images")
    .select("*")
    .eq("collectionid", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(collections);
}


export async function POST(
  request: Request,
  segmentData: { params: Params }
) {
  const { id: collectionId } = await segmentData.params;

  const body = await request.json();
  const { url, autor } = body;

  if (!url || !autor) {
    return NextResponse.json(
      { error: "url y autor son obligatorios" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("images")
    .insert([
      {
        url,
        autor,
        collectionid: collectionId,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}