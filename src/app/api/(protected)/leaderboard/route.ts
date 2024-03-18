import { StatusCode } from "@/app/_utils/types";
import { NextRequest, NextResponse } from "next/server";
import databaseConnect from "../../database";
import TeamModel from "@/app/_model/team.model";

export async function GET(req: NextRequest) {
  try {
    await databaseConnect();
    const teams = await TeamModel.find().select([
      "teamId",
      "teamName",
      "totalPointScored",
    ]);
    return NextResponse.json({ teams });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while processing your request.",
        description: JSON.stringify(error),
      },
      {
        status: StatusCode.INTERNAL_SERVER_ERROR,
        statusText: "server error",
      }
    );
  }
}
