import { NextResponse } from "next/server";

export function middleware(req) {
    if (req.nextUrl.pathname === "/menu/manifest.json") {
        return NextResponse.rewrite("/api/manifest.json");
    }
}
