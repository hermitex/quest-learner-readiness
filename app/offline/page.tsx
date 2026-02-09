export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-semibold">You are offline</h1>
        <p className="text-sm text-text-secondary">
          Your readiness dashboard is still here. Reconnect to sync updates and
          continue where you left off.
        </p>
      </div>
    </main>
  );
}
