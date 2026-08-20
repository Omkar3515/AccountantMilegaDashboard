import { useEffect, useState, useRef } from "react";
import { Bell, Mail, ChevronDown, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredUser, getInitials, logoutUser, type UserProfile } from "../../services/authService";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const displayName = user?.fullName || "MS & Associates";
  const initials = getInitials(displayName);

  return (
    <header className="bg-white border-b border-gray-200 h-20 px-8 flex items-center justify-between sticky top-0 z-10 font-sans">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-green rounded-full border-2 border-white"></span>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Mail className="w-6 h-6" />
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200"></div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-10 h-10 rounded-full bg-brand-light text-brand-green font-bold flex items-center justify-center border border-brand-green/20">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || "Employer"}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
