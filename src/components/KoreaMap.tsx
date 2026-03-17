import { useState } from "react";
import { motion } from "framer-motion";

interface RegionData {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
}

const regions: RegionData[] = [
  {
    id: "gangwon",
    name: "강원도",
    path: "M119.7,56.3c0,0-2.8,4.9-5.1,4.8c-2.3-0.1-5.2-1.2-5.7-1.2c-0.5,0-1.4,0.3-1.8,1.2c-0.4,0.9-2.3,0.7-3.5,0c-1.5-0.9-1.8,0.2-3.7,0.3c-4.1,0.3-5.6,1.2-5.6,1.2c-0.7-3.7-3.5-3.4-3.5-3.4c-5.8-1.4-4.5-0.6-6.4-3.7c-1.9-3.1-3.7-1.4-3.7-1.4s-3.2,3.9-4,0.8c-0.8-3.1-1.9-0.5-1.9-0.5c-1.5,4.9-7.1,3.2-7.1,3.2l0-0.3c0,0,0.4-5.1,0.8-6.6c0.4-1.5,0.1-3.9-0.3-4.8c-0.3-0.8,0.1-1.5,0.1-1.5c2.8-6.1-1.8-4.4-3.4-4.8c-0.9-0.2-3.4-0.8-3.7-2c-0.3-1.3-1.1-3.8-1.1-5.8s1-2.7,1-3.7c0-1,1.4-4.4-7.1-8.9c-8.5-4.4-6.1-7.4-6.1-7.4c2.4-1.3,3.8-2.8,4.7-1.6c0.8,1.2,2.7,2.4,4.7,0.5c2-1.9,5.1-1.8,5.2-0.8c0.2,1,0.8,2.2,3.5,2c2.7-0.2,11.3,0.4,11.3-2.7c0-3.1,4.7-3.2,5.6-2.4c0.8,0.8,1.3,4.5,2-0.4c0.7-5,2.7-8.2,5.1-2.4c2.4,5.7,1.7,6.2,2.9,7.4c1.2,1.2,1.9,3.2,1.9,5.2c0,2,4.6,6.1,6.2,8.6c1.7,2.5,6.4,7.1,7.8,8.8c1,1.2,2.2,7.4,4.2,10.3c2,2.9,4.3,3.4,5.9,9.1c0.7,2.6,0.8,2.9,0.8,2.9",
    labelX: 83, labelY: 37,
  },
  {
    id: "gyeongbuk",
    name: "경북",
    path: "M95.4,121.7c0.9,1.1,6.4,1.9,9,1.5c2.6-0.3,2.9-1.8,4.7-2.3c1.9-0.5,3.1-3.2,5.1-3.6c1.9-0.4,3.2,0.4,4.6,1.3c1.3,0.8,7.2,0,7.2-1.2c0-0.2-0.2-0.6-0.2-0.6c-1-1.9-0.2-1.3,0.8-3.2c1-1.9,0.7-3,1.9-5.4c1.2-2.4-0.4-3.4,0-5.7c0.3-2.4-2-2.2-2.2-1c-0.2,1.2-2.9,2.7-3.4,1.7c-0.5-1,0-2.4-0.3-3.7c-0.3-1.3-0.8-3-1.2-7.6c-0.3-4.6,1-2.2,2-4c1-1.9-1-5.9-0.7-8.6c0.3-2.7,1.5-7.6,0-8.9c-1.2-1.1-0.4-2.1-0.2-2.7c0.1-0.6,1.2-5.8,0-6.9c-1.3-1.1-2.7-4.2-2.7-4.2s-2.8,4.9-5.1,4.8c-2.3-0.1-5.2-1.2-5.7-1.2c-0.5,0-1.4,0.3-1.8,1.2c-0.4,0.9-2.4,0.8-3.5,0c-1.2-0.8-1.8-0.1-3.5,0.3c-1.7,0.3-6.1,0.3-7.8,3c-1.1,1.8-0.7,4.1-0.7,4.1s1.4,5.6-4.8,3.1c-6.2-2.4-5.2,0-7.1,0.6c-1.9,0.6-3.6,3.5-5.4,5c-1.8,1.5-5.2,2.4-3.8,4.1c1.4,1.8,2.5,3.4,2,5.3c-0.4,1.9-3.1,3.5-2.4,5.1c0.8,1.6,2.8,2,5,2c2.2-0.1,2.6,1.8,0.9,4.4s-1.9,5.7-2.5,6.2c-1,0.9-1.9,1.8-1.9,1.8s0.8,2.8,0.8,4.4c0,0,8.4,3,9.2,3.5c0.8,0.5,2.3,2.4,1.5,4.1c0,0-0.4,2.2,4,1.9c0,0,3.6-4.7,1.1-7.8c0,0-2.3-2.2,1-3.5c3.3-1.4,2-3.4,4.7-3.5c2.7-0.2,4.9-1.5,5.7-0.8c0.8,0.8,4.6,4.2,3.1,5.7c-1.5,1.5-4.7,6.8-5.8,7.4c-1.1,0.6-2.7,0.5-2.6,1.5c0,0.2,0.5,2.1,0.5,2.1L95.4,121.7z",
    labelX: 100, labelY: 91,
  },
  {
    id: "gyeongnam",
    name: "경남",
    path: "M106.3,136.8c-2.1,0.9-1.9,2.7-1.9,2.7c-1.5,4.1-3.7,2.6-4.8,1.8c-1.1-0.8-2.7-1.8-2.9-0.6c-0.2,1.2-3.3,2.7-3.3,2.7c-3.9,1.7-1.1,3.7-1.1,3.7c3.4,3.7,3.6,1.6,6-1.3c2.4-2.8,4.9,1.6,4.9,1.6c-0.6,0.6-0.7,3.5-0.7,3.5c-0.2,5.2-3.4,9.3-5.9,9.2c-2.5-0.1-7.2-0.1-7.8-3.7c-0.7-3.6-2.5-1.9-3.2-1.3c-0.8,0.6-3.9,1.2-4.8,1c-0.9-0.1-1.9,0.6-2.1,2.5c0,0,0.7,1.9-1.7,0.8c-2.4-1.1-4.1-1-5.8-0.6c0,0-0.4-0.8-0.4-4.2l0,0.1c0.4-4.6-0.8-3.3-1.3-4.5c-0.4-1.2-0.5-3.9-0.8-4.4c-0.3-0.5-3.8-2.3-4.5-5.1c-0.5-1.9-1.4-4.3-1.5-6.4l-0.1-0.3l0-0.5c-0.1-0.5,1.5-3.3,1.5-3.3c1-2.3-0.4-2.7-0.8-3.7c-0.4-1-1.1-4.1-0.2-4.8c0.9-0.7,1.3-2.3,1.3-2.3c0.6-7.4,8.4-8.6,8.4-8.6s8.4,3,9.2,3.5c0.8,0.5,2.3,2.4,1.5,4.1c0,0-0.4,2.2,4,1.9l0.3-0.1c0,0,5.3-0.4,7.4,1.2l0.4,0.4c0.9,1.1,6.4,1.9,9,1.5c2.6-0.3,2.9-1.8,4.7-2.3l1-0.5c0,0,0.4,2-0.9,3.2c-1.3,1.3,0.1,2,1.7,2.7c1.6,0.7,5.1,1.3,5.7,2.9C116.7,129.3,113.8,133.4,106.3,136.8z",
    labelX: 83, labelY: 137,
  },
  {
    id: "jeonbuk",
    name: "전북",
    path: "M27,105.6c-3.1,0.3,1.3,4.2,1.3,4.2c3.8,5-1.4,8.7-1.5,8.8c-0.1,0.1-3.2,2-2.8,4.1c0.5,2.3-0.5,2-0.9,2.5c-1.5,2.2-0.3,3.2-0.3,3.2s2.6,3.7,4.1,4.9c0,0,1.4,0.7,2.6,0.7c0,0,4.2-2.6,5.6-5.2c1.4-2.6,6.1,0.7,7.4,1.5c1.3,0.8,3.4,5.1,5.5,4.4c2.1-0.8,3.7-0.8,5.1-0.3c1.4,0.6,4.5-1.2,5.3-1.9c2.2-1.8,4.1,1.5,4,1c-0.1-0.5,1.5-3.3,1.5-3.3c1-2.3-0.4-2.7-0.8-3.7c-0.4-1-1.1-4.1-0.2-4.8c0.9-0.7,1.3-2.3,1.3-2.3c0.6-7.4,8.4-8.6,8.4-8.6c0-0.8-0.5-3.2-0.8-4.4c-0.3-1.2-6.8-1.9-6.8-1.9c0.6,2.5-6.2,2.1-7.9,1.6c-1.7-0.5-1.9-3.1-3.4-4.8c-1.4-1.7-4.1,1-5.5,2.1c-1.3,1.1-4,0.9-4-0.8c0.1-1.7-1.1-4.1-2.6-4.3c-1.5-0.3-2.9,1.7-4.3,5.1c-1.4,3.5-6.8,1.5-6.8,1.5L27,105.6z",
    labelX: 45, labelY: 118,
  },
  {
    id: "jeonnam",
    name: "전남",
    path: "M70.6,154.5c0.4-4.6-0.8-3.3-1.3-4.5c-0.4-1.2-0.5-3.9-0.8-4.4c-0.3-0.5-3.8-2.3-4.5-5.1c-0.5-1.9-1.4-4.3-1.5-6.4l-0.1-0.3c-0.2-1.5-2.8-2.7-3.9-1.5c-0.7,0.7-3.9,2.5-5.3,1.9c-1.4-0.6-3-0.5-5.1,0.3c-2.1,0.8-4.2-3.5-5.5-4.4c-1.3-0.8-6-4.1-7.4-1.5c-1.4,2.6-5.6,5.2-5.6,5.2c-1.1,0-2.6-0.7-2.6-0.7c-1.5-1.2-4.1-4.9-4.1-4.9s-0.5-1.1-1.3,0.2c-1,1.6,0.2,1.5,0,2.5c-0.2,1-3.5,2-2,5.2c1.5,3.2-1,3.7-3,4.2c-2,0.5-3.5-0.3-7.1,0c-3.5,0.3-2,2.9,0.7,4.4c2.7,1.5,2.1,3.5-0.7,4.2c-1.7,0.4-2.4,0.1-2.2,1.5c0.6,4.7-1.5,3.5-2.4,4.4c-0.9,0.8-1.3,1.7-0.7,3.2c0.7,1.5,1.5,1.2,1.5,3c0,1.9-2.5,2.5,1.7,3.9c4.2,1.4,1.3,2.8,0.5,3.2c-2.4,1.2-4.4,5.6-5.7,9.1c-1.3,3.5,1.8,1.7,1.9,2.5c0.4,1.8,1.9,4.6,6.8,0c9.1,0.8,2.5-5.6,3.7-5.6c1.2,0,5.1-1.2,6.1-1.3c1-0.2,4.4,1.5,4.4,1.5l5.4,2c0,0,5.4,0,8.9,0.2c3.5,0.2,4.6,0.3,6.1-0.5c1.5-0.8,0.8-3.4,1.3-4.2c0.5-0.8,3.4-0.5,5.1-0.5c1.7,0,0.2-3.4,3.7-2c3.5,1.3,4.7,0.2,4.9-2.4c0.2-2.5-4.2-6.7,2.7-4.6c6.9,2.2,6.8-1.6,7.6-3l0.2-1C70.9,158.6,70.5,157.7,70.6,154.5",
    labelX: 30, labelY: 164,
  },
  {
    id: "jeju",
    name: "제주",
    path: "M21.5,188.9c0,0-2.2,3.3-6.1,3.9c-3.9,0.6-2.5,5.8-0.3,7.2c2.2,1.4,3,3.7,6.1,1.6c1.6-1.1,4.8,0.1,8.8-0.3c1.6-0.1,11.5-4.8,10.8-8.9c-0.8-4.1-2.7-6.6-7-5.3c-4.3,1.3-7.5,1.1-8.7,1.1C23.8,188.4,22.8,188.1,21.5,188.9z",
    labelX: 24, labelY: 197,
  },
  {
    id: "chungnam",
    name: "충남",
    path: "M54,74.8c7.2-2.1,1.1-6.4,1.1-6.4l-0.2-0.1c0,0-0.8,0.1-5-1.4c-4.2-1.5-7,0-7,0c-7.4,2.4-9.1-2.7-9.5-2.5c-0.4,0.2-1.9-0.1-1.9-0.1c-0.3-0.1-1-0.3-4.4-1.7c-3.4-1.3-4.6-0.3-5.2,0c-0.7,0.3-7.2,5.8-7.9,6.4c-1.2,1.2-0.7,3.7-1,6.1c-0.3,2.4-0.3,5.7,2.2,4c2.5-1.7,4.6,1,3.2,4c-1.3,3,0.8,6.9,4.6,7.3c3.7,0.3,3.9,4.9,2.7,5.7c-1.2,0.8-2.7,1.3,1.2,4.9l3.5,3.7c0,0,5.4,2,6.8-1.5c1.4-3.5,2.8-5.4,4.3-5.1s2.7,2.6,2.6,4.3c-0.1,1.7,2.6,1.9,4,0.8c1.4-1.1,4-3.9,5.5-2.1c1.4,1.7,1.7,4.3,3.4,4.8c1.7,0.5,9.1,1.4,7.7-2.5c-1.4-4-1.8-6.4-2.1-7.2c-0.8-1.8-2.4-1.4-3-1.1l-0.3,0.4c-0.9,1.3-0.8,1.1-1.1,1.4s-1.5,1.1-2.7,0.4c-1.3-0.7-3.6-0.1-4.1-5.7c-0.1-1.3,0.4-3.3,0.4-3.3s0-0.1-1.5-0.4c-1.3-0.2-1.6-1.6-2-4.6c-0.4-2.9,0.5-2.8-0.5-2.9c-1-0.1-0.4-1.1-0.1-2.2c0.3-1-0.6-1.9-0.9-3.3c-0.3-1.4,1.6-2.4,2.3-1.1c0.6,1.3,2.2,2,3.2,1.8C52.7,75.5,53.5,74.9,54,74.8z",
    labelX: 33, labelY: 85,
  },
  {
    id: "chungbuk",
    name: "충북",
    path: "M92.3,64.4c-1.1,1.9-0.7,4.1-0.7,4.1s1.4,5.6-4.8,3.1c-6.2-2.4-5.2,0-7.1,0.6c-1.9,0.6-3.6,3.5-5.4,5c-1.8,1.5-5.2,2.4-3.8,4.1c1.4,1.8,2.5,3.4,2,5.3c-0.4,1.9-3.1,3.5-2.4,5.1c0.8,1.6,2.8,2,5,2c2.2-0.1,2.6,1.8,0.9,4.4c-1.7,2.6-1.9,5.7-2.5,6.2l-1.7,1.6c-2.9-1.5-7-1.6-7-1.6l-0.2-1.1c-1.4-4-1.7-6.4-2.1-7.2c-1-2-3-1.2-3-1.2l0.6-1.3c0.1-0.3,0.4-2.5,0.6-3.4c0.2-0.9,0.2-2.7-0.1-3.4c-0.3-0.7-0.8-0.6-1.5-0.8c-0.7-0.2-3.3-2.3-3.3-2.3s-1.6-2.9-2.6-4.2c-3.2-4,0.7-4.9,0.7-4.9s7.2-1.4,1-6.6c0,0,2.2-4.2,3.1-4.7c0.9-0.5,3.3-0.9,4.5-1.6c1.2-0.7,4.2-3.3,4.2-3.3l0.6-0.5l0.3-0.3c0,0,5.6,1.7,7.1-3.2c0,0,1.1-2.6,1.9,0.5c0.8,3.1,4-0.8,4-0.8s1.7-1.7,3.7,1.3c1.9,3.1,0.6,2.3,6.4,3.7c0,0,2.8-0.2,3.5,3.4C94.3,62.7,93,63.3,92.3,64.4z",
    labelX: 68, labelY: 73,
  },
  {
    id: "gyeonggi",
    name: "경기도",
    path: "M67.7,57.8l0-0.3c0,0,0.4-5.1,0.8-6.6c0.4-1.5,0.1-3.9-0.3-4.8c-0.3-0.8,0.1-1.5,0.1-1.5c2.8-6.1-1.8-4.4-3.4-4.8c-0.9-0.2-3.4-0.8-3.7-2c-0.3-1.3-1.1-3.8-1.1-5.8s1-2.7,1-3.7c0-1,1.4-4.4-7.1-8.9c-8.5-4.4-6.1-7.4-6.1-7.4s-8.6,2.1-9.2,2.5s-3,2-3.9,2.2c-0.7,0.2-2.8,1,0,2.2s5.2,2.1,1.2,4.8c-4,2.7-4.5,0.9-2.9,2.7c1.6,1.8,1.2,3.5-3,5.5c0,0-4.1,3.3-1.9,4.9c0,0,0.8-0.3,0.8,3.1c0,0-0.3,0.8,1.9,0.2c2.3-0.6,4.4-0.6,5.1,0.5c0.7,1.1,2.5,3.9-2.2,7.6l-2.6,2.8c0,0,0.1,2.8-1.3,3.3c-1.5,0.5-2.1,1.9-0.9,3.6c1.2,1.7,4.5,5.4,4.6,5.8c0.1,0.5,2.3,5.4,9.4,3.1c0,0,2.7-1.6,7,0s5.1,1.3,5.1,1.3s2.2-4.2,3.1-4.7c0.9-0.5,3.3-0.9,4.5-1.6c1.2-0.7,4.2-3.3,4.2-3.3l0.6-0.5L67.7,57.8z",
    labelX: 42, labelY: 55,
  },
  {
    id: "seoul",
    name: "서울",
    path: "M36.5,45.3c0,0,4.6,0.6,5.5,1.3c0.9,0.7,3.3,0.3,3.7-1c0.4-1.3,2-0.5,2.8-1.3s0.8-1.9,0.4-2.9c-0.3-1-0.8-0.7-0.8-2.1c-0.1-1.3-1.3-3.1-2.6-4c-1.3-0.8-3,0-3.5,0.7c-0.6,0.7-5.6,5.2-5.6,5.2S37.3,42.6,36.5,45.3z",
    labelX: 41, labelY: 42,
  },
  {
    id: "daegu",
    name: "대구",
    path: "M95,121.2c0,0-0.5-1.8-0.5-2.1c-0.1-1,1.5-0.9,2.6-1.5c1.1-0.6,4.3-5.9,5.8-7.4c1.5-1.5-2.4-5-3.1-5.7c-0.8-0.8-3,0.6-5.7,0.8c-2.7,0.2-1.4,2.2-4.7,3.5c-3.3,1.3-1,3.5-1,3.5c2.6,2.7-0.8,7.7-0.8,7.7S92.8,119.6,95,121.2z",
    labelX: 92, labelY: 113,
  },
  {
    id: "sejong",
    name: "세종",
    path: "M52.4,75.8c-0.5,0.7-0.6,1.8,1,3.8c1,1.3,2.7,4.4,2.7,4.4l0,0c0.2,0.4-0.3,1.3-0.3,1.3C55.3,86.1,53,86,51.9,88l-0.3,0c0,0,0,0-1.3-0.3c-1.3-0.3-1.6-1.6-2-4.6c-0.4-2.9,0.5-2.8-0.5-2.9c-1-0.1-0.4-1.1-0.1-2.2c0.3-1-0.6-1.9-0.9-3.3c-0.3-1.4,1.7-2.4,2.3-1.1c0.8,1.8,3.4,1.9,3.4,1.9S52.5,75.8,52.4,75.8z",
    labelX: 49, labelY: 82,
  },
  {
    id: "daejeon",
    name: "대전",
    path: "M59.6,95l-0.3,0.4c-0.9,1.3-0.8,1.1-1.1,1.4c-0.3,0.3-1.5,1.1-2.7,0.4c-1.3-0.7-3.7,0-4.1-5.7c-0.4-5.8,3.9-5,4.4-6.2c0,0,0.3-0.9,0.2-1.4s2.6,2.1,3.2,2.3c0.7,0.2,1.1,0.1,1.5,0.8c0.3,0.7,0.3,2.5,0.1,3.4c-0.2,0.9-0.5,3.1-0.6,3.4L59.6,95z",
    labelX: 52, labelY: 93,
  },
  {
    id: "incheon",
    name: "인천",
    path: "M31.1,51.1c0.3-3.5-1.3-5.5-3.8-5.7c-2.5-0.2-2.2,5.2-6.6,0c-4.4-5.2-0.8-4.9-1.5-6.2c-0.7-1.3-3.7-0.7-4.6-1.3c-0.8-0.7-2-1.5-0.7-3c1.4-1.5,1.7-2.5,3-3.9c1.4-1.3,2.4,0.6,4-0.7c0.6-0.5,1-3,2.7-2.2s2.6,2.4,3.2,3.2c0,0,0.7,1.4,3,0.9l0,0c0,0-4,3.2-1.8,4.8c0,0,0.8-0.3,0.8,3.1c0,0-0.3,0.8,1.9,0.2c2.3-0.6,4.4-0.6,5.1,0.5c0.7,1.1,2.5,3.9-2.2,7.6L31.2,51L31.1,51.1z",
    labelX: 18, labelY: 43,
  },
  {
    id: "gwangju",
    name: "광주",
    path: "M31.5,136.6c0.2-0.5,0.7,0.2,2-0.1c1.3-0.3,2.9-1.1,4.9-0.7c2,0.4,4.6,2.8,4,6.8c-0.7,4-5.9,3.4-7.3,2.4c-1.1-0.8-0.1-1.3-2.8-2.2c-2.7-0.9-2-2.6-1.1-4C31.2,138.8,31.2,137.4,31.5,136.6z",
    labelX: 34, labelY: 142,
  },
  {
    id: "ulsan",
    name: "울산",
    path: "M122.2,129c-0.3-0.7-0.1-1.1,2-2.8c2-1.8,1.7-8.8,1.7-8.8c0,1.2-5.7,2-7.1,1.2c-1.5-0.9-2.3-1.7-4.7-1.2c-1,0.2-3.9,3.1-3.9,3.1s0.4,2-0.9,3.2c-1.3,1.3,0.1,2,1.7,2.7c1.6,0.7,5.1,1.3,5.7,2.9c0,0,0.1,4.4,3,4l0.8,0C120.5,133.3,122.8,130.4,122.2,129z",
    labelX: 114, labelY: 125,
  },
  {
    id: "busan",
    name: "부산",
    path: "M118.5,138.1c-1.6,4.1-3.7,3.6-4,3.1c-0.4-0.5-3-0.7-3,0.6c0,1.3-1.6,2.2-1.6,2.2c-5.4,1.5-6.7,3.3-6.7,3.3s-2.5-4.4-4.9-1.6c-2.4,2.9-2.6,5-6,1.3c0,0-2.8-2,1.1-3.7c0,0,3.1-1.4,3.3-2.7c0.2-1.2,1.8-0.2,2.9,0.6c1.1,0.8,3.4,2.4,4.8-1.8c0,0-0.1-1.8,1.9-2.7c7.5-3.4,10.3-7.7,10.4-7.5c0.2,0.5-0.1,4.8,3.8,4C121.1,133.2,118.5,138.1,118.5,138.1z",
    labelX: 109, labelY: 140,
  },
];

const regionColors: Record<string, string> = {
  gangwon: "hsl(210, 60%, 75%)",
  gyeongbuk: "hsl(200, 55%, 70%)",
  gyeongnam: "hsl(195, 50%, 72%)",
  jeonbuk: "hsl(170, 45%, 70%)",
  jeonnam: "hsl(160, 50%, 72%)",
  jeju: "hsl(35, 65%, 75%)",
  chungnam: "hsl(180, 45%, 72%)",
  chungbuk: "hsl(190, 50%, 68%)",
  gyeonggi: "hsl(220, 55%, 78%)",
  seoul: "hsl(0, 60%, 75%)",
  daegu: "hsl(340, 45%, 75%)",
  sejong: "hsl(280, 40%, 78%)",
  daejeon: "hsl(260, 45%, 78%)",
  incheon: "hsl(230, 50%, 78%)",
  gwangju: "hsl(150, 50%, 72%)",
  ulsan: "hsl(25, 55%, 75%)",
  busan: "hsl(350, 50%, 72%)",
};

const hoverColors: Record<string, string> = {
  gangwon: "hsl(210, 70%, 60%)",
  gyeongbuk: "hsl(200, 65%, 55%)",
  gyeongnam: "hsl(195, 60%, 57%)",
  jeonbuk: "hsl(170, 55%, 55%)",
  jeonnam: "hsl(160, 60%, 57%)",
  jeju: "hsl(35, 75%, 60%)",
  chungnam: "hsl(180, 55%, 57%)",
  chungbuk: "hsl(190, 60%, 53%)",
  gyeonggi: "hsl(220, 65%, 63%)",
  seoul: "hsl(0, 70%, 60%)",
  daegu: "hsl(340, 55%, 60%)",
  sejong: "hsl(280, 50%, 63%)",
  daejeon: "hsl(260, 55%, 63%)",
  incheon: "hsl(230, 60%, 63%)",
  gwangju: "hsl(150, 60%, 57%)",
  ulsan: "hsl(25, 65%, 60%)",
  busan: "hsl(350, 60%, 57%)",
};

const KoreaMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const selectedData = selectedRegion
    ? regions.find((r) => r.id === selectedRegion)
    : null;

  return (
    <section className="py-10 md:py-16 px-5 md:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            전국 시도별 재정현황
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-8 ml-3">
          지역을 클릭하면 상세 재정정보를 확인할 수 있습니다
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[520px] mx-auto"
          >
            <svg
              viewBox="-2 -2 134 210"
              className="w-full h-auto drop-shadow-sm"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background shadow */}
              <defs>
                <filter id="map-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* Regions */}
              {regions.map((region) => {
                const isHovered = hoveredRegion === region.id;
                const isSelected = selectedRegion === region.id;
                return (
                  <path
                    key={region.id}
                    d={region.path}
                    fill={
                      isSelected
                        ? hoverColors[region.id]
                        : isHovered
                        ? hoverColors[region.id]
                        : regionColors[region.id]
                    }
                    stroke="white"
                    strokeWidth={isSelected ? 1.2 : 0.6}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      filter: isHovered || isSelected ? "brightness(1.05)" : undefined,
                      transform: isHovered ? "scale(1.01)" : undefined,
                      transformOrigin: "center",
                    }}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() =>
                      setSelectedRegion(
                        selectedRegion === region.id ? null : region.id
                      )
                    }
                  />
                );
              })}

              {/* Labels */}
              {regions.map((region) => (
                <text
                  key={`label-${region.id}`}
                  x={region.labelX}
                  y={region.labelY}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: region.id === "seoul" || region.id === "sejong" || region.id === "daejeon" || region.id === "gwangju" ? "3.5px" : "4.5px",
                    fontWeight: hoveredRegion === region.id || selectedRegion === region.id ? 700 : 500,
                    fill: hoveredRegion === region.id || selectedRegion === region.id ? "hsl(222, 47%, 11%)" : "hsl(215, 16%, 37%)",
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  {region.name}
                </text>
              ))}
            </svg>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            {selectedData ? (
              <div className="gov-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ background: hoverColors[selectedData.id] }}
                  />
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedData.name}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">총예산</span>
                    <span className="text-sm font-bold text-foreground">12.5조원</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">세입</span>
                    <span className="text-sm font-bold text-foreground">8.3조원</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">세출</span>
                    <span className="text-sm font-bold text-foreground">7.9조원</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">재정자립도</span>
                    <span className="text-sm font-bold text-primary">52.3%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gov-card p-5 text-center">
                <div className="py-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    지역을 선택해주세요
                  </p>
                  <p className="text-xs text-muted-foreground">
                    지도에서 시도를 클릭하면<br />재정정보를 확인할 수 있습니다
                  </p>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="gov-card p-4">
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                시도 목록
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() =>
                      setSelectedRegion(
                        selectedRegion === region.id ? null : region.id
                      )
                    }
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      selectedRegion === region.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-white shadow-sm"
                      style={{
                        background:
                          selectedRegion === region.id
                            ? hoverColors[region.id]
                            : regionColors[region.id],
                      }}
                    />
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KoreaMap;
