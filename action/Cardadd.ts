"use server";

// /Cardadd.ts

import { CardAddForm } from "@/components/Cardaddform";
import { prisma } from "@/lib/client";
import { put } from "@vercel/blob";
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
    return new Date().toISOString(); // 現在の日時をISO形式で返す
  }

  let date: Date;

  if (typeof dateValue === "number") {
    // Unix timestamp (seconds or milliseconds)
    date = new Date(dateValue * (dateValue > 10000000000 ? 1 : 1000));
  } else if (typeof dateValue === "string") {
    // EXIFの日付形式 "YYYY:MM:DD HH:mm:ss" を解析
    const [datePart, timePart] = dateValue.split(" ");
    const [year, month, day] = datePart.split(":");
    const [hour, minute, second] = timePart.split(":");

    // UTCとして日付を解析
    date = new Date(
      Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      )
    );
  } else {
    return new Date().toISOString(); // 無効な入力の場合、現在の日時を返す
  }

  return date.toISOString(); // ISO-8601形式の文字列を返す
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

export const Cardadd = async (
  Title,
  Memo,
  formData: FormData,
  boardnumber: string
) => {
  console.log("開始するよ");

  const file = formData.get("photo") as File;

  let latitude: string | null = null;
  let longitude: string | null = null;
  let dateTaken: string | null = null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parser = exifParser.create(buffer);
    const result = parser.parse() as ExifData;

    console.log("EXIF Data:", JSON.stringify(result, null, 2));

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
  } catch (exifError) {
    console.error("EXIF parsing error:", exifError);
    // EXIFデータの解析に失敗した場合のデフォルト値を設定
    dateTaken = "日付情報なし";
  }

  try {
    const { url } = await put(boardnumber, file, { access: "public" });

    const createcard = await prisma.tripcards.create({
      data: {
        board_id: boardnumber,
        title: Title,
        memo: Memo,
        thumbnail: url,
      },
    });

    const createpicture = await prisma.cardpictures.create({
      data: {
        tripcard_id: createcard.id,
        picture_url: url,
        take_at: dateTaken,
        location_pointx: latitude,
        location_pointy: longitude,
      },
    });
    return { success: true, createcard, createpicture };
  } catch (error) {
    console.error("Card addition error:", error);
    return { success: false, error: "カードの追加中にエラーが発生しました" };
  }
};
