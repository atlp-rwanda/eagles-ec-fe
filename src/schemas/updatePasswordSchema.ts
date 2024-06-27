import { object, string, ref } from "yup";

const updatePasswordSchema = object({
  oldPassword: string().required("Old password is required"),
  newPassword: string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .notOneOf(
      [ref("oldPassword")],
      "New password must be different from old password",
    ),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("newPassword")], "Confirm password must match new password"),
});

export default updatePasswordSchema;
