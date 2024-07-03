import { FormControl, Select, MenuItem } from "@mui/material";

const UserRoleSelect = ({
  user,
  roles,
  handleRoleChange,
  loadingAction,
  loading,
}) => (
  <FormControl fullWidth>
    <Select
      value={user.roleId}
      onChange={(e) => handleRoleChange(user.id, Number(e.target.value))}
      disabled={loadingAction[user.id] || loading}
      inputProps={{ "data-testid": `role-select-${user.id}` }}
      size="small"
    >
      {roles.map((role) => (
        <MenuItem key={role.id} value={role.id}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default UserRoleSelect;
