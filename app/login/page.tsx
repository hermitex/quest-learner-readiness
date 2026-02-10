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
      <Card className="w-full max-w-md p-7 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 ring-1 ring-primary/10 flex items-center justify-center">
            <img
              src="/icon.svg"
              alt="Quest logo"
              className="h-7 w-7"
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
              Sign in to Quest
            </h1>
            <p className="text-sm text-text-secondary max-w-xs mx-auto">
              Use the demo account to explore.
            </p>
          </div>
          <div className="h-1 w-10 rounded-full bg-accent/80" />
          <Button
            type="button"
            variant="tertiary"
            className="h-8 px-3 text-xs"
            onClick={() => {
              setEmail("demo@quest.app");
              setPassword("Quest123!");
              setDemoLoaded(true);
            }}
          >
            Use demo account
          </Button>
        </div>

        <div className="min-h-[44px]">
          {error && (
            <div className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
              Invalid credentials. Use the demo account.
            </div>
          )}
        </div>
        <div className="min-h-[20px] text-center text-xs text-text-secondary">
          {demoLoaded && "Demo credentials loaded."}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
