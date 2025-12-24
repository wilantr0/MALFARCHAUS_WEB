"use client"
import { useState } from "react"

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_URL

export default function Filter({
  sections,
  todas,
}: {
  sections: string[]
  todas: any[]
}) {

  console.log(todas)
  console.log(sections)

  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [words, setWords] = useState(todas)

  console.log(words)

  async function applyFilter(nextSections: string[]) {
    setSelectedSections(nextSections)
    const encoded = nextSections
    const salida = todas.filter(word => encoded.includes(word.Seccion))
    setWords(salida)
  }

  function toggleSection(section: string) {
    if (section === "Todas") {
      // Toggle general
      if (selectedSections.length === sections.length) {
        applyFilter([]) // Deselecciona todo
      } else {
        applyFilter([...sections]) // Selecciona todo
      }
    } else {
      // Toggle individual
      if (selectedSections.includes(section)) {
        applyFilter(selectedSections.filter(s => s !== section))
      } else {
        applyFilter([...selectedSections, section])
      }
    }
  }

  const allSelected = selectedSections.length === sections.length

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">

      {/* CHIPS */}
      <div className="flex flex-wrap gap-2">
        {/* CHIP GENERAL */}
        <button
          onClick={() => toggleSection("Todas")}
          className={`
            px-4 py-1 rounded-full text-sm transition
            ${allSelected ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
        >
          Todas
        </button>

        {/* CHIPS INDIVIDUALES */}
        {sections.map(section => {
          const active = selectedSections.includes(section)
          return (
            <button
              key={section}
              onClick={() => toggleSection(section)}
              className={`
                px-4 py-1 rounded-full text-sm transition
                ${active ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              `}
            >
              {section}
            </button>
          )
        })}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-5 gap-2">
        {words.map((word, index) => {
          console.log(`${STRAPI_HOST}${word.Palabra.url}`)
          return (
            <img
              key={index}
              src={`${STRAPI_HOST}${word.Palabra.url}`}
              alt=""
            />
          )
        })}
      </div>
    </div>
  )
}