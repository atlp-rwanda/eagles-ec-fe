import React from "react";
import { FaUser } from "react-icons/fa"; // Import default user icon

interface UserAvatarProps {
  name: string;
  imageUrl?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, imageUrl }) => (
  <div className="flex items-center">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={name}
        className="object-cover w-5 h-5 rounded-full"
      />
    ) : (
      <FaUser className="w-5 h-5 text-gray-500" />
    )}
    <span className="ml-3 font-medium text-md">{name}</span>
  </div>
);

export default UserAvatar;
