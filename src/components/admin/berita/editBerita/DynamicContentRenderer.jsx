"use client";

import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import ImageDropzone from "../../ImageDropzone";

const DynamicContentRenderer = ({
  loading,
  content: initialContent = [],
  onChange,
}) => {
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState("");

  const handleDelete = (id) => {
    const updated = content.filter((item) => item.id !== id);

    setContent(updated);
    onChange?.(updated);
  };

  const handleAdd = (afterId, type) => {
    const newItem = {
      id: crypto.randomUUID(),
      type,
      value: type === "file" ? null : "",
      caption: type === "file" ? "" : undefined,
    };
    const index = content.findIndex((item) => item.id === afterId);
    const updated = [
      ...content.slice(0, index + 1),
      newItem,
      ...content.slice(index + 1),
    ];
    setContent(updated);
    onChange?.(updated);
  };

  const handleChange = (id, value) => {
    const updated = content.map((item) =>
      item.id === id ? { ...item, value } : item
    );
    setContent(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {content.map((item, index) => (
        <div
          key={item.id}
          className="border border-gray-300 rounded p-4 shadow-sm space-y-2 relative"
        >
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">
              Konten {index + 1} (
              {item.type === "text"
                ? "Paragraf"
                : item.type === "subtitle"
                ? "Subjudul"
                : item.type === "link"
                ? "Link" 
                : "Gambar"}
              )
            </p>
            <Button
              className="bg-transparent border border-red-500 cursor-pointer text-red-500 hover:text-white hover:border-white"
              onClick={() => handleDelete(item.id)}
            >
              <TrashIcon size={20} />
            </Button>
          </div>

          {item.type === "subtitle" && (
            <Input
              className="text-sm lg:text-base"
              value={item.value}
              disabled={loading}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Tulis subjudul..."
            />
          )}

          {item.type === "text" && (
            <Textarea
              className="text-sm lg:text-base"
              rows={4}
              disabled={loading}
              value={item.value}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Tulis isi paragraf..."
            />
          )}
          {item.type === "link" && (
            <Textarea
              className="text-sm lg:text-base"
              rows={4}
              disabled={loading}
              value={item.value}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Tulis isi link..."
            />
          )}

          {item.type === "file" && (
            <div className="space-y-2">
              <ImageDropzone
                disabled={loading}
                existingImage={item.value}
                onFileUpload={(files) => handleChange(item.id, files[0])}
              />
              <Input
                className="text-xs lg:text-sm"
                disabled={loading}
                value={item.caption || ""}
                onChange={(e) => {
                  const updated = content.map((c) =>
                    c.id === item.id ? { ...c, caption: e.target.value } : c
                  );
                  setContent(updated);
                  onChange?.(updated);
                }}
                placeholder="Tulis caption gambar..."
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-2 mt-2">
            <Button
              type="button"
              disabled={loading}
              onClick={() => handleAdd(item.id, "text")}
              className="text-xs bg-blue-ylbkd cursor-pointer text-white hover:underline flex items-center gap-1"
            >
              <PlusIcon size={14} /> Tambah Text
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => handleAdd(item.id, "subtitle")}
              className="text-xs bg-blue-ylbkd cursor-pointer text-white hover:underline flex items-center gap-1"
            >
              <PlusIcon size={14} /> Tambah Subtitle
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => handleAdd(item.id, "file")}
              className="text-xs bg-blue-ylbkd cursor-pointer text-white flex items-center gap-1"
            >
              <PlusIcon size={14} /> Tambah Gambar
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => handleAdd(item.id, "link")}
              className="text-xs bg-blue-ylbkd cursor-pointer text-white flex items-center gap-1"
            >
              + Tambah Link
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicContentRenderer;
