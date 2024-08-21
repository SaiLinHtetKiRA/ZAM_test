"use client";

import { useParams, usePathname } from "next/navigation";
import React, {
  ChangeEvent,
  Component,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
} from "react";
import Select, {
  ActionMeta,
  ControlProps,
  MultiValue,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  useForm,
  Controller,
  Form,
  UseFormGetValues,
  UseFormSetValue,
  Control,
  SubmitHandler,
} from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaImdb } from "react-icons/fa";
import { Complete, CreatableSelect as CS } from "@/style/Selector";
import { CreateTags } from "@/function";
import store from "@/redux/store";
import { Anime, Tags as CategoriesType, ReactSelectOptions } from "@/type";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface TagsOptions {
  value: string;
  label: string;
}

export default function FormProvider({ Data }: { Data?: Partial<Anime> }) {
  const { setValue, getValues, control, handleSubmit } = useForm<Anime>({
    defaultValues: Data,
  });
  const { Type } = useSelector(
    (state: { state: { Type: string } }) => state.state
  );

  const [CategoriesOptions, setCategoriesOptions] = useState<
    Array<TagsOptions>
  >([]);
  const [ThemeOptions, setThemeOptions] = useState<Array<TagsOptions>>([]);
  const [YearOptions, setYearOptions] = useState<
    Array<{
      value: number;
      label: number;
    }>
  >([]);
  const [StudioOptions, setStudioOptions] = useState<Array<TagsOptions>>([]);
  const [Ep, setEp] = useState<number>(0);
  const [Changed, setChanged] = useState<boolean | number>(true);
  const Params = useParams();
  const path = usePathname();
  // useEffect(() => {
  //   allCategories?.map((category, i) => {
  //     options[i] = { value: category._id, label: category.Name };
  //   });
  //   setCategories(() =>
  //     options?.filter((obj1) =>
  //       Data?.Categories.some((obj2) => obj1.value === obj2._id)
  //     )
  //   );
  // }, [allCategories, Data]);
  useEffect(() => {
    "use strict";
    const {
      state: { socket },
    } = store.getState();

    socket.on("getCategories", (data) =>
      setCategoriesOptions(
        data.map((Category: CategoriesType) => ({
          value: Category._id,
          label: Category.Name,
        }))
      )
    );
    socket.on("getThemes", (data) =>
      setThemeOptions(
        data.map((Theme: CategoriesType) => ({
          value: Theme._id,
          label: Theme.Name,
        }))
      )
    );
    socket.on("getYears", (data) =>
      setYearOptions(
        data.map((data: { Year: number }) => ({
          value: data.Year,
          label: data.Year,
        }))
      )
    );
    socket.on("getStudios", (data) =>
      setStudioOptions(
        data.map((data: { Studio: string }) => ({
          value: data.Studio,
          label: data.Studio,
        }))
      )
    );
    socket.emit("getCategories", Type);
    socket.emit("getThemes", Type);
    socket.emit("getYears", Type);
    socket.emit("getStudios", Type);

    return () => {
      socket.off("getCategories");
      socket.off("getThemes");
      socket.off("getYears");
      socket.off("getYears");
    };
  }, [Type]);

  const SubmitHandler: SubmitHandler<Anime> = async (data) => {
    try {
      const { Type } = store.getState().state;
      const { _id, Poster, ...body } = data;
      const formdata = new FormData();
      if (Array.isArray(Poster)) {
        Poster?.forEach((poster) => {
          formdata.append("posters", poster);
        });
      }

      formdata.append("body", JSON.stringify(body));
      const res = await fetch(
        `http://localhost:5000/admin?type=${Type}&id=${_id}`,
        {
          method: "POST",
          body: formdata,
        }
      );

      if (res.ok) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const InputField = ({
    control,
    Name,
    Type,
  }: {
    control: Control<Anime>;
    Name: keyof Anime;
    Type: string;
  }) => (
    <Controller
      render={({ field }) => (
        <label className="w-full h-full">
          <input
            type={Type}
            placeholder={Name}
            className="backdrop-blur-lg capitalize  bg-transparent  outline-none placeholder-transparent w-full h-full font-bold "
            maxLength={Type == "float" ? 3 : 500}
            inputMode={Type == "float" ? "decimal" : "text"}
          />
        </label>
      )}
      defaultValue={getValues(Name) || ""}
      name={Name}
      control={control}
    />
  );
  return (
    <form
      onSubmit={handleSubmit(SubmitHandler)}
      className="flex flex-col gap-5 p-[10svh]"
    >
      <section className="flex gap-5  h-fit">
        <label htmlFor="Upload" className="">
          <div className="backdrop-blur-sm bg-gray-500/50 drop-shadow-lg shadow-lg shadow-white/5 pb-4 cursor-pointer  w-[140px] sm:w-[160px] lg:w-[210px]  aspect-photo">
            <div className=" w-full h-full relative">
              <ImageUpload
                field="Poster"
                setValue={setValue}
                getValues={getValues}
                Ep={Ep}
              />

              <span className="absolute  bg-white top-2 right-2 cursor-pointer">
                <Controller
                  render={({ field }) => (
                    <Select
                      defaultValue={{ value: true, label: "Com" }}
                      options={[
                        { value: true, label: "Com" },
                        { value: false, label: "On" },
                      ]}
                      isSearchable={false}
                      onChange={(e: any) => setValue("Complete", e.value)}
                      id="Complete"
                      className="uppercase rounded-full w-fit font-semibold sm:text-[10px] lg:text-[15px] text-white/80 outline-none "
                      styles={Complete}
                      classNamePrefix={"Complete"}
                    />
                  )}
                  name="Complete"
                  control={control}
                />
              </span>
              <span className="absolute bottom-2 right-3  w-fit  backdrop-blur-lg  flex gap-x-1 items-center pr-3 justify-center">
                <FaImdb className="fill-[#F5C518] bg-black " />
                <span className=" sm:w-4 lg:w-6 text-white/70 sm:text-[10px] md:text-[13px]  h-full">
                  <InputField
                    control={control}
                    Name={"Rating"}
                    Type={"float"}
                  />
                </span>
              </span>
            </div>

            <div className="flex flex-col pl-2 py-1">
              <span className="font-bold text-white/70 sm:text-[15px] md:text-[18px] truncate capitalize">
                <InputField control={control} Name={"Title"} Type={"text"} />
              </span>
              <span className="text-xs text-white/50">
                Epiosde 1-{getValues("Episodes")?.length}
              </span>
            </div>
          </div>
        </label>
        <aside className="flex flex-wrap gap-5 items-center h-fit">
          <span>
            <CreatableSelector
              Name="Year"
              options={YearOptions}
              onCreate={(e: string) =>
                setYearOptions((pre) => [
                  ...pre,
                  { value: Number(e), label: Number(e) },
                ])
              }
              isMulti={false}
              color="147, 51, 234"
              setValue={setValue}
              control={control}
              getValues={getValues}
            />
          </span>
          <span>
            <CreatableSelector
              Name="Studio"
              options={StudioOptions}
              onCreate={(e: string) =>
                setStudioOptions((pre) => [...pre, { value: e, label: e }])
              }
              isMulti={false}
              color="192, 38, 211"
              setValue={setValue}
              control={control}
              getValues={getValues}
            />
          </span>
          <span>
            <CreatableSelector
              Name="Categories"
              options={CategoriesOptions}
              onCreate={(e: string) =>
                CreateTags(e, "Category").then((res) =>
                  setCategoriesOptions((pre) => [
                    ...pre,
                    { value: res._id, label: res.Name },
                  ])
                )
              }
              isMulti={true}
              color="225, 29, 72"
              setValue={setValue}
              control={control}
              getValues={getValues}
            />
          </span>
          <span>
            <CreatableSelector
              Name="Themes"
              options={ThemeOptions}
              onCreate={(e: string) =>
                CreateTags(e, "Themes").then((res) =>
                  setThemeOptions((pre) => [
                    ...pre,
                    { value: res._id, label: res.Name },
                  ])
                )
              }
              isMulti={true}
              color="6, 182, 212"
              setValue={setValue}
              control={control}
              getValues={getValues}
            />
          </span>
          <Controller
            render={({ field }) => (
              <textarea
                placeholder="write Review...."
                rows={4}
                cols={40}
                className="outline-none p-3 backdrop-blur-md bg-white/30 text-white/80 placeholder-white/60 w-full"
                {...field}
              />
            )}
            name="Review"
            control={control}
          />
          <footer className=" w-full">
            <div className="flex text-white/70  text-xl gap-2 font-bold tracking-wider">
              Episodes-
              <section className="flex gap-2">
                {getValues("Episodes")?.map((Episode, i) => (
                  <span
                    className="text-white/80 cursor-pointer hover:text-white/90"
                    onClick={() => setEp(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                ))}
              </section>
              <div
                onClick={() => {
                  setValue(
                    "Episodes",
                    getValues("Episodes")
                      ? [
                          ...getValues("Episodes"),
                          {
                            Ep: (getValues("Episodes").length + 1).toString(),
                            Tg: "",
                          },
                        ]
                      : [{ Ep: "1", Tg: "" }]
                  );
                  setChanged(getValues("Episodes").length);
                }}
                className="hover:text-white/90 cursor-pointer"
              >
                +
              </div>
            </div>
          </footer>
        </aside>
      </section>
      <button
        type="submit"
        className="backdrop-blur-lg bg-white/60 w-fit p-4 font-bold place-self-center"
      >
        Create
      </button>
      {Ep && (
        <main
          className="fixed inset-0 backdrop-blur-lg flex justify-center items-center "
          // onClick={() => setEp(0)}
        >
          <div className="flex flex-wrap gap-3 border-white/80 border rounded-xl p-10 bg-gray-500 bg-gradient-to-tr from-black/80 to-black/60 z-100">
            <div className="grow text-center text-white/80 text-xl w-10">
              <span className="w-15">
                <EpiosdeList control={control} Name={`Episodes.${Ep - 1}.Ep`} />
              </span>
            </div>
            <div className="w-[140px] sm:w-[160px] lg:w-[210px]  aspect-photo">
              <ImageUpload
                field={`Episodes.${Ep - 1}.Poster`}
                setValue={setValue}
                getValues={getValues}
                Ep={Ep}
              />
            </div>
            <div className="flex flex-col gap-8 pt-[1svw]">
              <EpiosdeList control={control} Name={`Episodes.${Ep - 1}.Tg`} />

              <EpiosdeList control={control} Name={`Episodes.${Ep - 1}.Code`} />

              <div onClick={() => setEp(0)}>Cancle</div>
            </div>
          </div>
        </main>
      )}
    </form>
  );
}

// const Control = ({ children, ...props }: ControlProps) => {
//   console.log(props);
//   const { emoji, onEmojiClick } = props.selectProps;
//   const style = { cursor: "pointer" };

//   return (
//     <components.Control {...props}>
//       <span onMouseDown={onEmojiClick} style={style}>
//         {emoji}
//       </span>
//       {children}
//     </components.Control>
//   );
// };
interface CreatableSelector {
  Name: keyof Omit<Anime, "Poster" | "Episodes">;
  options: ReactSelectOptions[];
  onCreate: (e: string) => void;
  isMulti: boolean;
  color: string;
  control: Control<Anime>;
  setValue: UseFormSetValue<Anime>;
  getValues: UseFormGetValues<Anime>;
}
const CreatableSelector = ({
  Name,
  options,
  onCreate,
  isMulti,
  color,
  control,
  setValue,
  getValues,
}: CreatableSelector) => {
  const values = getValues(Name);

  // Handle the case where values is an array or single value
  const value = Array.isArray(values)
    ? values.map((e) => ({
        value: e._id,
        label: e.Name,
      }))
    : { value: values, label: values };
  return (
    <Controller
      render={({ field }) => (
        <CreatableSelect
          options={options}
          isMulti={isMulti}
          onChange={(e: any) =>
            setValue(
              Name,
              Array.isArray(e) ? e.map((data) => data.value) : e.value
            )
          }
          id={`${Name}-Select`}
          className="capitalize  py-5 font-semibold sm:text-[10px] lg:text-[15px] outline-none "
          styles={CS(color)}
          isSearchable
          isClearable
          placeholder={`Select ${Name}`}
          onCreateOption={onCreate}
          defaultValue={getValues(Name) && value}
        />
      )}
      name={Name}
      control={control}
    />
  );
};
class ImageUpload extends Component<{
  field: string;
  getValues: UseFormGetValues<Anime>;
  setValue: UseFormSetValue<Anime>;
  Ep: number;
}> {
  state = {
    link:
      typeof this.props.getValues(this.props.field as keyof Anime) == "string"
        ? this.props.getValues(this.props.field as keyof Anime)
        : undefined,
  };
  render() {
    const { field, getValues, setValue, Ep } = this.props;
    const { link } = this.state;
    return (
      <label className="w-full h-full">
        {!this.props.getValues("Poster") ? (
          <div className="w-full h-full bg-red-500"></div>
        ) : (
          <img
            src={link as string}
            alt="preview"
            className="object-cover w-full h-full"
          />
        )}

        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              let newFileName =
                Ep + file.name.substring(file.name.lastIndexOf("."));
              let newFile = new File([file], newFileName, { type: file.type });
              const currentPoster = getValues("Poster");
              const posterArray = Array.isArray(currentPoster)
                ? currentPoster
                : [];

              setValue("Poster", [...posterArray, newFile]);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.setState({ link: reader.result });
              };
              reader.onerror = () => {
                console.log(reader.error);
              };
            }
          }}
          required
          accept="image/*"
          className="sr-only"
        />
      </label>
    );
  }
}

class EpiosdeList extends Component<{
  control: Control<Anime>;
  Name: string;
}> {
  render() {
    const { control, Name } = this.props;
    return (
      <div className="flex flex-col gap-5">
        <Controller
          render={({ field }) => {
            const value =
              typeof field.value === "string" || typeof field.value === "number"
                ? field.value
                : "";

            return (
              <label htmlFor={Name} className="relative w-full">
                <input
                  placeholder={Name}
                  {...field}
                  value={value}
                  className="peer bg-transparent text-white/90 outline-none border-b border-b-slate-300 pl-3 pb-1 placeholder-transparent w-full font-bold"
                />
                <span className="absolute transition-all duration-200 font-bold -mt-4 ml-3 text-sm text-white/50 left-0 peer-focus:-mt-4 peer-focus:text-white/50 peer-focus:text-sm peer-placeholder-shown:ml-3 peer-placeholder-shown:mt-0 peer-placeholder-shown:text-lg peer-placeholder:left-0 peer-placeholder-shown:text-white/90">
                  {Name}
                </span>
              </label>
            );
          }}
          name={Name as keyof Anime}
          control={control}
        />
      </div>
    );
  }
}
