"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { ja } from "date-fns/locale";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusCircleIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as HookForm,
} from "../components/ui/form";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const TripAddSchema = z.object({
  Title: z.string(),
  DepartureDate: z.date(),
  ArrivalDate: z.date(),
  Member: z.string(),
  TopPhoto: z.string(),
});

const members = {
  hachi: {
    id: 1,
    name: "八村塁",
    checked: false,
  },
  koike: {
    id: 2,
    name: "小池百合子",
    checked: false,
  },
  josh: {
    id: 3,
    name: "ジョシュ・ホーキンソン",
    checked: false,
  },
};

interface TripAddFormProps {
  userid?: string;
}

type TripAddForm = z.infer<typeof TripAddSchema>;

const TripAddForm: React.FC<TripAddFormProps> = ({ userid }) => {
  const [member, setMember] = useState(members);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
  const [DepartureCalendarMonth, setDepartureCalendarMonth] = useState<Date>(
    new Date()
  );
  const [ArrivalCalendarMonth, setArrivalCalendarMonth] = useState<Date>(
    new Date()
  );

  const router = useRouter();
  const TripAddform = useForm<TripAddForm>({
    resolver: zodResolver(TripAddSchema),
    defaultValues: {
      Title: "",
      DepartureDate: new Date(),
      ArrivalDate: new Date(),
      Member: "",
      TopPhoto: "",
    },
  });

  const Tripadd = () => {
    router.replace("/tripadd");
  };

  const updateCheckboxStates = () => {
    const updatedMember = Object.fromEntries(
      Object.entries(member).map(([key, value]) => [
        key,
        {
          ...value,
          checked: selectedMembers.includes(value.name),
        },
      ])
    ) as typeof member;
    setMember(updatedMember);
  };

  const handleCheckboxChange = (
    memberKey: string,
    isChecked: string | boolean
  ) => {
    if (isChecked) {
      setSelectedMembers((prev) => [...prev, member[memberKey].name]);
    } else {
      setSelectedMembers((prev) =>
        prev.filter((name) => name !== member[memberKey].name)
      );
    }

    setMember((prevMember) => ({
      ...prevMember,
      [memberKey]: {
        ...prevMember[memberKey],
        checked: isChecked,
      },
    }));
  };

  const openMemberModal = () => {
    updateCheckboxStates();
    setIsMemberModalOpen(true);
  };

  const handleAddMember = () => {
    const selectedMemberNames = selectedMembers.join(", ");
    TripAddform.setValue("Member", selectedMemberNames);
    setIsMemberModalOpen(false);
  };

  const closeMemberModal = () => {
    setIsMemberModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col h-full items-center py-5  ">
        <HookForm {...TripAddform}>
          <div className="flex flex-col items-center w-full h-full justify-center md:w-3/4 bg-green-400 bg-opacity-25 rounded-2xl shadow-custom-shadow space-y-7">
            <h2 className=" text-2xl font-semibold self-center  ">
              旅行ボードを追加
            </h2>
            <form
              onSubmit={TripAddform.handleSubmit(Tripadd)}
              className="space-y-8 flex flex-col w-full  "
            >
              <FormField
                control={TripAddform.control}
                name="Title"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full pr-16 space-y-0 relative ">
                    <FormLabel className="text-lg md:text-xl  w-1/3  sm:w-1/4 text-center">
                      タイトル :
                    </FormLabel>
                    <FormControl className="flex-1 ">
                      <Input
                        className="shadow-custom-shadow "
                        placeholder="東京旅行"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={TripAddform.control}
                name="DepartureDate"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full pr-16 space-y-0 relative">
                    <FormLabel className="text-lg md:text-xl w-1/3  sm:w-1/4 text-center">
                      出発日 :
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="flex-1 shadow-custom-shadow">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-white hover:bg-gray-100",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy年MM月dd日")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          locale={ja}
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="rounded-md border shadow-custom-shadow p-3"
                          month={DepartureCalendarMonth}
                          onMonthChange={setDepartureCalendarMonth}
                          formatters={{
                            formatCaption: (date, options) => {
                              return (
                                <>
                                  <div className="flex justify-center items-center space-x-2">
                                    <select
                                      value={date.getFullYear()}
                                      onChange={(e) => {
                                        const year = parseInt(e.target.value);
                                        const newDate = new Date(
                                          DepartureCalendarMonth
                                        );
                                        newDate.setFullYear(year);
                                        setDepartureCalendarMonth(newDate);
                                      }}
                                    >
                                      {Array.from(
                                        { length: 101 },
                                        (_, i) => i + 1990
                                      ).map((year) => (
                                        <option key={year} value={year}>
                                          {year}年
                                        </option>
                                      ))}
                                    </select>
                                    <select
                                      value={date.getMonth()}
                                      onChange={(e) => {
                                        const month = parseInt(e.target.value);
                                        const newDate = new Date(
                                          DepartureCalendarMonth
                                        );
                                        newDate.setMonth(month);
                                        setDepartureCalendarMonth(newDate);
                                      }}
                                    >
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>
                                          {options.locale.localize?.month(
                                            i as
                                              | 0
                                              | 1
                                              | 2
                                              | 3
                                              | 4
                                              | 5
                                              | 6
                                              | 7
                                              | 8
                                              | 9
                                              | 10
                                              | 11
                                          )}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </>
                              );
                            },
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={TripAddform.control}
                name="ArrivalDate"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full pr-16 space-y-0 relative">
                    <FormLabel className="text-lg md:text-xl  w-1/3  sm:w-1/4 text-center">
                      到着日 :
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="flex-1 shadow-custom-shadow">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-white hover:bg-gray-100",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy年MM月dd日")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          locale={ja}
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="rounded-md border shadow-custom-shadow p-3"
                          month={ArrivalCalendarMonth}
                          onMonthChange={setArrivalCalendarMonth}
                          formatters={{
                            formatCaption: (date, options) => {
                              return (
                                <>
                                  <div className="flex justify-center items-center space-x-2">
                                    <select
                                      value={date.getFullYear()}
                                      onChange={(e) => {
                                        const year = parseInt(e.target.value);
                                        const newDate = new Date(
                                          ArrivalCalendarMonth
                                        );
                                        newDate.setFullYear(year);
                                        setArrivalCalendarMonth(newDate);
                                      }}
                                    >
                                      {Array.from(
                                        { length: 201 },
                                        (_, i) => i + 1900
                                      ).map((year) => (
                                        <option key={year} value={year}>
                                          {year}年
                                        </option>
                                      ))}
                                    </select>
                                    <select
                                      value={date.getMonth()}
                                      onChange={(e) => {
                                        const month = parseInt(e.target.value);
                                        const newDate = new Date(
                                          ArrivalCalendarMonth
                                        );
                                        newDate.setMonth(month);
                                        setArrivalCalendarMonth(newDate);
                                      }}
                                    >
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>
                                          {options.locale.localize?.month(
                                            i as
                                              | 0
                                              | 1
                                              | 2
                                              | 3
                                              | 4
                                              | 5
                                              | 6
                                              | 7
                                              | 8
                                              | 9
                                              | 10
                                              | 11
                                          )}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </>
                              );
                            },
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={TripAddform.control}
                name="Member"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full pr-16 space-y-0  relative">
                    <FormLabel className="text-lg md:text-xl w-1/3  sm:w-1/4  text-center">
                      参加者 :
                    </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        placeholder="ゆうと"
                        {...field}
                        className="shadow-custom-shadow cursor-pointer"
                        autoComplete="off"
                        onClick={openMemberModal}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={TripAddform.control}
                name="TopPhoto"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full pr-16 space-y-0 relative">
                    <FormLabel className="text-lg md:text-xl w-1/3  sm:w-1/4 text-center">
                      トップ写真 :
                    </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        type="file"
                        placeholder="PhotoPath"
                        {...field}
                        className=" shadow-custom-shadow hover:bg-gray-100  transition cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="submit"
                className="self-center bg-yellow-400 hover:bg-yellow-500  shadow-custom-shadow hover:shadow-none"
              >
                旅行を追加
              </Button>
            </form>
          </div>
        </HookForm>
      </div>
      {isMemberModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
          onClick={closeMemberModal}
        >
          <div
            className="bg-white p-5 rounded-lg w-3/4 md:w-1/2 h-2/3 overflow-auto relative flex flex-col space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold  self-center">メンバーを追加</h2>
            <div
              onClick={closeMemberModal}
              className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer transition shadow-custom-shadow hover:shadow-none"
            >
              <X />
            </div>
            <div className="py-10 sm:px-20 lg:px-36 flex flex-col   space-y-6">
              <div className="flex flex-col space-y-6">
                {Object.entries(member).map(([key, value]) => (
                  <div className="flex" key={key}>
                    <Checkbox
                      id={value.id.toString()}
                      className="self-start"
                      checked={value.checked}
                      onCheckedChange={(checked: string | boolean) =>
                        handleCheckboxChange(key, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={value.id.toString()}
                      className="flex-1 text-xl text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <span className="flex-1 "></span>
            <Button
              variant="outline"
              className="self-center py-5 px-7  bg-yellow-300 shadow-custom-shadow hover:shadow-none  hover:bg-yellow-400  transition"
              onClick={handleAddMember}
            >
              一緒に出かける！
            </Button>

            <Button
              variant="outline"
              className="self-center shadow-custom-shadow hover:shadow-none bg-green-200 transition hover:bg-green-400 "
              onClick={() => {
                router.push(`/${userid}/memberadd`);
              }}
            >
              <PlusCircleIcon className="pr-2" />
              新規旅行者登録
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TripAddForm;
