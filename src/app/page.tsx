export default function EmailPreviewPage() {
  const code = "748109";
  const recoveryEmail = "bilyx67@gmail.com";
  const userEmail = "bilyx65@gmail.com";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white rounded-xl shadow-md max-w-xl w-full p-8 border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logored.png"
            
            alt="Google"
            className="h-12"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Verify your recovery email
        </h2>

        <hr className="my-4" />

        {/* Message */}
        <p className="text-sm text-gray-800 mb-4">
          Google received a request to use <strong>{recoveryEmail}</strong> as a recovery email for Google Account{" "}
          <strong>{userEmail}</strong>.
        </p>

        <p className="text-sm text-gray-800 mb-4">
          Use this code to finish setting up this recovery email:
        </p>

        {/* Code */}
        <div className="text-center text-3xl font-bold tracking-widest my-6">
          {code}
        </div>

        {/* Expiry */}
        <p className="text-sm text-gray-700 mb-2">
          This code will expire in <strong>24 hours</strong>.
        </p>

        {/* Ignore Message */}
        <p className="text-sm text-gray-600">
          If you don’t recognize <strong>{userEmail}</strong>, you can safely ignore this email.
        </p>
      </div>
    </div>
  );
}
