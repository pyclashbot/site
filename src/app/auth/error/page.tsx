export default function AuthErrorPage({
  params,
}: Readonly<{ params: { error: string } }>) {
  class AuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "Authentication Error";
    }
  }

  throw new AuthError(params.error);
}
