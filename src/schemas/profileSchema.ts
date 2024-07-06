import * as yup from "yup";

const profileSchema = yup.object().shape({
  profileImage: yup.string(),
  fullName: yup.string().typeError("Names must be a string"),
  gender: yup.string().typeError("Gender must be a string"),
  birthdate: yup.string().typeError("Birth date must be a string"),
  preferredLanguage: yup.string().typeError("Language must be a string"),
  preferredCurrency: yup.string().typeError("Currecy must be a string"),
  street: yup.string().typeError("Street must be a string"),
  city: yup.string().typeError("City must be a string"),
  state: yup.string().typeError("State must be a string"),
  postalCode: yup.string().typeError("Postal code must be a string"),
  country: yup.string().typeError("Country is a string"),
});

export default profileSchema;
