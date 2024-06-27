import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Layout from "../../components/layouts/SellerLayout";
import TextInput from "../../components/common/TextInput";
import FileUpload from "../../components/dashboard/FileUpload";
import Button from "../../components/dashboard/Button";
import CustomSelect from "../../components/dashboard/CustomSelect";
import {
  productSchema,
  updateProductSchema,
} from "../../schemas/productSchema";
import AddCategory from "../../components/dashboard/AddCategory";
import { addProduct, updateProduct } from "../../redux/api/productsApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { fetchCategories } from "../../redux/reducers/categoriesSlice";
import { RootState } from "../../redux/store";
import { fetchProducts } from "../../redux/reducers/productsSlice";

export type ErrorType = {
  error?: string;
};

const AddProduct: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("Category");
  const [categoryModal, setCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const categories = useSelector((state: RootState) => state.categories.data);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const products = useSelector((state: any) => state.products.data);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(id ? updateProductSchema : productSchema),
  });

  const handleSelect = (option) => {
    setCategory(option.name);
    setValue("categoryID", option.id);
  };

  useEffect(() => {
    if (id && products.length) {
      const selectedProduct = products.find(
        (item: any) => item.id === Number(id),
      );
      setCategory(selectedProduct.category.name);
      if (selectedProduct) {
        setValue("name", selectedProduct.name);
        setValue("price", selectedProduct.price);
        setValue("stockQuantity", selectedProduct.stockQuantity);
        setValue("discount", selectedProduct.discount);
        setValue("categoryID", selectedProduct.categoryID);
        setValue("description", selectedProduct.description);
        const formattedExpiryDate = new Date(selectedProduct.expiryDate)
          .toISOString()
          .split("T")[0];
        // @ts-ignore
        setValue("expiryDate", formattedExpiryDate);
        handleSelect(selectedProduct.category);
        setExistingImages(selectedProduct.images);
      }
    }
  }, [id, products, setValue]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleRemoveFile = (
    file: File,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("expiryDate", data.expiryDate);
    formData.append("categoryID", data.categoryID);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("description", data.description);
    if (data.images && data.images.length > 0) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }
    try {
      if (id) {
        formData.append("removeImages", JSON.stringify(removeImages));
        setLoading(true);
        const response = await dispatch(
          updateProduct({ id: Number(id), data: formData }),
        ).unwrap();
        setLoading(false);
        if (response.status === 201) {
          toast.success("Your product was updated successfully!");
          setTimeout(() => {
            navigate("/dashboard/products");
          }, 3000);
        } else {
          toast.error("Failed to update product");
        }
      } else {
        setLoading(true);
        // @ts-ignore
        const response = await dispatch(addProduct(formData)).unwrap();
        setLoading(false);
        toast.success("Product added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError<ErrorType>;
      toast.error("An error occurred");
    }
  };

  const handleRemoveExistingImage = (
    index: number,
    image: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setRemoveImages((prevIndexes) => [...prevIndexes, image]);
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <ToastContainer />
      <section className="mt-24 lg:pl-5 2xl:max-w-[90%] mx-auto">
        <button type="button">
          <Link
            to="/dashboard/products"
            className="text-dark-gray flex items-center gap-2 mb-4"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </Link>
        </button>

        <h1 className="text-[18px] font-bold">Product Information</h1>
        <form
          className="flex gap-4 flex-col lg:flex-row w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-2 w-[100%] gap-4">
              <TextInput
                label="Product name"
                placeholder="Name"
                register={register}
                name="name"
                error={errors.name?.message}
              />
              <TextInput
                label="Price"
                placeholder="00.00"
                register={register}
                name="price"
                type="number"
                error={errors.price?.message}
              />
              <TextInput
                label="Stock quantity"
                placeholder="00"
                register={register}
                name="stockQuantity"
                type="number"
                error={errors.stockQuantity?.message}
              />
              <TextInput
                label="Discount"
                placeholder="00"
                register={register}
                name="discount"
                type="number"
                error={errors.discount?.message}
              />
              <div className="w-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-[#161616] text-lg block">Category</h5>
                  <button
                    type="button"
                    className="ml-2 bg-primary text-white px-4 rounded"
                    onClick={() => setCategoryModal(true)}
                  >
                    New
                  </button>
                </div>

                <CustomSelect
                  options={categories}
                  defaultValue={category}
                  onSelect={handleSelect}
                  testId="category-select"
                />

                {errors.categoryID && (
                  <p className="text-red-500">{errors.categoryID.message}</p>
                )}
              </div>
              <TextInput
                label="Expiry date"
                placeholder=""
                register={register}
                name="expiryDate"
                type="date"
                error={errors.expiryDate?.message}
              />
            </div>
            <div className="">
              <h5 className="text-[#161616] block text-lg mb-2">Description</h5>
              <textarea
                className="w-full bg-white text-dark-gray border-[0.5px] border-[#E5E5E5] rounded-[8px] px-4 py-2 focus:outline-none h-32"
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          <div className="lg:mt-2 flex gap-4 flex-col w-full lg:w-[40%]">
            <h5 className="text-lg block text-dark-gray">Images</h5>
            <div className="w-full">
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    {...field}
                    onDrop={(acceptedFiles) => {
                      handleDrop(acceptedFiles);
                      field.onChange([...files, ...acceptedFiles]);
                    }}
                    remove={(file, event) => {
                      // @ts-ignore
                      handleRemoveFile(file, event);
                      field.onChange(files.filter((f) => f !== file));
                    }}
                    files={files}
                    existingImages={existingImages}
                    removeExistingImage={handleRemoveExistingImage}
                  />
                )}
              />
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>
            <Button
              text={loading ? "Loading..." : "Publish Product"}
              disabled={loading}
              type="submit"
              variant="filled"
            />
          </div>
        </form>
        {categoryModal && <AddCategory setCategoryModal={setCategoryModal} />}
      </section>
    </Layout>
  );
};

export default AddProduct;
