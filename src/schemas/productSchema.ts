import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  stockQuantity: yup
    .number()
    .required("Quantity is required")
    .typeError("Quantity must be a number"),
  description: yup.string().required("Description is required"),
  categoryID: yup
    .number()
    .optional()
    .required("Category is required")
    .typeError("Category must be a number"),
  expiryDate: yup.date().typeError("Invalid date format").nullable().optional(),
  discount: yup
    .number()
    .typeError("Discount must be a number")
    .nullable()
    .optional(),
  images: yup
    .array()
    .of(yup.mixed().required("Image is required"))
    .min(4, "At least 4 images are required")
    .max(8, "No more than 8 images are allowed")
    .required("Images are required"),
});

export const updateProductSchema = yup.object().shape({
  name: yup.string().optional(),
  price: yup.number().typeError("Price must be a number").optional(),
  stockQuantity: yup.number().optional().typeError("Quantity must be a number"),
  description: yup.string().optional(),
  categoryID: yup.number().optional().typeError("Category must be a number"),
  expiryDate: yup.date().typeError("Invalid date format").nullable().optional(),
  discount: yup
    .number()
    .nullable()
    .typeError("Discount must be a number")
    .optional(),
  images: yup.array().of(yup.mixed().optional()).optional(),
});
