import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import updatePasswordSchema from "../../schemas/updatepasswordSchema";
import Button from "../common/auth/Button";
import InputField from "../common/auth/InputField";

interface UpdatePasswordFormInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordUpdateFormProps {
  onSubmit: SubmitHandler<UpdatePasswordFormInputs>;
  onCancel: () => void;
  loading: boolean;
}

const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = ({
  onSubmit,
  onCancel,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormInputs>({
    resolver: yupResolver(updatePasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="oldPassword"
        type="password"
        placeholder="old Password"
        register={register}
        error={errors.oldPassword?.message}
      />
      <InputField
        name="newPassword"
        type="password"
        placeholder="New Password"
        register={register}
        error={errors.newPassword?.message}
      />
      <InputField
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        register={register}
        error={errors.newPassword?.message}
      />
      <div className="mt-20 flex justify-center gap-10 w-full">
        <Button
          text="Cancel"
          onClick={onCancel}
          className="bg-white text-[#161616] py-3 px-4 my-4 text-normal md:text-lg"
          data-testid="pw-cancel-btn"
        />
        <Button
          text={loading ? "Loading..." : "Save Password"}
          className="bg-[#DB4444] text-white py-3 px-4 "
          disabled={loading}
          data-testid="pw-update-btn"
        />
      </div>
    </form>
  );
};

export default PasswordUpdateForm;
