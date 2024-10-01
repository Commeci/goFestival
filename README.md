# 축제7ㅏ자

[API : 한국관광공사\_국문 관광정보 서비스\_GW ](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101578#/)

## 프로젝트 소개

```
현재 국내에서 진행하는 축제 정보 제공
지역으로 검색, 날짜로 검색, 키워드로 검색 기능 제공
상세정보보기 및 위시리스트에 저장가능
모바일 기준으로 사이트 제작
```

## 개발 환경

-   vite
-   react
-   javascript
-   tailwind
-   zustand

## 개발 진행 사항

### 컴포넌트

> header
>
> -   로고 ✅
>
> -   다크모드, 라이트모드 ❎
>
> navigation
>
> -   페이지 이동 ✅
>
> -   현재 페이지 아이콘 색깔 변경 ✅
>
> button 컴포넌트 ✅
>
> icon 컴포넌트 ✅
>
> card 컴포넌트
>
> -   img ✅
> -   title, date, location ✅
> -   wish ✅
> -   state ✅
>
> cardList 컴포넌트 ✅
>
> 상단으로 바로 이동 ❎

### 홈 페이지

> swiper
>
> -   regionList로 버튼 생성 ✅
> -   버튼 클릭 시 region code api로 전송 ✅
>
> 축제 정보 api로 받아오기 ✅
>
> scroll ❎

### 검색 페이지

> 달력 라이브러리
>
> -   기간 선택 ✅
> -   기간 전역으로 저장 ❎
> -   날짜 선택하면 자동 다음 스텝 ❎
>
> 지역 선택
>
> -   지역 선택 scoroll ✅
> -   지역 선택 전역 저장 ❎
> -   지역 선택하면 자동 다음 스텝 ❎
>
> 키워드 검색
>
> -   키워드 검색 ui ✅
> -   키워드 검색 기능 ❎

### 찜 페이지 ✅

> 찜 항목 불러오기 ✅

### 상세 페이지 ✅

> DetailCard ✅
>
> Map Api 연결 ✅
>
> 주변 맛집, 음식점 검색 ✅
>
> 길찾기 연결 ✅
>
> wish ✅
>
> 없는 이미지 처리 ✅
>
> 주변 맛집 없는 경우 처리 ✅

### 코드 clone 및 실행 시

-   코드 clone

```
git clone https://github.com/Commeci/goFestival.git
```

-   종속성 설치

```
npm install
```

-   .env 파일 설정 (프로젝트의 root에 생성)

```
VITE_PUBLIC_DATA_API_KEY = [한국관광공사 API키]
VITE_KAKAOMAP_API_KEY = [KAKAOMAP API 키]
```

-   개발 서버 실행

```
npm run dev
```
