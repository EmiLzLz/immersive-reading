import UploadController from "./_components/UploadController";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen bg-surface-base">
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            <h1 className="mb-4 text-xl md:text-5xl font-bold tracking-tight">
              FOLIO
            </h1>

            <p className="mb-8 text-2xl text-text-secondary">
              Read any PDF your way.
            </p>

            <ol className="mb-10 space-y-12 text-left text-text-secondary">
              <li className="text-xl">
                <span className="font-semibold text-text-primary">1.</span>{" "}
                Upload your PDF using the button in the bottom-right corner.
              </li>
              <li className="text-xl">
                <span className="font-semibold text-text-primary">2.</span>{" "}
                Choose how you want to read: font, size, and width.
              </li>
              <li className="text-xl">
                <span className="font-semibold text-text-primary">3.</span> Read
                without interruptions.
              </li>
            </ol>

            <p className="text-sm text-text-secondary">
              <span className="font-semibold">Coming soon:</span> sign in to
              save documents and access your personal library.
            </p>
          </div>
        </div>
      </main>
      <UploadController />
    </>
  );
}
