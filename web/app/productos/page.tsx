import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getItems } from "../strapi";
import { Span } from "next/dist/trace";
const URL = process.env.NEXT_PUBLIC_STRAPI_URL;


type Objeto = {
  id: number
  documentId: string
  Nombre: string
  Descripcion: any[]
  ConTalla: boolean
  Stock: boolean
  Precio: number
  Fotos: {
    id: number
    documentId: string
    url: string
  }[]
  GuiaTallas: {
    id: number
    documentId: string
    url: string
  }
  Tallas: {
    id: number
    XS: number
    S: number
    M: number
    L: number
    XL: number
    XXL: number
  }[]
}


type Coleccion = {
  id: number
  documentId: string
  Nombre: string
  Descripcion: any[]
  objetos: Objeto[]
}

export default async function Diccionario() {
  const response = await getItems();
  const colecciones: Coleccion[] = response.data;

  console.log(colecciones);



  return (
    <div className="h-screen bg-slate-50 text-black">
      {/* Cabecera con identidad Malfarchaus */}
      <div className="bg-emerald-900 pt-24 pb-16 px-4 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
          Colecciones
        </h1>
        <p className="text-emerald-100/60 italic font-medium max-w-xl mx-auto">
          No se lo que poner aqui, pero da igual
        </p>
      </div>

      <div className="max-w-7xl h-fit mx-auto p-6 md:p-12 flex flex-col gap-8">
        {
          colecciones.map(coleccion => (
            <div key={coleccion.id} className="flex flex-col gap-4">
              <section>
                <h2 className=" text-5xl">
                  {coleccion.Nombre}
                </h2>
                <span className="text-sm">
                  <BlocksRenderer content={coleccion.Descripcion} />
                </span>
              </section>

              <hr />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {coleccion.objetos.map((objeto) => (
                  <div
                    key={objeto.id}
                    className="group bg-white flex flex-col rounded-2xl p-3 shadow-sm border relative border-slate-100"
                  >
                    {/* Contenedor de Imagen */}
                    <div className="aspect-square w-full overflow-hidden bg-slate-50 rounded-xl ">
                      <img
                        src={`${URL}${objeto.Fotos[0].url}`}
                        alt={objeto.Nombre}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />

                    </div>

                    {/* Información del Producto */}
                    <div className="flex flex-col flex-1 mt-4">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-tighter line-clamp-1">
                        {objeto.Nombre}
                      </h3>

                      <div className="mt-auto pt-2 flex justify-between items-end">
                        <p className="text-2xl font-black text-emerald-950">
                          {objeto.Precio.toFixed(2)}<span className="text-lg ml-0.5">€</span>
                        </p>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        {objeto.Stock ? (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            En Stock
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Agotau
                          </span>
                        )}
                      </div>
                    </div>


                  </div>
                ))}
              </div>

            </div>
          )
          )
        }
      </div>
    </div>
  );
}