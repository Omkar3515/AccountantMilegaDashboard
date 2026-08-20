// import React, { useState, useEffect } from "react";
// import { Bell, ChevronDown, LogOut, Mail, Menu, Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { getStoredUser, getInitials, logoutUser, type UserProfile } from "../../services/authService";

// interface CandidateHeaderProps {
//   onToggleSidebar?: () => void;
// }

// const CandidateHeader: React.FC<CandidateHeaderProps> = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     setUser(getStoredUser());
//   }, []);

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   const displayName = user?.fullName || "Rahul Sharma";
//   const initials = getInitials(displayName);
//   const roleName = user?.role || "Candidate";

//   return (
//     <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-7 flex justify-between items-center sticky top-0 z-30">
//       <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-2xl">
//         <button
//           onClick={onToggleSidebar}
//           className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden cursor-pointer"
//           aria-label="Toggle Navigation Menu"
//         >
//           <Menu className="w-5 h-5" />
//         </button>

//         {/* Search Bar */}
//         <div className="relative w-full max-w-md hidden sm:block">
//           <Search className="w-4 h-4 text-slate-400 absolute left-3 top.1/2 -translate-y-1/2" />
//           <input
//             type="text"
//             placeholder="Search jobs, companies, skills..."
//             className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
//           />
//         </div>
//       </div>

//       {/* Right actions & Profile */}
//       <div className="flex items-center gap-3 sm:gap-5">
//         {/* Mobile search trigger */}
//         <button className="sm:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
//           <Search className="w-5 h-5" />
//         </button>

//         {/* Notifications */}
//         <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" aria-label="Notifications">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold grid place-items-center rounded-full bg-[#635bff] text-white">
//             4
//           </span>
//         </button>

//         {/* Messages */}
//         <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" aria-label="Messages">
//           <Mail className="w-5 h-5" />
//           <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold grid place-items-center rounded-full bg-[#635bff] text-white">
//             3
//           </span>
//         </button>

//         <div className="h-6 w-px bg-slate-200" />

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <div
//             className="flex items-center gap-2.5 cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition-colors"
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-800 via-indigo-900 to-blue-600 text-white grid place-items-center font-bold text-xs shadow-sm ring-2 ring-indigo-50">
//               {initials}
//             </div>
//             <div className="hidden sm:block text-left">
//               <p className="text-xs font-bold text-slate-900 leading-tight">{displayName}</p>
//               <p className="text-[11px] text-slate-500 capitalize leading-tight">{roleName}</p>
//             </div>
//             <ChevronDown className="w-4 h-4 text-slate-400" />
//           </div>

//           {showDropdown && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
//               <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
//                 <p className="text-xs font-bold text-slate-900">{displayName}</p>
//                 <p className="text-[11px] text-slate-500 capitalize">{roleName}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
//               >
//                 <LogOut className="w-4 h-4" /> Log out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default CandidateHeader;
