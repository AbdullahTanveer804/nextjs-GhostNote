import { resend } from "@/lib/resend";
import { IApiResponse } from "@/types/ApiResponse";
import verifyEmail from "../../emails/VerifyEmail";


export async function sendVerificationEmail(
    email:string,
    verifyCode: string
): Promise<IApiResponse>{
    try {
        
await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'GhostNote | Email Verification Code',
    react: verifyEmail({otp: verifyCode, email}),
  });
        return {success: true, message: 'Verification email send successfully'}
    } catch (emailError) {
        console.log("Error sending verification email", emailError)
        return {success: false, message: 'Failed to send verification email'}
    }
}