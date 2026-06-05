import sharp from 'sharp';

const W = 1200;
const H = 630;
const textBand = 185;

const svg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="55%" stop-color="#041a0a"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="600" y="72" text-anchor="middle" fill="#22c55e" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3">FLUXA METHOD</text>
  <text x="600" y="132" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="52" font-weight="900">Sistema para traders</text>
  <text x="600" y="178" text-anchor="middle" fill="#8f7ac8" font-family="Arial,sans-serif" font-size="28" font-weight="600">Atraer, convertir y automatizar clientes</text>
</svg>`);

const heroMaxHeight = H - textBand;
const hero = await sharp('public/trading/imagen1trading.png')
  .resize(980, heroMaxHeight, { fit: 'inside' })
  .toBuffer();

const { width: hw, height: hh } = await sharp(hero).metadata();
const left = Math.round((W - hw) / 2);
const top = H - hh;

await sharp(svg)
  .composite([{ input: hero, top, left }])
  .png()
  .toFile('app/trading/opengraph-image.png');

await sharp('app/trading/opengraph-image.png').toFile('app/trading/twitter-image.png');

console.log('Generated app/trading/opengraph-image.png');
