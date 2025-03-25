# ☁️ Weather Backend API

NestJS 기반의 백엔드 API로, 위도(latitude)와 경도(longitude)를 기반으로 날씨 데이터를 OpenWeatherMap API에서 가져와 MySQL에 저장하고 제공합니다.

---

## 📌 개요

- 사용자가 좌표를 찍거나 지역명을 검색하면, 해당 위치의 날씨를 제공하는 서비스입니다.
- OpenWeatherMap API를 활용해 실시간 날씨를 가져오고, MySQL에 저장하여 관리합니다.

---

## 🧱 ERD (Entity Relationship Diagram)

> 아래는 `Location`과 `Weather` 테이블 간의 관계를 나타낸 ERD입니다.

![ERD](https://github.com/user-attachments/assets/60b8c2c9-644e-43d6-bb4f-6c9669ff9f5c)

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
```

---

### 🔐 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 아래 내용을 추가하세요:

OPEN_WEATHER_KEY=your_openweathermap_api_key

---

### 🧰 기술 스택

<div align="center">

###  백엔드  
<img src="https://img.shields.io/badge/NestJS-E0234E.svg?&style=for-the-badge&logo=nestjs&logoColor=white" />  
<img src="https://img.shields.io/badge/node.js-%234285F4.svg?&style=for-the-badge&logo=node.js&logoColor=white" />  
<img src="https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" />

### 🗄데이터베이스  
<img src="https://img.shields.io/badge/mysql-%234479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white" />

### 라이브러리 및 모듈  
<img src="https://img.shields.io/badge/typeorm-262627.svg?style=for-the-badge&logo=typeorm&logoColor=white" />  
<img src="https://img.shields.io/badge/axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" />  
<img src="https://img.shields.io/badge/nest%2Fconfig-%2320232a.svg?style=for-the-badge&logo=nestjs&logoColor=white" />  
<img src="https://img.shields.io/badge/nest%2Faxios-%23e0234e.svg?style=for-the-badge&logo=nestjs&logoColor=white" />

### 테스트 및 버전관리  
<img src="https://img.shields.io/badge/jest-C21325.svg?style=for-the-badge&logo=jest&logoColor=white" />  
<img src="https://img.shields.io/badge/git-%23F05032.svg?&style=for-the-badge&logo=git&logoColor=white" />  
<img src="https://img.shields.io/badge/github-%23181717.svg?&style=for-the-badge&logo=github&logoColor=white" />

</div>

---

### 🔗 프론트엔드 연동

이 백엔드 프로젝트는 아래 프론트엔드 프로젝트와 연동됩니다:  
👉 **프론트엔드 레포지토리**: [weather-client](https://github.com/yujeen02/weatherAPI_FrontEnd)

사용자는 지도에서 위치를 검색하거나 클릭하여 날씨 정보를 확인할 수 있으며, 백엔드는 해당 위치의 실시간 날씨 정보를 응답합니다.

---
