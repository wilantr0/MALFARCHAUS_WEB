import { Reader } from "@/components/Pagination";
import { diario } from "../strapi";

export default async function Diario() {

  const res = await diario()

  console.log(res.data)




  return (
    <div className=" text-black">
      <Reader data={res.data} meta={res.meta} />
    </div>
  )
}