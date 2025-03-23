export function buildKmaRealtimeWeatherURL(params: {
  serviceKey: string;
  nx: number;
  ny: number;
  base_date: string;
  base_time: string;
}): string {
  const baseUrl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

  const query = new URLSearchParams({
    serviceKey: params.serviceKey,
    numOfRows: '10',
    pageNo: '1',
    dataType: 'JSON',
    base_date: params.base_date,
    base_time: params.base_time,
    nx: params.nx.toString(),
    ny: params.ny.toString(),
  });

  return `${baseUrl}?${query.toString()}`;
}
