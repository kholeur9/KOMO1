import Link from "next/link";

interface MembrePageProps {
  params: { membreId: string };
}

export default function MembrePage({
  params } : MembrePageProps ) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold text-white">Devenir Membre : Client ID {params.membreId}</h1>
      <p className="text-gray-300">
        Cette page est en cours de développement.
      </p>
      <Link className="flex items-center justify-center px-6 h-8 bg-green-300 text-white mt-4 rounded-md" href="/">Retour</Link>
    </div>
  );
}