import { NextRequest, NextResponse } from "next/server";

import GameModel from "@/app/_model/game.model";
import { GameStatus, StatusCode } from "@/app/_utils/types";
import TeamModel from "../../../../_model/team.model";

export async function GET(req: NextRequest) {
  try {
    const games = await GameModel.find({});
    const game = games[0];
    if (!game) {
      return NextResponse.json(
        {
          message: "game not found",
        },
        {
          status: StatusCode.NOT_FOUND,
          statusText: "not found",
        }
      );
    }

    const payload = req.headers.get("Set-user");
    if (!payload) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: StatusCode.UNAUTHORIZED,
          statusText: "unauthorized",
        }
      );
    }
    const parsedPayload = JSON.parse(payload);
    const teamId = parsedPayload.payload.teamId;
    const team = await TeamModel.findOne({ teamId });

    if (!team) {
      return NextResponse.json(
        {
          message: "no team found",
          GameStatus: GameStatus.ENDED,
        },
        {
          status: StatusCode.UNAUTHORIZED,
          statusText: "unauthorized",
        }
      );
    }

    if (team.totalTokens <= 0) {
      return NextResponse.json(
        {
          message: "game ended",
          gameStatus: GameStatus.ENDED,
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: "bad request",
        }
      );
    }

    if (game.gameStartTime > new Date()) {
      return NextResponse.json(
        {
          message: "game not started yet",
          gameStatus: GameStatus.NOT_STARTED,
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: "bad request",
        }
      );
    } else if (game.gameEndTime < new Date()) {
      return NextResponse.json(
        {
          message: "game ended",
          gameStatus: GameStatus.ENDED,
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: "bad request",
        }
      );
    } else {
      return NextResponse.json({
        message: "Game Started",
        gameStatus: GameStatus.STARTED,
        stage: game.stages[0],
      });
    }
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
