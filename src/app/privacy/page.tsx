export default function Page() {
  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className="mb-2 text-2xl">Privacy Policy</h2>
      <h3 className="border-b text-xl">Section 1: Information Collection</h3>
      <h4 className="text-lg">1.1. Anonymous Usage Data</h4>
      <p>
        We collect anonymous usage data to improve our services continually.
        This data helps us enhance the user experience and is used solely for
        analytical purposes.
      </p>
      <h4 className="text-lg">1.2. Account Information</h4>
      <p>
        Your account information is limited to what is essential for login
        purposes and is securely shared with OAuth providers, such as Google.
        Future integrations with additional providers will adhere to the same
        stringent security standards.
      </p>
      <h3 className="mt-1 border-b text-xl">
        Section 2: User Responsibilities
      </h3>
      <h4 className="text-lg">2.1. Legal and Appropriate Use</h4>
      <p>
        Users are expected to comply with all local legal and contractual
        requirements regarding use of pyclashbot.app. Any misuse, including
        spamming the API, will be considered a violation of our terms and may
        result in the termination of your account.
      </p>
    </section>
  );
}
