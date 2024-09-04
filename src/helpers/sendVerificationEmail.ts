import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../email-templates/verificationEmail";

export async function sendVerificationEmail(
    username: string,
    email: string,
    otp: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Secret-Scroll | Verification Email',
            react: VerificationEmail({username, otp}),
        });
        return {
            success: true,
            message: "Verification email sent successfully."
        }
        
    } catch (emailError) {
        console.error("Error sending verification email")
        return {
            success: false,
            message: "Failed to send verification email."
        }
        
    }
}