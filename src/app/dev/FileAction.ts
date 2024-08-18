// app/actions/uploadImage.ts
"use server";

import { prisma } from "@/lib/client";
import exifParser from "exif-parser";

interface ExifData {
  tags: {
    GPSLatitude?: number;
    GPSLongitude?: number;
    DateTimeOriginal?: string | number;
    [key: string]: any;
  };
}

// 撮影日時を日本語表記に整形する関数
function formatDatetime(dateValue: string | number | undefined): string {
  if (dateValue === undefined) {
    return "日付情報なし";
  }

  console.log("Original date value:", dateValue); // デバッグ用ログ

  if (typeof dateValue === "number") {
    // Unix timestamp (seconds or milliseconds)
    const date = new Date(dateValue * (dateValue > 10000000000 ? 1 : 1000));
    return formatDate(date);
  } else if (typeof dateValue === "string") {
    // EXIFの日付形式 "YYYY:MM:DD HH:mm:ss" を解析
    const [datePart, timePart] = dateValue.split(" ");
    const [year, month, day] = datePart.split(":");
    const [hour, minute, second] = timePart.split(":");

    // UTCとして日付を解析し、日本時間に調整
    const date = new Date(
      Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      )
    );
    date.setUTCHours(date.getUTCHours() - 9); // UTCから日本時間への調整（9時間引く）
    return formatDate(date);
  } else {
    return "無効な日付形式";
  }
}

function formatDate(date: Date): string {
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", date);
    return "日付形式エラー";
  }

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${date.getUTCFullYear()}年${pad(date.getUTCMonth() + 1)}月${pad(
    date.getUTCDate()
  )}日 ${pad(date.getUTCHours())}時${pad(date.getUTCMinutes())}分${pad(
    date.getUTCSeconds()
  )}秒`;
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parser = exifParser.create(buffer);
    const result = parser.parse() as ExifData;

    console.log("EXIF Data:", JSON.stringify(result, null, 2)); // 詳細なEXIFデータのログ

    let latitude: string | null = null;
    let longitude: string | null = null;
    let dateTaken: string | null = null;

    // 位置情報の取得と文字列への変換（存在する場合）
    if (result.tags.GPSLatitude && result.tags.GPSLongitude) {
      latitude = result.tags.GPSLatitude.toString();
      longitude = result.tags.GPSLongitude.toString();
      console.log("GPS Data:", { latitude, longitude });
    }

    // 撮影日時の取得と日本語表記への変換
    if (result.tags.DateTimeOriginal !== undefined) {
      dateTaken = formatDatetime(result.tags.DateTimeOriginal);
    } else {
      console.log("DateTimeOriginal not found in EXIF data");
      dateTaken = "日付情報なし";
    }
    console.log("Date Taken:", dateTaken);

    // Prismaを使用してpictureテーブルにデータを保存
    const picture = await prisma.picture.create({
      data: {
        latitude,
        longitude,
        datatoken: dateTaken,
        // 他の必要なフィールドがあれば追加
      },
    });

    console.log("date", picture.datatoken);

    console.log("Picture saved:", picture);

    return picture;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
