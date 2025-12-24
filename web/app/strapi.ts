const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const qs = require('qs');

console.log(STRAPI_URL)

async function query( endpoint:string ){
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
  });
  return await res.json();
}

export async function home(){
  const queryString = qs.stringify(
    {
      fields: ['Titulo', 'Tagline', 'Footer'],
      populate: {
        Hero :{
          fields: ['url', 'alternativeText']
        }
      }
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data } = await query(`home?${queryString}`);

  console.log(queryString)

  return data
}

export async function diario(){

  const queryString = qs.stringify(
    {
      fields: ['Imagen', 'ContentText'],
      populate: {
        ContentMedia :{
          fields: ['url']
        }
      }
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, meta } = await query(`paginas?${queryString}`)
  console.log({data, meta})
  return { data, meta }
}

export async function getWords() {
  const queryString = qs.stringify(
    {
      fields: ['Seccion'],
      populate: {
        Palabra :{
          fields: ['url']
        }
      }
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, meta } = await query(`palabras?${queryString}`)
  console.log({data, meta})
  return { data, meta }
}

export async function getItems() {
  const queryString = qs.stringify(
    {
      fields: ['Nombre', 'Descripcion'],
      populate: {
        objetos :{
          fields: ['Nombre', 'Descripcion', 'ConTalla', 'Stock', 'Precio'],
          populate:{
            Fotos:{
              fields: ['url']
            },
            Tallas:{
              fields: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
            },
            GuiaTallas:{
              fields: ['url']
            }
          }
        }
      }
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, meta } = await query(`colecciones?${queryString}`)
  console.log(queryString)
  console.log({data, meta})
  return { data, meta }
}
