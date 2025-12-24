import { home } from "./strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Shirt } from "lucide-react";


const URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default async function Home() {
    const res = await home();

    return (
        <div className="text-black">
            <main>
                {/* --- HERO SECTION --- */}
                <section className="relative bg-emerald-900 py-24 md:py-32 px-4 overflow-hidden">
                    {/* Decoración de fondo */}
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-amber-500 opacity-10 -skew-x-12 translate-x-20"></div>

                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">
                            {res.Titulo}
                        </h1>
                        <div className="text-xl md:text-2xl text-emerald-100 mb-10 leading-relaxed font-light">
                            <BlocksRenderer content={res.Tagline} />
                        </div>
                        <div className="flex justify-center gap-6">
                            <a href="/productos" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2">
                                <Shirt size={20} /> Mirar productos
                            </a>
                        </div>
                    </div>
                </section>

                {/* --- QUI SOMOS (CON IMG ESTÁNDAR) --- */}
                <section id="quienes-somos" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                {/* Borde decorativo detrás de la imagen */}
                                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-amber-500 rounded-3xl z-0"></div>
                                <img
                                    src={`${URL}${res.Hero.url}`}
                                    alt="Malfarchaus Paisaje"
                                    className="relative z-10 w-full h-112.5 rounded-3xl shadow-2xl"
                                />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-emerald-900 mb-8 uppercase tracking-tighter">Qui somos</h2>
                                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                    <p>
                                        Somos una chicota empresa familiar radidaca en o corazón d'o Pirineo. Treballamos man a man con productors locals pa ofreixer-te calidat y autenticidat.
                                    </p>
                                    <div className="bg-emerald-50 p-6 rounded-2xl border-l-8 border-red-700 italic">
                                        "Creyemos en o valor d'as nuestras venas y en a importancia de mantener viva a nuestra luenga y as nuestras costumbres."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- OBJETIVO --- */}
                <section id="objetivo" className="bg-slate-50 py-24">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-black text-emerald-900 mb-16 uppercase tracking-tighter">O nuestro obchectivo</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { t: 'Sostenibilidat', d: "Cudiamos d'u meyo ambient con prozesos respectuosos.", i: '🌱', c: 'border-emerald-600' },
                                { t: 'Proximidat', d: "Apoyamos a os productors y artesanos d'as nuestras comarcas.", i: '🤝', c: 'border-amber-500' },
                                { t: 'Luenga', d: "Promovemos l'uso de l'aragonés como parte d'o nuestro erenzio.", i: '🏺', c: 'border-red-700' }
                            ].map((obj, idx) => (
                                <div key={idx} className={`bg-white p-8 rounded-3xl shadow-sm border-t-8 ${obj.c} hover:shadow-md transition-shadow`}>
                                    <div className="text-4xl mb-6">{obj.i}</div>
                                    <h3 className="text-xl font-bold mb-4">{obj.t}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{obj.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* --- FOOTER --- */}

        </div>
    );
}