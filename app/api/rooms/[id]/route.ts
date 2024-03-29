import dbConnect from "@/backend/config/dbConnect";
import { getARoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getARoom);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return await router.run(request, ctx) as Promise<Response>;
}
