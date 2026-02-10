"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@quest.app");
  const [password, setPassword] = useState("Quest123!");
  const [loading, setLoading] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");
  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-md p-7 md:p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 ring-1 ring-primary/10 flex items-center justify-center">
            <img
              src="/icon.svg"
              alt="Quest logo"
              className="h-7 w-7"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
              Sign in to Quest
            </h1>
            <p className="text-sm text-text-secondary max-w-xs mx-auto">
              Access your learner dashboard.
            </p>
          </div>
          <div className="mt-4 h-1 w-10 rounded-full bg-accent/80" />
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.98]"
            onClick={() => {
              setEmail("demo@quest.app");
              setPassword("Quest123!");
              setDemoLoaded(true);
            }}
          >
            Use demo account
          </button>
          <div className="mt-2 min-h-[16px] text-center text-xs text-text-secondary">
            {demoLoaded && "Demo credentials loaded."}
          </div>
        </div>

        <div className="mt-4 min-h-[16px]">
          {error && (
            <div className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
              Invalid credentials. Use the demo account.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-2 space-y-1">
          <div>
            <label className="mt-2 block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-1 mb-1"
            />
          </div>

          <div>
            <label className="mt-2 block text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 mb-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-sm gap-2"
            disabled={!isFormValid || loading}
            aria-busy={loading}
          >
            {loading && (
              <span
                aria-hidden
                className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
              />
            )}
            {!loading && <Lock className="h-4 w-4" aria-hidden />}
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
