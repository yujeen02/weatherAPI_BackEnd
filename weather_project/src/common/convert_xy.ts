// 위경도 -> 격자 변환 공식
export function convertToXY(
  lat: number,
  lon: number,
): { nx: number; ny: number } {
  const RE = 6371.00877;
  // 지구 반경(km)
  const GRID = 5.0;
  // 격자 간격(km)
  const SLAT1 = 30.0;
  // 투영 위도1
  const SLAT2 = 60.0;
  // 투영 위도2
  const OLON = 126.0;
  // 기준점 경도
  const OLAT = 38.0;
  // 기준점 위도
  const XO = 43;
  // 기준점 X좌표
  const YO = 136;
  // 기준점 Y좌표

  const DEGRAD = Math.PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const snLog = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sfPow = (Math.pow(sf, snLog) * Math.cos(slat1)) / snLog;
  const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  const roPow = (re * sfPow) / Math.pow(ro, snLog);

  const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  const raPow = (re * sfPow) / Math.pow(ra, snLog);
  const theta = lon * DEGRAD - olon;

  let thetaMod = theta;
  if (thetaMod > Math.PI) thetaMod -= 2.0 * Math.PI;
  if (thetaMod < -Math.PI) thetaMod += 2.0 * Math.PI;
  thetaMod *= snLog;

  const nx = Math.floor(raPow * Math.sin(thetaMod) + XO + 0.5);
  const ny = Math.floor(roPow - raPow * Math.cos(thetaMod) + YO + 0.5);

  return { nx, ny };
}
