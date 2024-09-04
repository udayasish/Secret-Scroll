import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { verificationCodeSchema } from "@/schemas/verifySchema";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const result = verificationCodeSchema.safeParse({ code });

    if (!result.success) {
      const verifyErrors = result.error.format().code?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            verifyErrors?.length > 0
              ? verifyErrors.join(", ")
              : "Invalid verification code",
        },
        {
          status: 401,
        }
      );
    }
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No user found",
        },
        { status: 400 }
      );
    }

    const isCodeValid = code === user.verifyCode;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect Verification Code",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message:
            "Verification code expired, please signup agin to get a new code",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error verifying code");
    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      {
        status: 501,
      }
    );
  }
}
