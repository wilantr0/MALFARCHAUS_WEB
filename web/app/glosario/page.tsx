import Filter from "@/components/Filter";
import { getWords } from "../strapi";

type Item = {
  id: number
  documentId: string
  Seccion: string
  Palabra: {
    id: number
    documentId: string
    url: string
  }
}

export default async function Diccionario() {
  const response = await getWords();
  const palabras: Item[] = response.data; // Accedemos al array de data

  // Extraer secciones únicas
  const seccionesUnicas: string[] = Array.from(new Set(palabras.map((p: Item) => p.Seccion))).sort();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cabecera con identidad Malfarchaus */}
      <div className="bg-emerald-900 pt-24 pb-16 px-4 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
          Glosario
        </h1>
        <p className="text-emerald-100/60 italic font-medium max-w-xl mx-auto">
          As palabras que forman o nuestro ADN, ilustradas pa que no se borren d'a memoria.
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <Filter sections={seccionesUnicas} todas={palabras} />
      </div>
    </div>
  );
}