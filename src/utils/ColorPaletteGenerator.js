// src/utils/colors.js

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

export function generarPaletaSaaS(colorHex) {
  const { h, s, l } = hexToHsl(colorHex);

  // LA LÓGICA QUE TÚ DEDUJISTE:
  // Evaluamos la luminosidad original del color que nos pasan
  const esColorClaro = l > 55;
  
  // Si es claro, el texto del acento será oscuro. Si es oscuro, será blanco.
  const textoAcento = esColorClaro ? '#171717' : '#ffffff'; 

  // Como el fondo general SaaS siempre lo hacemos oscuro (l: 8%), 
  // su texto por defecto siempre será blanco o un gris muy claro.
  const textoFondo = '#f5f5f5';

  return {
    fondo: `hsl(${h}, ${s}%, 8%)`,
    borde: `hsl(${h}, ${s}%, 18%)`,
    acento: `hsl(${h}, ${s}%, 50%)`,
    textoAcento: textoAcento, // Exportamos tu nuevo sensor
    textoFondo: textoFondo
  };
}