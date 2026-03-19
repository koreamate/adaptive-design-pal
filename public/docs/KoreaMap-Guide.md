# 대한민국 드릴다운 지도 — 적용 가이드

## 1. 필요 파일 (GitHub에서 복사)

| 용도 | 파일 경로 |
|------|----------|
| 🗺️ 지도 컴포넌트 | `src/components/KoreaMap.tsx` |
| 📊 시군구 데이터 | `public/data/korea-municipalities-topo.json` |
| 📊 읍면동 데이터 | `public/data/korea-submunicipalities-topo.json` |

---

## 2. 필요 라이브러리 설치

```bash
npm install topojson-client framer-motion lucide-react
npm install -D @types/topojson-client
```

---

## 3. 페이지에 지도 삽입

```tsx
import KoreaMap from "@/components/KoreaMap";

const MyPage = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <KoreaMap />
    </div>
  );
};

export default MyPage;
```

> ⚠️ **중요**: 부모 컨테이너에 반드시 `height`를 지정해야 지도가 표시됩니다.

---

## 4. 데이터 파일 위치

```
프로젝트 루트/
├── public/
│   └── data/
│       ├── korea-municipalities-topo.json    ← 시군구 경계 데이터
│       └── korea-submunicipalities-topo.json ← 읍면동 경계 데이터
├── src/
│   └── components/
│       └── KoreaMap.tsx                      ← 지도 컴포넌트
```

`public/data/` 폴더가 없으면 새로 만들어주세요.

---

## 5. 지도 동작 방식 (4단계 드릴다운)

```
전국(17개 시도) → 시/군 목록 → 구 목록 → 읍/면/동
     클릭          클릭         클릭        최종 단계

뒤로가기: 좌측 상단 ← 버튼 또는 브레드크럼 클릭
```

### 드릴다운 예시

| 단계 | 설명 |
|------|------|
| 1단계 | 전국 지도에서 **충청북도** 클릭 |
| 2단계 | 충북 시군 중 **청주시** 클릭 |
| 3단계 | 청주시 내 **상당구** 클릭 |
| 4단계 | 상당구의 읍면동 표시 |

> 💡 하위 구가 없는 지역(예: 충주시)은 3단계를 건너뛰고 바로 읍면동으로 진입합니다.

---

## 6. 데이터 파일 설명

### korea-municipalities-topo.json
- **형식**: TopoJSON
- **기준연도**: 2018년
- **내용**: 전국 약 250개 시·군·구의 경계 좌표, 행정구역 코드, 한글/영문 명칭
- **용량**: 약 1.9MB

### korea-submunicipalities-topo.json
- **형식**: TopoJSON
- **기준연도**: 2013년
- **내용**: 전국 읍·면·동 단위의 경계 좌표
- **용량**: 약 5MB

---

## 7. 커스터마이징

### 색상 변경

`KoreaMap.tsx` 내부의 `MAP_COLORS` 객체에서 HSL 값을 수정합니다:

```tsx
const MAP_COLORS = {
  regionFill: "hsl(210, 15%, 90%)",      // 기본 채움색
  regionStroke: "hsl(0, 0%, 100%)",       // 경계선 색
  regionHover: "hsl(178, 55%, 65%)",      // 호버 시 색상
  regionSelected: "hsl(178, 60%, 52%)",   // 선택된 지역 색상
  labelDefault: "hsl(210, 10%, 55%)",     // 라벨 기본색
  labelHover: "hsl(210, 15%, 30%)",       // 라벨 호버색
};
```

### 특정 시도만 표시

`provinces` 배열에서 원하는 시도만 남기면 됩니다.

---

## 8. 기술 스택

| 기술 | 용도 |
|------|------|
| React + TypeScript | UI 컴포넌트 |
| topojson-client | TopoJSON → GeoJSON 변환, 경계 병합 |
| framer-motion | 레벨 전환 애니메이션 |
| lucide-react | UI 아이콘 (뒤로가기, 핀 등) |

---

## 9. 주요 특징

- ✅ 4단계 드릴다운 (시도 → 시군 → 구 → 읍면동)
- ✅ 하위 구가 있는 시는 자동 병합 표시 (예: 수원시, 청주시)
- ✅ 하위 구가 없는 시군은 구 단계 스킵
- ✅ 경상북도의 울릉도/독도 위치 보정
- ✅ 제주도 추자도 등 원격 도서 필터링
- ✅ 반응형 SVG (부모 컨테이너 크기에 자동 맞춤)
- ✅ 호버/클릭 인터랙션 및 툴팁

---

## 10. 자주 묻는 질문

| 질문 | 답변 |
|------|------|
| 지도 크기 조절은? | 부모 컨테이너의 `width`/`height`를 변경하면 자동 조절됩니다 |
| 특정 지역만 표시하려면? | `provinces` 배열에서 원하는 시도만 남기면 됩니다 |
| 클릭 이벤트를 받으려면? | 현재는 내부 상태만 관리합니다. 콜백 props 추가가 필요합니다 |
| React 외 프레임워크에서 사용 가능? | 컴포넌트는 React 전용이나 `.json` 데이터 파일은 프레임워크 무관하게 사용 가능 |
| 2013년과 2018년 데이터 차이는? | 코드 내 폴백 매핑으로 자동 보정됩니다 (예: 청주시 통합) |

---

## 11. 라이선스

데이터 출처: 대한민국 행정구역 경계 (통계청/국토교통부 기반 TopoJSON)
