import { home } from "@/app/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Instagram, ShoppingBasket, MapPin, Mail } from "lucide-react";


export default async function Footer() {
  const res = await home();
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-black text-white italic">{res.Titulo}</span>
            <div className="mt-6 max-w-sm text-slate-400">
              <BlocksRenderer content={res.Footer} />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><MapPin size={18} className="text-amber-500" /> Campo, Huesca</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-amber-500" /> contacto@malfarchaus.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Siguenos</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/malfarchaus" className="bg-slate-800 p-3 rounded-full hover:bg-emerald-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-emerald-600 transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
          <div>&copy; 2025 Malfarchaus.</div>
          <div className="flex gap-1">
            <div className="w-5 h-3 bg-amber-500"></div>
            <div className="w-5 h-3 bg-red-600"></div>
            <div className="w-5 h-3 bg-amber-500"></div>
            <div className="w-5 h-3 bg-red-600"></div>
            <div className="w-5 h-3 bg-amber-500"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}