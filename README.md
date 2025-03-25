# ☁️ Weather Backend API

NestJS 기반의 백엔드 API로, 위도(latitude)와 경도(longitude)를 기반으로 날씨 데이터를 OpenWeatherMap API에서 가져와 MySQL에 저장하고 제공합니다.

---

## 📌 개요

- 사용자가 좌표를 찍거나 지역명을 검색하면, 해당 위치의 날씨를 제공하는 서비스입니다.
- OpenWeatherMap API를 활용해 실시간 날씨를 가져오고, MySQL에 저장하여 관리합니다.

---

## 🧱 ERD (Entity Relationship Diagram)

> 아래는 `Location`과 `Weather` 테이블 간의 관계를 나타낸 ERD입니다.

![ERD](./docs/er-diagram.png)

---

## 📡 API 엔드포인트

| Method | URL        | 설명                | 파라미터                     |
|--------|------------|---------------------|-------------------------------|
| GET    | `/weather` | 위/경도 기반 날씨 조회 | `lat` (위도), `lon` (경도)   |


### 📤 Response 예시

```json
{
  "id": 25,
  "temperature": 16.5,
  "humidity": 50,
  "wind_speed": 2.4,
  "weather_main": "Clouds",
  "weather_desc": "scattered clouds",
  "location": {
    "id": 4,
    "latitude": 37.5665,
    "longitude": 126.978
  },
  "recorded_at": "2025-03-25T09:12:00.123Z"
}


