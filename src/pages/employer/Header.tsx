import { Bell, Mail, ChevronDown, Menu } from 'lucide-react';

const Header = () => {
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

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-brand-light text-brand-green font-bold flex items-center justify-center border border-brand-green/20">
            MS
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900">MS & Associates</p>
            <p className="text-xs text-gray-500">Employer</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
