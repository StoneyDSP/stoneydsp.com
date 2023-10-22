import Messages from "./messages"

export default async function NextAuthForm() {
  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action="/auth/sign-in"
      method="post"
    >
      <label className="text-md" htmlFor="email-form">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        autoComplete="email"
        id="email-form"
        required
      />
      <label className="text-md" htmlFor="password-form">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        autoComplete="current-password"
        id="password-form"
        required
      />
      <button className="bg-purple-700 rounded px-4 py-2 text-white mb-2">
        Sign In
      </button>
      <button
        formAction="/auth/sign-up"
        className="border border-gray-700 rounded px-4 py-2 text-white mb-2"
      >
        Sign Up
      </button>
      <Messages />
    </form>
  )
}
