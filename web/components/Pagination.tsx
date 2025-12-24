"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"

const URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface PageContent {
  id: number;
  documentId: string;
  Imagen: boolean;
  ContentText: any[] | null;
  ContentMedia: {
    url: string;
  } | null;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface ReaderProps {
  data: PageContent[];
  meta: Meta;
}

export function Reader({ data, meta }: ReaderProps) {
  const [page, setPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Al no venir un número de página en el JSON, usamos el índice del array
  const sortedData = data;
  const totalPages = meta.pagination.total;
  const lastIndex = totalPages - 1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextPage = () => {
    if (page + 2 <= lastIndex) {
      setPage((prev) => prev + 2)
    } else if (page + 1 === lastIndex && isMobile) {
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (isMobile && page - 1 >= 0) {
      setPage((prev) => prev - 1)
    } else if (page - 2 >= 0) {
      setPage((prev) => prev - 2)
    }
  }

  const currentPage = sortedData[page]
  const next = sortedData[page + 1]

  /* =======================
        PÁGINA RENDER (SUB-COMPONENTE)
  ======================= */
  /* =======================
        PÁGINA RENDER (SUB-COMPONENTE)
  ======================= */
  const RenderPage = ({ content, isRight = false }: { content: PageContent, isRight?: boolean }) => (
    <div className={`h-full bg-white flex flex-col ${isRight ? 'rounded-r-2xl' : 'rounded-l-2xl'} relative overflow-hidden`}>
      {/* Sutil textura de papel para toda la página */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      <div className="flex-1 overflow-hidden relative z-10">
        {content.Imagen && content.ContentMedia ? (
          <div className="h-full flex items-center justify-center">
            <img
              src={`${URL}${content.ContentMedia.url}`}
              alt="Dibujo integrado"
              className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 transition-opacity duration-700"
              style={{
                // Esto asegura que si el PNG tiene un fondo blanco "sucio", se limpie contra el papel
                filter: "contrast(1.1) brightness(1.05)"
              }}
            />
          </div>
        ) : (
          <div className="h-full m-10 md:m-16 overflow-y-auto prose prose-emerald max-w-none 
            prose-headings:text-emerald-900 prose-headings:font-black 
            prose-p:text-slate-800 prose-p:leading-relaxed prose-p:text-lg">
            {content.ContentText && <BlocksRenderer content={content.ContentText} />}
          </div>
        )}
      </div>

      {/* Número de página estilo manuscrito o sutil */}
      <div className="py-6 text-center text-xs font-bold text-slate-400 relative z-10 italic">
        ~ {sortedData.indexOf(content) + 1} ~
      </div>

      {/* Sombra interior en el pliegue del libro */}
      <div className={`absolute top-0 w-12 h-full pointer-events-none opacity-20 ${isRight ? 'left-0 bg-linear-to-r from-black/20 to-transparent' : 'right-0 bg-linear-to-l from-black/20 to-transparent'}`}></div>
    </div>
  )

  /* =======================
        VISTA MOBILE
  ======================= */
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md">
          <div className="mb-4 flex items-center justify-center gap-2 text-emerald-900 font-bold uppercase text-xs tracking-widest">
            <BookOpen size={16} className="text-amber-600" />
            <span>Libro Malfarchaus</span>
          </div>
          <div className="w-full aspect-210/297 shadow-2xl border border-slate-200 rounded-2xl overflow-hidden">
            <RenderPage content={currentPage} />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevPage} disabled={page === 0} className="flex-1 bg-white border-2 border-emerald-900 text-emerald-900 py-3 rounded-xl font-bold disabled:opacity-20 transition-all">Reculá</button>
            <button onClick={nextPage} disabled={page >= lastIndex} className="flex-1 bg-emerald-900 text-white py-3 rounded-xl font-bold disabled:opacity-20 transition-all shadow-lg">Abanzá</button>
          </div>
        </div>
      </div>
    )
  }

  /* =======================
        VISTA DESKTOP
  ======================= */
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-100 p-10">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex flex-row gap-1">
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
        </div>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tighter uppercase italic">DIARIO</h2>
        <div className="flex flex-row gap-1">
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
          <div className="w-1 h-1 bg-red-600"></div>
          <div className="w-1 h-1 bg-amber-500"></div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full max-w-6xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)]" style={{ height: '75vh' }}>

        {/* PÁGINA IZQUIERDA */}
        <div className="h-full flex-1" style={{ aspectRatio: '210/297' }}>
          <RenderPage content={currentPage} />
        </div>

        {/* LOMO */}
        <div className="h-full w-0.5 bg-emerald-950 relative z-30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20" />
        </div>

        {/* PÁGINA DERECHA */}
        <div className="h-full flex-1" style={{ aspectRatio: '210/297' }}>
          {next ? (
            <RenderPage content={next} isRight />
          ) : (
            <div className="h-full bg-emerald-50 flex items-center justify-center rounded-r-2xl border-l border-emerald-100">
              <div className="text-center">
                <div className="text-emerald-900/20 font-black text-6xl">FIN</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-10 mt-12">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="group flex items-center gap-2 text-emerald-900 font-black uppercase tracking-widest disabled:opacity-20"
        >
          <div className="bg-white p-4 rounded-full border-2 border-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all">
            <ChevronLeft size={24} />
          </div>
          Recula
        </button>

        <button
          onClick={nextPage}
          disabled={page + 2 > lastIndex}
          className="group flex items-center gap-2 text-emerald-900 font-black uppercase tracking-widest disabled:opacity-20"
        >
          Abanza
          <div className="bg-amber-600 p-4 rounded-full text-white shadow-lg group-hover:bg-amber-700 transition-all">
            <ChevronRight size={24} />
          </div>
        </button>
      </div>
    </div>
  )
}