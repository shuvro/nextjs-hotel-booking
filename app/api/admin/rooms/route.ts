import dbConnect from "@/backend/config/dbConnect";
import {
  allAdminRooms,
  createARoom,
} from "@/backend/controllers/roomControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminRooms);
router.use(isAuthenticatedUser, authorizeRoles("admin")).post(createARoom);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return await router.run(request, ctx) as Promise<Response>;
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  return await router.run(request, ctx) as Promise<Response>;
}
