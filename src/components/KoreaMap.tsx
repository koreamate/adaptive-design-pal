import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import * as topojson from "topojson-client";

/* ── Province code → Korean name mapping ── */
const PROVINCE_MAP: Record<string, string> = {
  "11": "서울특별시",
  "26": "부산광역시",
  "27": "대구광역시",
  "28": "인천광역시",
  "29": "광주광역시",
  "30": "대전광역시",
  "31": "울산광역시",
  "36": "세종특별자치시",
  "41": "경기도",
  "42": "강원특별자치도",
  "43": "충청북도",
  "44": "충청남도",
  "45": "전라북도",
  "46": "전라남도",
  "47": "경상북도",
  "48": "경상남도",
  "50": "제주특별자치도",
};

/* ── Short names for breadcrumb ── */
const PROVINCE_SHORT: Record<string, string> = {
  "11": "서울", "26": "부산", "27": "대구", "28": "인천",
  "29": "광주", "30": "대전", "31": "울산", "36": "세종",
  "41": "경기도", "42": "강원도", "43": "충청북도", "44": "충청남도",
  "45": "전라북도", "46": "전라남도", "47": "경상북도", "48": "경상남도",
  "50": "제주도",
};

/* ── UI 시도 코드 → TopoJSON 시도 코드 매핑 ── */
const TOPO_PROVINCE_CODE_MAP: Record<string, string> = {
  "11": "11", "26": "21", "27": "22", "28": "23", "29": "24",
  "30": "25", "31": "26", "36": "29", "41": "31", "42": "32",
  "43": "33", "44": "34", "45": "35", "46": "36", "47": "37",
  "48": "38", "50": "39",
};

/* ── Static 시도 SVG data ── */
interface ProvinceRegion {
  id: string;
  code: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
}

const provinces: ProvinceRegion[] = [
  { id: "gangwon", code: "42", name: "강원도", path: "M119.7,56.3c0,0-2.8,4.9-5.1,4.8c-2.3-0.1-5.2-1.2-5.7-1.2c-0.5,0-1.4,0.3-1.8,1.2c-0.4,0.9-2.3,0.7-3.5,0c-1.5-0.9-1.8,0.2-3.7,0.3c-4.1,0.3-5.6,1.2-5.6,1.2c-0.7-3.7-3.5-3.4-3.5-3.4c-5.8-1.4-4.5-0.6-6.4-3.7c-1.9-3.1-3.7-1.4-3.7-1.4s-3.2,3.9-4,0.8c-0.8-3.1-1.9-0.5-1.9-0.5c-1.5,4.9-7.1,3.2-7.1,3.2l0-0.3c0,0,0.4-5.1,0.8-6.6c0.4-1.5,0.1-3.9-0.3-4.8c-0.3-0.8,0.1-1.5,0.1-1.5c2.8-6.1-1.8-4.4-3.4-4.8c-0.9-0.2-3.4-0.8-3.7-2c-0.3-1.3-1.1-3.8-1.1-5.8s1-2.7,1-3.7c0-1,1.4-4.4-7.1-8.9c-8.5-4.4-6.1-7.4-6.1-7.4c2.4-1.3,3.8-2.8,4.7-1.6c0.8,1.2,2.7,2.4,4.7,0.5c2-1.9,5.1-1.8,5.2-0.8c0.2,1,0.8,2.2,3.5,2c2.7-0.2,11.3,0.4,11.3-2.7c0-3.1,4.7-3.2,5.6-2.4c0.8,0.8,1.3,4.5,2-0.4c0.7-5,2.7-8.2,5.1-2.4c2.4,5.7,1.7,6.2,2.9,7.4c1.2,1.2,1.9,3.2,1.9,5.2c0,2,4.6,6.1,6.2,8.6c1.7,2.5,6.4,7.1,7.8,8.8c1,1.2,2.2,7.4,4.2,10.3c2,2.9,4.3,3.4,5.9,9.1c0.7,2.6,0.8,2.9,0.8,2.9", labelX: 83, labelY: 37 },
  { id: "gyeongbuk", code: "47", name: "경상북도", path: "M95.4,121.7c0.9,1.1,6.4,1.9,9,1.5c2.6-0.3,2.9-1.8,4.7-2.3c1.9-0.5,3.1-3.2,5.1-3.6c1.9-0.4,3.2,0.4,4.6,1.3c1.3,0.8,7.2,0,7.2-1.2c0-0.2-0.2-0.6-0.2-0.6c-1-1.9-0.2-1.3,0.8-3.2c1-1.9,0.7-3,1.9-5.4c1.2-2.4-0.4-3.4,0-5.7c0.3-2.4-2-2.2-2.2-1c-0.2,1.2-2.9,2.7-3.4,1.7c-0.5-1,0-2.4-0.3-3.7c-0.3-1.3-0.8-3-1.2-7.6c-0.3-4.6,1-2.2,2-4c1-1.9-1-5.9-0.7-8.6c0.3-2.7,1.5-7.6,0-8.9c-1.2-1.1-0.4-2.1-0.2-2.7c0.1-0.6,1.2-5.8,0-6.9c-1.3-1.1-2.7-4.2-2.7-4.2s-2.8,4.9-5.1,4.8c-2.3-0.1-5.2-1.2-5.7-1.2c-0.5,0-1.4,0.3-1.8,1.2c-0.4,0.9-2.4,0.8-3.5,0c-1.2-0.8-1.8-0.1-3.5,0.3c-1.7,0.3-6.1,0.3-7.8,3c-1.1,1.8-0.7,4.1-0.7,4.1s1.4,5.6-4.8,3.1c-6.2-2.4-5.2,0-7.1,0.6c-1.9,0.6-3.6,3.5-5.4,5c-1.8,1.5-5.2,2.4-3.8,4.1c1.4,1.8,2.5,3.4,2,5.3c-0.4,1.9-3.1,3.5-2.4,5.1c0.8,1.6,2.8,2,5,2c2.2-0.1,2.6,1.8,0.9,4.4s-1.9,5.7-2.5,6.2c-1,0.9-1.9,1.8-1.9,1.8s0.8,2.8,0.8,4.4c0,0,8.4,3,9.2,3.5c0.8,0.5,2.3,2.4,1.5,4.1c0,0-0.4,2.2,4,1.9c0,0,3.6-4.7,1.1-7.8c0,0-2.3-2.2,1-3.5c3.3-1.4,2-3.4,4.7-3.5c2.7-0.2,4.9-1.5,5.7-0.8c0.8,0.8,4.6,4.2,3.1,5.7c-1.5,1.5-4.7,6.8-5.8,7.4c-1.1,0.6-2.7,0.5-2.6,1.5c0,0.2,0.5,2.1,0.5,2.1L95.4,121.7z", labelX: 100, labelY: 91 },
  { id: "gyeongnam", code: "48", name: "경상남도", path: "M106.3,136.8c-2.1,0.9-1.9,2.7-1.9,2.7c-1.5,4.1-3.7,2.6-4.8,1.8c-1.1-0.8-2.7-1.8-2.9-0.6c-0.2,1.2-3.3,2.7-3.3,2.7c-3.9,1.7-1.1,3.7-1.1,3.7c3.4,3.7,3.6,1.6,6-1.3c2.4-2.8,4.9,1.6,4.9,1.6c-0.6,0.6-0.7,3.5-0.7,3.5c-0.2,5.2-3.4,9.3-5.9,9.2c-2.5-0.1-7.2-0.1-7.8-3.7c-0.7-3.6-2.5-1.9-3.2-1.3c-0.8,0.6-3.9,1.2-4.8,1c-0.9-0.1-1.9,0.6-2.1,2.5c0,0,0.7,1.9-1.7,0.8c-2.4-1.1-4.1-1-5.8-0.6c0,0-0.4-0.8-0.4-4.2l0,0.1c0.4-4.6-0.8-3.3-1.3-4.5c-0.4-1.2-0.5-3.9-0.8-4.4c-0.3-0.5-3.8-2.3-4.5-5.1c-0.5-1.9-1.4-4.3-1.5-6.4l-0.1-0.3l0-0.5c-0.1-0.5,1.5-3.3,1.5-3.3c1-2.3-0.4-2.7-0.8-3.7c-0.4-1-1.1-4.1-0.2-4.8c0.9-0.7,1.3-2.3,1.3-2.3c0.6-7.4,8.4-8.6,8.4-8.6s8.4,3,9.2,3.5c0.8,0.5,2.3,2.4,1.5,4.1c0,0-0.4,2.2,4,1.9l0.3-0.1c0,0,5.3-0.4,7.4,1.2l0.4,0.4c0.9,1.1,6.4,1.9,9,1.5c2.6-0.3,2.9-1.8,4.7-2.3l1-0.5c0,0,0.4,2-0.9,3.2c-1.3,1.3,0.1,2,1.7,2.7c1.6,0.7,5.1,1.3,5.7,2.9C116.7,129.3,113.8,133.4,106.3,136.8z", labelX: 83, labelY: 137 },
  { id: "jeonbuk", code: "45", name: "전라북도", path: "M27,105.6c-3.1,0.3,1.3,4.2,1.3,4.2c3.8,5-1.4,8.7-1.5,8.8c-0.1,0.1-3.2,2-2.8,4.1c0.5,2.3-0.5,2-0.9,2.5c-1.5,2.2-0.3,3.2-0.3,3.2s2.6,3.7,4.1,4.9c0,0,1.4,0.7,2.6,0.7c0,0,4.2-2.6,5.6-5.2c1.4-2.6,6.1,0.7,7.4,1.5c1.3,0.8,3.4,5.1,5.5,4.4c2.1-0.8,3.7-0.8,5.1-0.3c1.4,0.6,4.5-1.2,5.3-1.9c2.2-1.8,4.1,1.5,4,1c-0.1-0.5,1.5-3.3,1.5-3.3c1-2.3-0.4-2.7-0.8-3.7c-0.4-1-1.1-4.1-0.2-4.8c0.9-0.7,1.3-2.3,1.3-2.3c0.6-7.4,8.4-8.6,8.4-8.6c0-0.8-0.5-3.2-0.8-4.4c-0.3-1.2-6.8-1.9-6.8-1.9c0.6,2.5-6.2,2.1-7.9,1.6c-1.7-0.5-1.9-3.1-3.4-4.8c-1.4-1.7-4.1,1-5.5,2.1c-1.3,1.1-4,0.9-4-0.8c0.1-1.7-1.1-4.1-2.6-4.3c-1.5-0.3-2.9,1.7-4.3,5.1c-1.4,3.5-6.8,1.5-6.8,1.5L27,105.6z", labelX: 45, labelY: 118 },
  { id: "jeonnam", code: "46", name: "전라남도", path: "M70.6,154.5c0.4-4.6-0.8-3.3-1.3-4.5c-0.4-1.2-0.5-3.9-0.8-4.4c-0.3-0.5-3.8-2.3-4.5-5.1c-0.5-1.9-1.4-4.3-1.5-6.4l-0.1-0.3c-0.2-1.5-2.8-2.7-3.9-1.5c-0.7,0.7-3.9,2.5-5.3,1.9c-1.4-0.6-3-0.5-5.1,0.3c-2.1,0.8-4.2-3.5-5.5-4.4c-1.3-0.8-6-4.1-7.4-1.5c-1.4,2.6-5.6,5.2-5.6,5.2c-1.1,0-2.6-0.7-2.6-0.7c-1.5-1.2-4.1-4.9-4.1-4.9s-0.5-1.1-1.3,0.2c-1,1.6,0.2,1.5,0,2.5c-0.2,1-3.5,2-2,5.2c1.5,3.2-1,3.7-3,4.2c-2,0.5-3.5-0.3-7.1,0c-3.5,0.3-2,2.9,0.7,4.4c2.7,1.5,2.1,3.5-0.7,4.2c-1.7,0.4-2.4,0.1-2.2,1.5c0.6,4.7-1.5,3.5-2.4,4.4c-0.9,0.8-1.3,1.7-0.7,3.2c0.7,1.5,1.5,1.2,1.5,3c0,1.9-2.5,2.5,1.7,3.9c4.2,1.4,1.3,2.8,0.5,3.2c-2.4,1.2-4.4,5.6-5.7,9.1c-1.3,3.5,1.8,1.7,1.9,2.5c0.4,1.8,1.9,4.6,6.8,0c9.1,0.8,2.5-5.6,3.7-5.6c1.2,0,5.1-1.2,6.1-1.3c1-0.2,4.4,1.5,4.4,1.5l5.4,2c0,0,5.4,0,8.9,0.2c3.5,0.2,4.6,0.3,6.1-0.5c1.5-0.8,0.8-3.4,1.3-4.2c0.5-0.8,3.4-0.5,5.1-0.5c1.7,0,0.2-3.4,3.7-2c3.5,1.3,4.7,0.2,4.9-2.4c0.2-2.5-4.2-6.7,2.7-4.6c6.9,2.2,6.8-1.6,7.6-3l0.2-1C70.9,158.6,70.5,157.7,70.6,154.5", labelX: 30, labelY: 164 },
  { id: "jeju", code: "50", name: "제주도", path: "M21.5,188.9c0,0-2.2,3.3-6.1,3.9c-3.9,0.6-2.5,5.8-0.3,7.2c2.2,1.4,3,3.7,6.1,1.6c1.6-1.1,4.8,0.1,8.8-0.3c1.6-0.1,11.5-4.8,10.8-8.9c-0.8-4.1-2.7-6.6-7-5.3c-4.3,1.3-7.5,1.1-8.7,1.1C23.8,188.4,22.8,188.1,21.5,188.9z", labelX: 24, labelY: 197 },
  { id: "chungnam", code: "44", name: "충청남도", path: "M54,74.8c7.2-2.1,1.1-6.4,1.1-6.4l-0.2-0.1c0,0-0.8,0.1-5-1.4c-4.2-1.5-7,0-7,0c-7.4,2.4-9.1-2.7-9.5-2.5c-0.4,0.2-1.9-0.1-1.9-0.1c-0.3-0.1-1-0.3-4.4-1.7c-3.4-1.3-4.6-0.3-5.2,0c-0.7,0.3-7.2,5.8-7.9,6.4c-1.2,1.2-0.7,3.7-1,6.1c-0.3,2.4-0.3,5.7,2.2,4c2.5-1.7,4.6,1,3.2,4c-1.3,3,0.8,6.9,4.6,7.3c3.7,0.3,3.9,4.9,2.7,5.7c-1.2,0.8-2.7,1.3,1.2,4.9l3.5,3.7c0,0,5.4,2,6.8-1.5c1.4-3.5,2.8-5.4,4.3-5.1s2.7,2.6,2.6,4.3c-0.1,1.7,2.6,1.9,4,0.8c1.4-1.1,4-3.9,5.5-2.1c1.4,1.7,1.7,4.3,3.4,4.8c1.7,0.5,9.1,1.4,7.7-2.5c-1.4-4-1.8-6.4-2.1-7.2c-0.8-1.8-2.4-1.4-3-1.1l-0.3,0.4c-0.9,1.3-0.8,1.1-1.1,1.4s-1.5,1.1-2.7,0.4c-1.3-0.7-3.6-0.1-4.1-5.7c-0.1-1.3,0.4-3.3,0.4-3.3s0-0.1-1.5-0.4c-1.3-0.2-1.6-1.6-2-4.6c-0.4-2.9,0.5-2.8-0.5-2.9c-1-0.1-0.4-1.1-0.1-2.2c0.3-1-0.6-1.9-0.9-3.3c-0.3-1.4,1.6-2.4,2.3-1.1c0.6,1.3,2.2,2,3.2,1.8C52.7,75.5,53.5,74.9,54,74.8z", labelX: 33, labelY: 85 },
  { id: "chungbuk", code: "43", name: "충청북도", path: "M92.3,64.4c-1.1,1.9-0.7,4.1-0.7,4.1s1.4,5.6-4.8,3.1c-6.2-2.4-5.2,0-7.1,0.6c-1.9,0.6-3.6,3.5-5.4,5c-1.8,1.5-5.2,2.4-3.8,4.1c1.4,1.8,2.5,3.4,2,5.3c-0.4,1.9-3.1,3.5-2.4,5.1c0.8,1.6,2.8,2,5,2c2.2-0.1,2.6,1.8,0.9,4.4c-1.7,2.6-1.9,5.7-2.5,6.2l-1.7,1.6c-2.9-1.5-7-1.6-7-1.6l-0.2-1.1c-1.4-4-1.7-6.4-2.1-7.2c-1-2-3-1.2-3-1.2l0.6-1.3c0.1-0.3,0.4-2.5,0.6-3.4c0.2-0.9,0.2-2.7-0.1-3.4c-0.3-0.7-0.8-0.6-1.5-0.8c-0.7-0.2-3.3-2.3-3.3-2.3s-1.6-2.9-2.6-4.2c-3.2-4,0.7-4.9,0.7-4.9s7.2-1.4,1-6.6c0,0,2.2-4.2,3.1-4.7c0.9-0.5,3.3-0.9,4.5-1.6c1.2-0.7,4.2-3.3,4.2-3.3l0.6-0.5l0.3-0.3c0,0,5.6,1.7,7.1-3.2c0,0,1.1-2.6,1.9,0.5c0.8,3.1,4-0.8,4-0.8s1.7-1.7,3.7,1.3c1.9,3.1,0.6,2.3,6.4,3.7c0,0,2.8-0.2,3.5,3.4C94.3,62.7,93,63.3,92.3,64.4z", labelX: 68, labelY: 73 },
  { id: "gyeonggi", code: "41", name: "경기도", path: "M67.7,57.8l0-0.3c0,0,0.4-5.1,0.8-6.6c0.4-1.5,0.1-3.9-0.3-4.8c-0.3-0.8,0.1-1.5,0.1-1.5c2.8-6.1-1.8-4.4-3.4-4.8c-0.9-0.2-3.4-0.8-3.7-2c-0.3-1.3-1.1-3.8-1.1-5.8s1-2.7,1-3.7c0-1,1.4-4.4-7.1-8.9c-8.5-4.4-6.1-7.4-6.1-7.4s-8.6,2.1-9.2,2.5s-3,2-3.9,2.2c-0.7,0.2-2.8,1,0,2.2s5.2,2.1,1.2,4.8c-4,2.7-4.5,0.9-2.9,2.7c1.6,1.8,1.2,3.5-3,5.5c0,0-4.1,3.3-1.9,4.9c0,0,0.8-0.3,0.8,3.1c0,0-0.3,0.8,1.9,0.2c2.3-0.6,4.4-0.6,5.1,0.5c0.7,1.1,2.5,3.9-2.2,7.6l-2.6,2.8c0,0,0.1,2.8-1.3,3.3c-1.5,0.5-2.1,1.9-0.9,3.6c1.2,1.7,4.5,5.4,4.6,5.8c0.1,0.5,2.3,5.4,9.4,3.1c0,0,2.7-1.6,7,0s5.1,1.3,5.1,1.3s2.2-4.2,3.1-4.7c0.9-0.5,3.3-0.9,4.5-1.6c1.2-0.7,4.2-3.3,4.2-3.3l0.6-0.5L67.7,57.8z", labelX: 42, labelY: 55 },
  { id: "seoul", code: "11", name: "서울", path: "M36.5,45.3c0,0,4.6,0.6,5.5,1.3c0.9,0.7,3.3,0.3,3.7-1c0.4-1.3,2-0.5,2.8-1.3s0.8-1.9,0.4-2.9c-0.3-1-0.8-0.7-0.8-2.1c-0.1-1.3-1.3-3.1-2.6-4c-1.3-0.8-3,0-3.5,0.7c-0.6,0.7-5.6,5.2-5.6,5.2S37.3,42.6,36.5,45.3z", labelX: 41, labelY: 42 },
  { id: "daegu", code: "27", name: "대구", path: "M95,121.2c0,0-0.5-1.8-0.5-2.1c-0.1-1,1.5-0.9,2.6-1.5c1.1-0.6,4.3-5.9,5.8-7.4c1.5-1.5-2.4-5-3.1-5.7c-0.8-0.8-3,0.6-5.7,0.8c-2.7,0.2-1.4,2.2-4.7,3.5c-3.3,1.3-1,3.5-1,3.5c2.6,2.7-0.8,7.7-0.8,7.7S92.8,119.6,95,121.2z", labelX: 92, labelY: 113 },
  { id: "sejong", code: "36", name: "세종", path: "M52.4,75.8c-0.5,0.7-0.6,1.8,1,3.8c1,1.3,2.7,4.4,2.7,4.4l0,0c0.2,0.4-0.3,1.3-0.3,1.3C55.3,86.1,53,86,51.9,88l-0.3,0c0,0,0,0-1.3-0.3c-1.3-0.3-1.6-1.6-2-4.6c-0.4-2.9,0.5-2.8-0.5-2.9c-1-0.1-0.4-1.1-0.1-2.2c0.3-1-0.6-1.9-0.9-3.3c-0.3-1.4,1.7-2.4,2.3-1.1c0.8,1.8,3.4,1.9,3.4,1.9S52.5,75.8,52.4,75.8z", labelX: 49, labelY: 82 },
  { id: "daejeon", code: "30", name: "대전", path: "M59.6,95l-0.3,0.4c-0.9,1.3-0.8,1.1-1.1,1.4c-0.3,0.3-1.5,1.1-2.7,0.4c-1.3-0.7-3.7,0-4.1-5.7c-0.4-5.8,3.9-5,4.4-6.2c0,0,0.3-0.9,0.2-1.4s2.6,2.1,3.2,2.3c0.7,0.2,1.1,0.1,1.5,0.8c0.3,0.7,0.3,2.5,0.1,3.4c-0.2,0.9-0.5,3.1-0.6,3.4L59.6,95z", labelX: 52, labelY: 93 },
  { id: "incheon", code: "28", name: "인천", path: "M31.1,51.1c0.3-3.5-1.3-5.5-3.8-5.7c-2.5-0.2-2.2,5.2-6.6,0c-4.4-5.2-0.8-4.9-1.5-6.2c-0.7-1.3-3.7-0.7-4.6-1.3c-0.8-0.7-2-1.5-0.7-3c1.4-1.5,1.7-2.5,3-3.9c1.4-1.3,2.4,0.6,4-0.7c0.6-0.5,1-3,2.7-2.2s2.6,2.4,3.2,3.2c0,0,0.7,1.4,3,0.9l0,0c0,0-4,3.2-1.8,4.8c0,0,0.8-0.3,0.8,3.1c0,0-0.3,0.8,1.9,0.2c2.3-0.6,4.4-0.6,5.1,0.5c0.7,1.1,2.5,3.9-2.2,7.6L31.2,51L31.1,51.1z", labelX: 18, labelY: 43 },
  { id: "gwangju", code: "29", name: "광주", path: "M31.5,136.6c0.2-0.5,0.7,0.2,2-0.1c1.3-0.3,2.9-1.1,4.9-0.7c2,0.4,4.6,2.8,4,6.8c-0.7,4-5.9,3.4-7.3,2.4c-1.1-0.8-0.1-1.3-2.8-2.2c-2.7-0.9-2-2.6-1.1-4C31.2,138.8,31.2,137.4,31.5,136.6z", labelX: 34, labelY: 142 },
  { id: "ulsan", code: "31", name: "울산", path: "M122.2,129c-0.3-0.7-0.1-1.1,2-2.8c2-1.8,1.7-8.8,1.7-8.8c0,1.2-5.7,2-7.1,1.2c-1.5-0.9-2.3-1.7-4.7-1.2c-1,0.2-3.9,3.1-3.9,3.1s0.4,2-0.9,3.2c-1.3,1.3,0.1,2,1.7,2.7c1.6,0.7,5.1,1.3,5.7,2.9c0,0,0.1,4.4,3,4l0.8,0C120.5,133.3,122.8,130.4,122.2,129z", labelX: 114, labelY: 125 },
  { id: "busan", code: "26", name: "부산", path: "M118.5,138.1c-1.6,4.1-3.7,3.6-4,3.1c-0.4-0.5-3-0.7-3,0.6c0,1.3-1.6,2.2-1.6,2.2c-5.4,1.5-6.7,3.3-6.7,3.3s-2.5-4.4-4.9-1.6c-2.4,2.9-2.6,5-6,1.3c0,0-2.8-2,1.1-3.7c0,0,3.1-1.4,3.3-2.7c0.2-1.2,1.8-0.2,2.9,0.6c1.1,0.8,3.4,2.4,4.8-1.8c0,0-0.1-1.8,1.9-2.7c7.5-3.4,10.3-7.7,10.4-7.5c0.2,0.5-0.1,4.8,3.8,4C121.1,133.2,118.5,138.1,118.5,138.1z", labelX: 109, labelY: 140 },
];

/* ── Design tokens (rMate-style) ── */
const MAP_COLORS = {
  regionFill: "hsl(210, 15%, 90%)",
  regionStroke: "hsl(0, 0%, 100%)",
  regionHover: "hsl(178, 55%, 65%)",
  regionSelected: "hsl(178, 60%, 52%)",
  labelDefault: "hsl(210, 10%, 55%)",
  labelHover: "hsl(210, 15%, 30%)",
  tooltipBg: "hsl(0, 0%, 100%)",
  tooltipText: "hsl(210, 15%, 30%)",
  gradientStart: "hsl(230, 60%, 55%)",
  gradientMid: "hsl(195, 55%, 55%)",
  gradientEnd: "hsl(178, 55%, 60%)",
};

/* ── Extract all rings from any geometry ── */
function extractRings(geometry: any): number[][][] {
  if (geometry.type === "MultiPolygon") {
    const rings: number[][][] = [];
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) rings.push(ring);
    }
    return rings;
  }
  if (geometry.type === "Polygon") return geometry.coordinates;
  return [];
}

/* ── GeoJSON → SVG path converter ── */
function geoToSvgPath(
  rings: number[][][],
  project: (coord: number[]) => [number, number]
): string {
  return rings
    .map((ring) =>
      ring
        .map((coord, i) => {
          const [x, y] = project(coord);
          if (isNaN(x) || isNaN(y)) return "";
          return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join("") + "Z"
    )
    .join("");
}

/* ── Shared feature interface ── */
interface MapFeature {
  name: string;
  code: string;
  path: string;
  centroidX: number;
  centroidY: number;
}

/* ── Filter out remote islands like 추자도 ── */
function filterRemoteIslands(rings: number[][][]): number[][][] {
  return rings.filter((ring) => {
    // 추자도: lat > 33.8, lon < 126.4 — skip these rings
    const avgLat = ring.reduce((s, c) => s + (c[1] || 0), 0) / ring.length;
    const avgLon = ring.reduce((s, c) => s + (c[0] || 0), 0) / ring.length;
    if (avgLat > 33.8 && avgLon < 126.4) return false;
    return true;
  });
}

/* ── Process GeoJSON features into MapFeature[] ── */
function processFeatures(filtered: any[], svgW = 400, svgH = 400, padding = 20): MapFeature[] {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const f of filtered) {
    const rings = filterRemoteIslands(extractRings(f.geometry));
    for (const ring of rings) {
      for (const coord of ring) {
        const lon = coord[0], lat = coord[1];
        if (typeof lon !== "number" || typeof lat !== "number" || isNaN(lon) || isNaN(lat)) continue;
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
    }
  }
  if (!isFinite(minLon) || !isFinite(maxLon)) return [];

  const geoW = maxLon - minLon || 0.01;
  const geoH = maxLat - minLat || 0.01;
  const scale = Math.min((svgW - padding * 2) / geoW, (svgH - padding * 2) / geoH);
  const offsetX = padding + ((svgW - padding * 2) - geoW * scale) / 2;
  const offsetY = padding + ((svgH - padding * 2) - geoH * scale) / 2;

  const project = (coord: number[]): [number, number] => [
    offsetX + (coord[0] - minLon) * scale,
    svgH - offsetY - (coord[1] - minLat) * scale,
  ];

  // Proper polygon centroid using signed area weighting
  const polygonCentroid = (ring: number[][], proj: (c: number[]) => [number, number]): { cx: number; cy: number; area: number } => {
    const pts = ring.map(proj);
    let a = 0, cx = 0, cy = 0;
    for (let i = 0, n = pts.length; i < n; i++) {
      const j = (i + 1) % n;
      const cross = pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
      a += cross;
      cx += (pts[i][0] + pts[j][0]) * cross;
      cy += (pts[i][1] + pts[j][1]) * cross;
    }
    a /= 2;
    if (Math.abs(a) < 1e-10) {
      // Fallback: simple average
      const avg = pts.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
      return { cx: avg[0] / pts.length, cy: avg[1] / pts.length, area: 0 };
    }
    cx /= (6 * a);
    cy /= (6 * a);
    return { cx, cy, area: Math.abs(a) };
  };

  const result: MapFeature[] = [];
  for (const f of filtered) {
    try {
      const rings = filterRemoteIslands(extractRings(f.geometry));
      if (rings.length === 0) continue;
      const pathStr = geoToSvgPath(rings, project);
      
      // Find centroid of the largest ring (main polygon)
      let bestCx = 0, bestCy = 0, bestArea = 0;
      for (const ring of rings) {
        const { cx, cy, area } = polygonCentroid(ring, project);
        if (area > bestArea) {
          bestCx = cx; bestCy = cy; bestArea = area;
        }
      }
      // Fallback if no valid area found
      if (bestArea === 0 && rings.length > 0) {
        let sx = 0, sy = 0, sn = 0;
        for (const ring of rings) {
          for (const coord of ring) {
            const [px, py] = project(coord);
            if (!isNaN(px) && !isNaN(py)) { sx += px; sy += py; sn++; }
          }
        }
        if (sn > 0) { bestCx = sx / sn; bestCy = sy / sn; }
      }
      
      result.push({ name: f.properties.name || f.properties.name_eng || "", code: f.properties.code || "", path: pathStr, centroidX: bestCx, centroidY: bestCy });
    } catch (err) {
      console.error("Error processing feature:", f.properties.name, err);
    }
  }
  return result;
}

/* ── Municipality data hook ── */
function useMunicipalityData(provinceCode: string | null) {
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provinceCode) { setFeatures([]); return; }
    const topoProvinceCode = TOPO_PROVINCE_CODE_MAP[provinceCode] ?? provinceCode;
    setLoading(true);
    fetch("/data/korea-municipalities-topo.json")
      .then((r) => r.json())
      .then((topoData) => {
        const objectKey = Object.keys(topoData.objects)[0];
        const geoData = topojson.feature(topoData, topoData.objects[objectKey]) as any;
        const filtered = geoData.features.filter((f: any) => f.properties.code?.substring(0, 2) === topoProvinceCode);
        setFeatures(processFeatures(filtered));
        setLoading(false);
      })
      .catch((err) => { console.error("Failed to load municipality data:", err); setLoading(false); });
  }, [provinceCode]);

  return { features, loading };
}

/* ── Sub-municipality (읍면동) data hook ── */
function useSubMunicipalityData(muniCode: string | null) {
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!muniCode) { setFeatures([]); return; }
    setLoading(true);
    const prefix = muniCode.substring(0, 4);
    fetch("/data/korea-submunicipalities-topo.json")
      .then((r) => r.json())
      .then((topoData) => {
        const objectKey = Object.keys(topoData.objects)[0];
        const geoData = topojson.feature(topoData, topoData.objects[objectKey]) as any;
        const filtered = geoData.features.filter((f: any) => f.properties.code?.substring(0, 4) === prefix);
        setFeatures(processFeatures(filtered));
        setLoading(false);
      })
      .catch((err) => { console.error("Failed to load sub-municipality data:", err); setLoading(false); });
  }, [muniCode]);

  return { features, loading };
}

/* ── Pill Tooltip Label (above label position with offset) ── */
function PillTooltip({ x, y, text, offsetY = 10 }: { x: number; y: number; text: string; offsetY?: number }) {
  const textLen = text.length;
  const w = Math.max(textLen * 7 + 16, 40);
  const h = 20;
  const pillY = y - offsetY - h / 2;
  return (
    <g className="pointer-events-none">
      {/* Shadow */}
      <rect x={x - w / 2} y={pillY + 1} width={w} height={h} rx={h / 2} fill="rgba(0,0,0,0.08)" />
      {/* Border */}
      <rect x={x - w / 2} y={pillY} width={w} height={h} rx={h / 2} fill="none" stroke="hsl(210,15%,85%)" strokeWidth="0.5" />
      {/* Pill bg */}
      <rect x={x - w / 2} y={pillY} width={w} height={h} rx={h / 2} fill={MAP_COLORS.tooltipBg} />
      {/* Arrow pointing down */}
      <polygon points={`${x - 3},${pillY + h} ${x + 3},${pillY + h} ${x},${pillY + h + 4}`} fill={MAP_COLORS.tooltipBg} />
      {/* Text */}
      <text
        x={x}
        y={pillY + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "8px",
          fontWeight: 700,
          fill: MAP_COLORS.tooltipText,
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        {text}
      </text>
    </g>
  );
}

/* ── Shared SVG Map Renderer (rMate-style) ── */
function MapSVG({
  features,
  hoveredName,
  selectedName,
  onHover,
  onLeave,
  onClick,
  fontSize,
  showGradientBg,
}: {
  features: MapFeature[];
  hoveredName: string | null;
  selectedName: string | null;
  onHover: (name: string) => void;
  onLeave: () => void;
  onClick: (feature: MapFeature) => void;
  fontSize?: number;
  showGradientBg?: boolean;
}) {
  const fs = fontSize ?? (features.length > 20 ? 6.5 : 8);
  const activeFeature = features.find((f) => f.name === (hoveredName ?? selectedName));
  const hasValidActiveFeature = !!activeFeature && Number.isFinite(activeFeature.centroidX) && Number.isFinite(activeFeature.centroidY) && activeFeature.centroidX > 0 && activeFeature.centroidY > 0;

  return (
    <div className="relative overflow-hidden">
      <svg viewBox="0 0 400 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Definitions for drop shadow */}
        <defs>
          <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <filter id="hoverGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="hsl(178, 60%, 52%)" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Map regions */}
        {features.map((f, i) => {
          const isHovered = hoveredName === f.name;
          const isSelected = selectedName === f.name;
          const isActive = isHovered || isSelected;
          return (
            <path
              key={f.code + i}
              d={f.path}
              fill={isActive ? MAP_COLORS.regionSelected : MAP_COLORS.regionFill}
              stroke={MAP_COLORS.regionStroke}
              strokeWidth={isActive ? 1.5 : 1}
              filter={isActive ? "url(#hoverGlow)" : undefined}
              className="cursor-pointer transition-all duration-200"
              style={{ opacity: isActive ? 1 : 0.95 }}
              onMouseEnter={() => onHover(f.name)}
              onMouseLeave={onLeave}
              onClick={() => onClick(f)}
            />
          );
        })}

        {/* Region labels – hide for small areas, show only via hover tooltip */}
        {features.map((f, i) => {
          const isHovered = hoveredName === f.name;
          const isSelected = selectedName === f.name;
          if (isHovered || isSelected) return null;

          // Estimate area from path bounding box to decide label visibility
          const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
          pathEl.setAttribute("d", f.path);
          let tooSmall = false;
          try {
            const bbox = pathEl.getBBox();
            const area = bbox.width * bbox.height;
            tooSmall = area < 600; // threshold for 400x400 viewBox
          } catch {
            tooSmall = false;
          }
          if (tooSmall) return null;

          return (
            <text
              key={`label-${f.code}-${i}`}
              x={f.centroidX}
              y={f.centroidY}
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none select-none"
              style={{
                fontSize: `${fs}px`,
                fontWeight: 400,
                fill: MAP_COLORS.labelDefault,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              {f.name}
            </text>
          );
        })}

        {/* Active tooltip pill */}
        {hasValidActiveFeature && (
          <PillTooltip
            x={activeFeature.centroidX}
            y={activeFeature.centroidY}
            text={activeFeature.name}
          />
        )}
      </svg>
    </div>
  );
}

/* ── Province Map (special SVG with gradient bg) ── */
function ProvinceMapSVG({
  hoveredRegion,
  onHover,
  onLeave,
  onClick,
}: {
  hoveredRegion: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (code: string) => void;
}) {
  const activeProvince = provinces.find((p) => p.id === hoveredRegion);

  return (
    <div className="relative overflow-hidden">
      <svg viewBox="-2 -2 140 215" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="provinceGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="hsl(178, 60%, 52%)" floodOpacity="0.5" />
          </filter>
        </defs>

        {provinces.map((region) => {
          const isHovered = hoveredRegion === region.id;
          return (
            <path
              key={region.id}
              d={region.path}
              fill={isHovered ? MAP_COLORS.regionSelected : MAP_COLORS.regionFill}
              stroke={MAP_COLORS.regionStroke}
              strokeWidth={isHovered ? 0.5 : 0.3}
              filter={isHovered ? "url(#provinceGlow)" : undefined}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => onHover(region.id)}
              onMouseLeave={onLeave}
              onClick={() => onClick(region.code)}
            />
          );
        })}

        {/* Non-active labels */}
        {provinces.map((region) => {
          const isHovered = hoveredRegion === region.id;
          if (isHovered) return null;
          const isSmall = ["seoul", "sejong", "daejeon", "gwangju"].includes(region.id);
          return (
            <text
              key={`lbl-${region.id}`}
              x={region.labelX}
              y={region.labelY}
              textAnchor="middle"
              className="pointer-events-none select-none"
              style={{
                fontSize: isSmall ? "3px" : "4px",
                fontWeight: 400,
                fill: MAP_COLORS.labelDefault,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              {region.name}
            </text>
          );
        })}

        {/* Active tooltip pill */}
        {activeProvince && (() => {
          const px = activeProvince.labelX;
          const py = activeProvince.labelY;
          const nameLen = activeProvince.name.length;
          const pillW = Math.max(nameLen * 4 + 8, 20);
          const pillH = 9;
          const offsetY = 3; // ~10px in screen space for this viewBox
          const pillTop = py - offsetY - pillH;
          return (
            <g className="pointer-events-none">
              {/* Shadow */}
              <rect x={px - pillW / 2} y={pillTop + 0.5} width={pillW} height={pillH} rx={pillH / 2} fill="rgba(0,0,0,0.08)" />
              {/* Border */}
              <rect x={px - pillW / 2} y={pillTop} width={pillW} height={pillH} rx={pillH / 2} fill="none" stroke="hsl(210,15%,85%)" strokeWidth="0.2" />
              {/* Pill */}
              <rect x={px - pillW / 2} y={pillTop} width={pillW} height={pillH} rx={pillH / 2} fill={MAP_COLORS.tooltipBg} />
              {/* Arrow */}
              <polygon points={`${px - 1.5},${pillTop + pillH} ${px + 1.5},${pillTop + pillH} ${px},${pillTop + pillH + 2}`} fill={MAP_COLORS.tooltipBg} />
              {/* Text */}
              <text
                x={px}
                y={pillTop + pillH / 2}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: "3.5px",
                  fontWeight: 700,
                  fill: MAP_COLORS.tooltipText,
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              >
                {activeProvince.name}
              </text>
            </g>
          );
        })()}
      </svg>

    </div>
  );
}

/* ── Loading Spinner ── */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">지도 로딩 중...</p>
      </div>
    </div>
  );
}

/* ── Main Component ── */
type DrillLevel = "province" | "municipality" | "submuni";

const KoreaMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredMuni, setHoveredMuni] = useState<string | null>(null);
  const [selectedMuni, setSelectedMuni] = useState<MapFeature | null>(null);
  const [hoveredSubMuni, setHoveredSubMuni] = useState<string | null>(null);
  const [selectedSubMuni, setSelectedSubMuni] = useState<string | null>(null);

  const drillLevel: DrillLevel = selectedMuni ? "submuni" : selectedProvince ? "municipality" : "province";

  const { features: municipalities, loading: muniLoading } = useMunicipalityData(selectedProvince);
  const { features: subMunicipalities, loading: subMuniLoading } = useSubMunicipalityData(selectedMuni?.code ?? null);

  const handleProvinceClick = useCallback((code: string) => {
    setHoveredRegion(null);
    setHoveredMuni(null);
    setHoveredSubMuni(null);
    setSelectedProvince(code);
    setSelectedMuni(null);
    setSelectedSubMuni(null);
  }, []);

  const handleMuniClick = useCallback((feature: MapFeature) => {
    setHoveredRegion(null);
    setHoveredMuni(null);
    setHoveredSubMuni(null);
    setSelectedMuni(feature);
    setSelectedSubMuni(null);
  }, []);

  const handleBackToProvinces = useCallback(() => {
    setHoveredRegion(null);
    setHoveredMuni(null);
    setHoveredSubMuni(null);
    setSelectedProvince(null);
    setSelectedMuni(null);
    setSelectedSubMuni(null);
  }, []);

  const handleBackToMunicipalities = useCallback(() => {
    setHoveredRegion(null);
    setHoveredMuni(null);
    setHoveredSubMuni(null);
    setSelectedMuni(null);
    setSelectedSubMuni(null);
  }, []);

  useLayoutEffect(() => {
    setHoveredRegion(null);
    setHoveredMuni(null);
    setHoveredSubMuni(null);
  }, [drillLevel, selectedProvince, selectedMuni, municipalities.length, subMunicipalities.length]);


  return (
    <section className="py-10 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">

        <div>
          {/* Map area */}
          <div className="relative w-full max-w-[520px] mx-auto">
            {drillLevel !== "province" && (
              <div className="flex items-center gap-1 mb-4 flex-wrap">
                <button
                  onClick={drillLevel === "submuni" ? handleBackToMunicipalities : handleBackToProvinces}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{ color: MAP_COLORS.regionSelected }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  뒤로
                </button>
              </div>
            )}

            {drillLevel === "province" && (
              <motion.div
                key="provinces"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ProvinceMapSVG
                  hoveredRegion={hoveredRegion}
                  onHover={setHoveredRegion}
                  onLeave={() => setHoveredRegion(null)}
                  onClick={handleProvinceClick}
                />
              </motion.div>
            )}

            {drillLevel === "municipality" && (
              <motion.div
                key={`muni-${selectedProvince}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {muniLoading ? (
                  <LoadingSpinner />
                  ) : (
                    <div>
                      <MapSVG
                      features={municipalities}
                      hoveredName={hoveredMuni}
                      selectedName={null}
                      onHover={setHoveredMuni}
                      onLeave={() => setHoveredMuni(null)}
                      onClick={handleMuniClick}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {drillLevel === "submuni" && (
              <motion.div
                key={`submuni-${selectedMuni?.code}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {subMuniLoading ? (
                  <LoadingSpinner />
                ) : subMunicipalities.length === 0 ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-sm text-muted-foreground">읍면동 데이터가 없습니다</p>
                  </div>
                  ) : (
                    <div>
                      <MapSVG
                      features={subMunicipalities}
                      hoveredName={hoveredSubMuni}
                      selectedName={selectedSubMuni}
                      onHover={setHoveredSubMuni}
                      onLeave={() => setHoveredSubMuni(null)}
                      onClick={(f) => setSelectedSubMuni(selectedSubMuni === f.name ? null : f.name)}
                      fontSize={subMunicipalities.length > 30 ? 5.5 : subMunicipalities.length > 15 ? 6.5 : 8}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default KoreaMap;
