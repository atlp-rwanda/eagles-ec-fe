import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import categorySchema from "../../schemas/categorySchema";
import { addCategory } from "../../redux/reducers/categoriesSlice";
import { useAppDispatch } from "../../redux/hooks";

interface AddCategoryProps {
  setCategoryModal: (isOpen: boolean) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ setCategoryModal }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    const body = { ...data, image: data.image[0] };
    console.log(body);
    try {
      setLoading(true);
      const response = await dispatch(addCategory(body)).unwrap();
      setLoading(false);
      toast.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] duration-75 animate-fadeIn">
        <h2 className="text-2xl mb-4">New Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              className={`w-full p-2 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded`}
              {...register("image")}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className={`w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded`}
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setCategoryModal(false)}
              className="bg-transparent text-primary border border-primary px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
