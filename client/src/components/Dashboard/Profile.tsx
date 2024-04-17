import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { RootState } from "@/redux/store";

import { signupFields } from "@/constants/constants";
import {
  RegisterUserSchema,
  ValidRegisterFieldNames,
  registerUserSchema,
} from "@/validation/validation";
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

export const Profile = () => {
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | StorageReference>("");
  const [imageUploadProgress, setImageUploadProgress] = useState<string>("");
  const [imageUploadError, setImageUploadError] = useState<string>("");
  const filePickRef = useRef<HTMLInputElement | null>(null);

  const { currentUser, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  const defaultValues = {
    username: (currentUser && currentUser.username) || "",
    email: (currentUser && currentUser.email) || "",
    photoUrl: (currentUser && currentUser.photoUrl) || "",
  };

  const uploadImage = async () => {
    const storage = getStorage(app);
    if (imageFiles) {
      const fileName = new Date().getTime() + imageFiles.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress?.toFixed(0));
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setImageUploadError("Could not upload");
        },
        async () => {
          const getDownloadURL = await uploadTask.snapshot.ref;
          setImageUrl(getDownloadURL);
        }
      );
    }
  };

  console.log(imageUrl, "imageUrlimageUrlimageUrlimageUrl");
  console.log(
    imageUploadProgress,
    "imageUploadProgressimageUploadProgressimageUploadProgressimageUploadProgress"
  );
  console.log(
    imageUploadError,
    "imageUploadErroimageUploadErroimageUploadErro"
  );

  useEffect(() => {
    if (imageFiles) {
      uploadImage();
    }
  }, [imageFiles]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      return setImageFiles(files[0]);
    }
  };

  const onSubmit: SubmitHandler<RegisterUserSchema> = (data) =>
    console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full mx-auto gap-y-6 max-w-96"
      >
        <input
          type="file"
          accept="image/*"
          {...register("photoUrl")}
          onChange={handleImageChange}
          ref={filePickRef}
          hidden
        />
        <div
          className="relative w-32 h-32 p-2 mb-6 rounded-full cursor-pointer group bg-primary"
          onClick={() => filePickRef.current?.click()}
        >
          <img
            src={imageUrl || (currentUser && currentUser.photoUrl) || ""}
            alt="user"
            className="object-cover w-full h-full rounded-full"
          />
          <div className="absolute top-0 left-0 flex-col items-center justify-center hidden w-full h-full bg-white rounded-full bg-opacity-70 group-hover:flex">
            <PlusIcon className="opacity-60" />
            <span className="text-xs opacity-70">Replace image</span>
          </div>
        </div>
        {signupFields.map((field, index) => {
          const { placeholder, name, type } = field;

          return (
            <label key={index} className="relative min-w-full">
              <input
                type={type}
                className={`input input-bordered w-full`}
                placeholder={placeholder}
                {...register(name as ValidRegisterFieldNames)}
              />

              {errors[name as ValidRegisterFieldNames] && (
                <p className="w-full mt-2 text-sm text-error">
                  {errors[name as ValidRegisterFieldNames]?.message}
                </p>
              )}
            </label>
          );
        })}

        <button
          type="submit"
          className="flex items-center justify-center w-full mt-4 btn btn-secondary gap-x-2"
          disabled={loading}
        >
          {loading && <Loader2Icon className="w-5 h-5 animate-spin" />}
          Submit
        </button>

        <button
          className="flex items-center justify-center w-full btn btn-neutral gap-x-2"
          // @ts-ignore
          onClick={() => document.getElementById("delete-profile")?.showModal()}
        >
          {loading && <Loader2Icon className="w-5 h-5 animate-spin" />}
          Delete Account
        </button>
        <dialog id="delete-profile" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Account?</h3>
            <p className="pt-1 pb-8">
              Proceed carefully! This process can't be reversed.
            </p>
            <div className="flex justify-end gap-x-2">
              <form method="dialog">
                <button className="btn btn-outline">Cancel</button>
              </form>

              <button className="btn btn-error">Confirm</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </form>
    </div>
  );
};
