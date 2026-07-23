// ============================================================
// SOBRE NOSOTROS — DATA EDITABLE
//
// Fotos: colocar en /public/images/equipo/ y poner la ruta en `photo`
// (hoy en null → se muestra el placeholder con iniciales).
// ============================================================

export type Socio = {
  n: string;
  id: string;
  nombre: string;
  iniciales: string;
  roles: string[];
  accentRgb: string;
  photo: string | null;
  bio: string;
  marcas: string;
};

export const SOCIOS: Socio[] = [
  {
    n: "01",
    id: "manuel-severo",
    nombre: "Manuel Severo",
    iniciales: "MS",
    roles: ["Dirección Creativa", "Dirección de Contenidos Digitales", "Producción IA"],
    accentRgb: "26,128,255",
    photo: "/images/equipo/manuel.jpg",
    bio: "Formado en agencias donde el error no tiene margen — Fahrenheit DDB, Quanticofilms y TBWA Perú. Hoy dirige la creatividad y la producción con IA de Resuelto: el criterio publicitario de siempre, ejecutado con los motores de generación más avanzados del mercado.",
    marcas: "Wong · BCP · Cencosud · Metro · Redondos · San Fernando · WIN Internet · Livoltek",
  },
  {
    n: "02",
    id: "julio-pena",
    nombre: "Julio Peña",
    iniciales: "JP",
    roles: ["Dirección de Arte IA", "Dirección Creativa", "Automatizaciones"],
    accentRgb: "219,92,140",
    photo: "/images/equipo/julio.jpg",
    bio: "Dirige el arte y la identidad visual de cada proyecto — de la exploración con IA al acabado final — y construye las automatizaciones que hacen que los sistemas de la agencia trabajen solos.",
    marcas: "Grimm Store — la tienda digital de videojuegos MOBA y ARTS más grande del mercado peruano · Kalimbo · hoteles, restaurantes y marcas de todo rubro",
  },
  {
    n: "03",
    id: "roberth-reyes",
    nombre: "Roberth Reyes",
    iniciales: "RR",
    roles: ["Marketing Manager", "Estratega Digital", "Director de Eventos", "Productor Musical"],
    accentRgb: "0,169,196",
    photo: "/images/equipo/roberth.jpg",
    bio: "Lidera la estrategia de marketing y crecimiento de las marcas, dirige eventos corporativos de punta a punta y produce la capa musical de las campañas — el perfil que une negocio, experiencia y sonido.",
    marcas: "Havas · Hexing Group · Tinbet · Novum Solar · Niko International · y muchas más",
  },
];

// Tesis de la agencia.
export const MANIFIESTO = [
  "Resuelto nació de una constatación incómoda: la mayoría de los negocios con ofertas realmente valiosas comunican muy por debajo de lo que valen. No es un problema de esfuerzo — es un problema de criterio.",
  "Ese criterio se forjó adentro: años produciendo para las marcas más exigentes, en agencias y proyectos donde una entrega mal hecha cuesta la cuenta.",
  "Hoy somos tres socios fundadores que cubren el ciclo completo de una marca: la estrategia que define qué decir, la dirección creativa y el arte que lo convierten en piezas de nivel televisión, y la automatización que hace que todo siga funcionando solo. La IA nos da velocidad. El criterio sigue siendo humano.",
];
