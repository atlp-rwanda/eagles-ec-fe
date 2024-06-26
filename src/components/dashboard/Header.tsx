import { FiSearch, FiMenu } from "react-icons/fi";
import { FaRegBell, FaCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";

const profileImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
  <header className="flex lg:w-[80%] lg:ml-[5%] px-8 fixed z-30 top-0 items-center w-full justify-between py-4 bg-white dark:bg-secondary-black">
    <div className="relative flex items-center justify-between w-full lg:hidden">
      <FiMenu className="text-black w-6 h-6 mr-3" onClick={toggleSidebar} />
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2 h-full relative cursor-pointer">
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-10 h-10 object-cover rounded-full"
          />
          <h4>Alex Smith</h4>
          <FaAngleDown className="" />
        </div>
      </div>
    </div>
    <div className="hidden lg:flex items-center justify-between w-full">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <FiSearch className="text-dark-gray" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-10 py-2 rounded-md dark:border-[0.3px] outline-none bg-[#F7F8FA] focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center relative justify-center p-3">
          <BiSolidMessageDetail className="text-dark-gray size-6" />
          <FaCircle className="text-red-500 text-[10px] absolute top-2.5 right-2.5" />
        </div>
        <div className="flex items-center justify-center relative p-3">
          <FaRegBell className="text-dark-gray size-6 cursor-pointer" />
          <FaCircle className="text-red-500 text-[10px] absolute top-2.5 right-3" />
        </div>

        <div className="flex items-center space-x-2 h-full relative cursor-pointer">
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-10 h-10 object-cover rounded-full"
          />
          <h4>Alex Smith</h4>
          <FaAngleDown className="dark:text-white" />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
