import * as Yup from "yup";

const otpSchema = Yup.object().shape({
  value: Yup.string(),
});

export default otpSchema;
