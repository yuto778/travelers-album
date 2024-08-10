"use client";

import { Edit3Icon, PlusCircle, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import Map, { LocationInfo } from "./Map";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TripDetailProps {
  id: string;
}

type Variant = "None" | "Edit";

const TripDetail: React.FC<TripDetailProps> = ({ id }) => {
  const [variant, setVariant] = useState<Variant>("None");
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModal] = useState(false);
  const [isCardDeleteModalOpen, setIsCardDeleteModal] = useState(false);
  const router = useRouter();

  const handleEditmode = () => {
    if (variant === "Edit") {
      setVariant("None");
    }

    if (variant === "None") {
      setVariant("Edit");
    }
  };

  const handleLocationSelect = (location: LocationInfo) => {
    setSelectedLocation(location);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPhotoDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const closePhotoDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const openCardDeleteModal = () => {
    setIsCardDeleteModal(true);
  };

  const closeCardDeleteModal = () => {
    setIsCardDeleteModal(false);
  };

  const handleCardDelete = () => {
    window.location.reload();
  };
  return (
    <div className="flex-1 pt-10 px-8 md:px-14 lg:px-28 flex flex-col justify-center  relative">
      <div className="bg-green-400 bg-opacity-25 rounded-3xl flex h-4/5 w-full mb-5 shadow-custom-shadow p-6 relative ">
        <div className="w-1/2 flex flex-col pr-5">
          <h2 className="font-bold text-2xl text-gray-700 bg-yellow-200 rounded-lg px-8 py-4 shadow-custom-shadow ">
            {id} の旅名
          </h2>
          <div className="flex-1 w-full grid grid-cols-3 md:grid-cols-4 gap-2 p-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-blue-600 relative overflow-hidden rounded-lg aspect-square  shadow-custom-shadow hover:scale-105 transition cursor-pointer hover:shadow-none"
              >
                <Image
                  src={"/images/routephoto.jpg"}
                  alt="写真です"
                  className="object-cover"
                  fill
                />
              </div>
            ))}
          </div>
          <div className="h-1/6 flex items-center space-x-6 justify-center">
            {variant === "Edit" && (
              <>
                <div
                  id="PhotoAdd"
                  className=" px-1 py-3 sm:p-3  bg-green-500 rounded-lg shadow-custom-shadow hover:scale-105 transition md:text-xl cursor-pointer"
                  onClick={openModal}
                >
                  <h2 className=" text-xs md:text-sm  lg:text-lg ">
                    写真を追加
                  </h2>
                </div>
                <div
                  id="PhotoDelete"
                  className="px-1 py-3 sm:p-3 bg-pink-300 rounded-lg shadow-custom-shadow hover:scale-105 transition md:text-xl cursor-pointer"
                  onClick={openPhotoDeleteModal}
                >
                  <h2 className=" text-xs md:text-sm lg:text-lg  ">
                    写真を削除
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-3 pb-2">
          <h2 className="text-gray-600 text-xs md:text-sm lg:text-lg self-start md:self-center mb-3">
            2024年7月10日
          </h2>
          <div className="h-2/3 w-full bg-red-300 rounded-2xl shadow-custom-shadow mb-4 flex flex-col relative overflow-hidden overflow-x-scroll">
            <div className="w-full h-full">
              {/* <Map onLocationSelect={handleLocationSelect} /> */}
            </div>
            {selectedLocation && (
              <div className="absolute bottom-0 w-full h-1/3 bg-gray-300 bg-opacity-85 px-5 overflow-auto">
                <div className="text-sm whitespace-nowrap ">
                  名前: {selectedLocation.name}
                </div>
                <p className="text-sm">緯度: {selectedLocation.lat}</p>
                <p className="text-sm">経度: {selectedLocation.lng}</p>
              </div>
            )}
          </div>
          <div className="h-1/3 w-full   ">
            <h2>メモ</h2>
            <textarea
              name=""
              id=""
              className=" w-full h-full py-1 px-4 text-sm md:text-xl  placeholder:underline outline-green-300"
              placeholder="旅のメモを書いてね"
            ></textarea>
          </div>
        </div>

        {variant === "None" && (
          <>
            <div
              className="absolute top-3 right-5 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer transition shadow-custom-shadow hover:shadow-none"
              onClick={handleEditmode}
            >
              <Edit3Icon className="" />
            </div>
          </>
        )}

        {variant === "Edit" && (
          <>
            <div className="absolute flex top-3 right-5 ">
              <div
                className=" bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer transition shadow-custom-shadow hover:shadow-none"
                onClick={handleEditmode}
              >
                <X />
              </div>
            </div>
          </>
        )}
      </div>
      {variant === "None" && (
        <div className="flex-1 rounded-lg relative">
          <Button
            variant={"outline"}
            className="top-5 right-5 absolute text-xl shadow-custom-shadow hover:scale-110 transition hover:shadow-none"
          >
            <PlusCircle /> カードを追加
          </Button>
        </div>
      )}
      {variant === "Edit" && (
        <>
          <div className="flex-1 rounded-lg flex items-center justify-center">
            <Button
              variant={"outline"}
              className="bg-yellow-200 text-xl shadow-custom-shadow hover:scale-110 transition hover:shadow-none"
            >
              旅行カードを保存
            </Button>
          </div>
          <div
            className="absolute bottom-5 right-24 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer transition shadow-custom-shadow hover:shadow-none"
            onClick={openCardDeleteModal}
          >
            <Trash2 />
          </div>
        </>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 h-2/3 overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 self-center">写真を追加</h2>
            {/* モーダルの内容 */}
            <div
              onClick={closeModal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            {/* ここにモーダルの内容を追加 */}
            <div className="py-10 md:px-10 lg:px-16">
              <p>写真を追加する</p>
            </div>
            <span className="flex-1"></span>
            <Button
              variant="outline"
              className="self-center shadow-custom-shadow hover:shadow-none"
            >
              写真を追加
            </Button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closePhotoDeleteModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 h-2/3 overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 self-center">写真を削除</h2>
            {/* モーダルの内容 */}
            <div
              onClick={closePhotoDeleteModal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            {/* ここにモーダルの内容を追加 */}
            <div className="py-10 md:px-10 lg:px-16">
              <p>どの写真を削除しますか</p>
            </div>
            <span className="flex-1"></span>
            <Button
              variant="outline"
              className="self-center shadow-custom-shadow hover:shadow-none"
            >
              写真を削除
            </Button>
          </div>
        </div>
      )}
      {isCardDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closeCardDeleteModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 h-1/3 overflow-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">
              旅行カードを削除
            </h2>
            <div
              onClick={closeCardDeleteModal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-custom-shadow hover:shadow-none transition"
            >
              <X />
            </div>
            <div className="py-10 md:px-10 lg:px-16 self-center">
              <p>本当に「{id}」を削除しますか</p>
            </div>
            <span className="flex-1"></span>
            <Button
              variant="destructive"
              className="self-center py-5 px-7 shadow-custom-shadow hover:shadow-none"
              onClick={handleCardDelete}
            >
              削除
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetail;
