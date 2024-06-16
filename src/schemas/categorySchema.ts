// /* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value: any) => value && value.length > 0,
    ),
});

export default categorySchema;
