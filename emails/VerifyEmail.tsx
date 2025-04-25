import {
    Html,
    Head,
    Preview,
    Tailwind,
    Body,
    Container,
    Text,
    Img,
    Hr,
  } from "@react-email/components";
  
  interface VerifyEmailProps {
    email: string
    otp: string
  }
  
  export default function verifyEmail({
     otp, email
  }: VerifyEmailProps) {
    return (
      <Html>
        <Head />
        <Preview>Verify your email</Preview>
        <Tailwind>
          <Body className="bg-gray-100 text-gray-800 font-sans">
            <Container className="bg-white max-w-xl mx-auto my-10 p-8 rounded-xl border shadow">
              {/* Logo */}
              <div className="text-center mb-6 flex justify-center items-center">
                <Img
                  src="https://i.postimg.cc/wMW38WW3/Screenshot-2025-04-25-180050.png"
                  alt="GhostNote"
                  className=" h-12 "
                />
              </div>
  
              {/* Title */}
              <Text className="text-xl font-semibold text-center mb-4">
                Verify your email
              </Text>
  
              <Hr className="my-4" />
  
              {/* Message */}
              <Text className="text-sm mb-4">
                GhostNote received a request to use <strong>{email}</strong>{" "}
                as a sign up email for GostNote Account.
              </Text>
  
              <Text className="text-sm mb-4">
                Use this code to finish setting up this email:
              </Text>
  
              {/* Code */}
              <Text className="text-3xl font-bold tracking-widest text-center my-6">
                {otp}
              </Text>
  
              <Text className="text-sm mb-2">
                This code will expire in <strong>1 hours</strong>.
              </Text>
  
              <Text className="text-sm text-gray-600">
                If you don’t recognize <strong>{email}</strong>, you can safely ignore this email.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }
  