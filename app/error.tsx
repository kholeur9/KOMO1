'use client'

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-white font-600">Error Page</h1>
      <h2 className="text-white">{error.message}</h2>
    </div>
  )
}