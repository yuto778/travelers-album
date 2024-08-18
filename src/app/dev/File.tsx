// app/components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { uploadImage } from "./FileAction";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await uploadImage(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit">アップロード</button>
    </form>
  );
}
