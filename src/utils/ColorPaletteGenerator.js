// src/utils/ColorPaletteGenerator.js

function hexToHsl(hex) {
  hex = hex.replace(/^\s*#|\s*$/g, '');
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  let r = parseInt(hex.substr(0, 2), 16) / 255,
    g = parseInt(hex.substr(2, 2), 16) / 255,
    b = parseInt(hex.substr(4, 2), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function generarPaletaSaaS(colorHex, esModoOscuro = true) {
  const { h, s, l } = hexToHsl(colorHex);

  if (esModoOscuro) {
    // -------------------------------------------------------------
    // PALETA MODO OSCURO "TONO JOYA" (Inmersivo, rico y elegante)
    // -------------------------------------------------------------
    // Ya no lo matamos a gris. Permitimos hasta un 40% de saturación 
    // para crear colores profundos (azul marino, vino tinto, verde esmeralda).
    const sFondo = Math.min(s, 40);
    const sBorde = Math.min(s, 50);

    const fondoPrincipal = `hsl(${h}, ${sFondo}%, 10%)`;   // El fondo base inmersivo y teñido
    const fondoSecundario = `hsl(${h}, ${sFondo}%, 6%)`;  // La tarjeta del calendario resalta con el mismo tinte
    const fondoTerciario = `hsl(${h}, ${sFondo}%, 22%)`;   // Hover

    const bordeSutil = `hsl(${h}, ${sBorde}%, 24%)`;       // Divisores que combinan con el fondo
    const bordeFuerte = `hsl(${h}, ${sBorde}%, 35%)`;

    const acentoPrincipal = `hsl(${h}, ${s}%, 60%)`;       // Color puro, con más luz para brillar en la oscuridad
    const acentoHover = `hsl(${h}, ${s}%, 70%)`;

    const textoPrincipal = `hsl(${h}, 20%, 95%)`;          // Blanco, pero ligeramente teñido del color base
    const textoSecundario = `hsl(${h}, 30%, 75%)`;         // Textos secundarios armonizados

    // Sensor de contraste para el fondo del acento
    const esAcentoClaro = (h >= 45 && h <= 180) ? true : false; // Amarillo/Lime/Cian es claro
    const textoAcento = esAcentoClaro ? '#171717' : '#ffffff';

    return {
      fondoPrincipal,
      fondoSecundario,
      fondoTerciario,
      bordeSutil,
      bordeFuerte,
      acentoPrincipal,
      acentoHover,
      textoPrincipal,
      textoSecundario,
      textoAcento
    };
  } else {
    // -------------------------------------------------------------
    // PALETA MODO CLARO "TINTED UI" (Colorido, vivo, cero clínica)
    // -------------------------------------------------------------
    // Dejamos que la saturación llegue hasta un 65%. Esto crea tonos
    // pasteles hermosos y vivos, perfectos para bodas o quinceaños.
    const sFondo = Math.min(s, 65);
    const sBorde = Math.min(s, 75);

    const fondoPrincipal = `hsl(${h}, ${sFondo}%, 91%)`;   // Lienzo pastel colorido (Ej: un rosado suave o celeste vivo)
    const fondoSecundario = `hsl(${h}, ${sFondo}%, 95%)`;  // Tarjeta casi blanca, pero arrastrando color
    const fondoTerciario = `hsl(${h}, ${sFondo}%, 88%)`;   // Hover más pigmentado

    const bordeSutil = `hsl(${h}, ${sBorde}%, 82%)`;       // Separadores
    const bordeFuerte = `hsl(${h}, ${sBorde}%, 70%)`;

    const acentoPrincipal = `hsl(${h}, ${s}%, 45%)`;       // El color original fuerte y vibrante
    const acentoHover = `hsl(${h}, ${s}%, 35%)`;

    // Los textos no son negros. Son versiones ultra-oscuras del color principal (ej. Rojo muy oscuro)
    const textoPrincipal = `hsl(${h}, 60%, 15%)`;
    const textoSecundario = `hsl(${h}, 50%, 40%)`;

    // Sensor de contraste para el fondo del acento en modo claro
    const esAcentoClaro = (h >= 50 && h <= 70) ? true : false; // Solo amarillo puro requiere texto oscuro
    const textoAcento = esAcentoClaro ? '#171717' : '#ffffff';

    return {
      fondoPrincipal,
      fondoSecundario,
      fondoTerciario,
      bordeSutil,
      bordeFuerte,
      acentoPrincipal,
      acentoHover,
      textoPrincipal,
      textoSecundario,
      textoAcento
    };
  }
}