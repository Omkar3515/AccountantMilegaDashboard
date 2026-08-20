import { useState } from "react";
import {
  Upload,
  Trash2,
  User,
  Bell,
  Shield,
  Users,
  ChevronRight,
  Headset,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function EmployerSettings() {
  const [activeTab, setActiveTab] = useState("Company Profile");

  const tabs = [
    "Company Profile",
    "Account Settings",
    "Notification Settings",
    "Password & Security",
    "Users & Permissions",
  ];

  const quickSettings = [
    {
      title: "Account Settings",
      description: "Update your login & account details",
      icon: User,
      tab: "Account Settings",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "group-hover:text-blue-600",
    },
    {
      title: "Notifications",
      description: "Manage email & alert preferences",
      icon: Bell,
      tab: "Notification Settings",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      hoverColor: "group-hover:text-amber-600",
    },
    {
      title: "Password & Security",
      description: "Change password & enable 2FA",
      icon: Shield,
      tab: "Password & Security",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      hoverColor: "group-hover:text-red-600",
    },
    {
      title: "Users & Permissions",
      description: "Manage team members & roles",
      icon: Users,
      tab: "Users & Permissions",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverColor: "group-hover:text-purple-600",
    },
  ];

  return (
    <div className="max-w-[1220px] mx-auto space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500 mb-2">
          <span className="hover:text-[#087A37] cursor-pointer">
            Dashboard
          </span>{" "}
          <span className="mx-1">›</span>
          <span className="text-gray-900 font-medium">Settings</span>
        </p>

        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your account, company and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        {/* ================= MAIN CONTENT ================= */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-4 text-sm font-semibold transition-colors relative ${activeTab === tab
                    ? "text-[#087A37]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {tab}

                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#087A37]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Company Profile" && (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Form */}
                <div className="flex-1 space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Company Information
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 mb-5">
                      Update your company details which will be visible to
                      candidates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company Name
                      </label>

                      <input
                        type="text"
                        defaultValue="FinTax Solutions Pvt. Ltd."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                      />
                    </div>

                    {/* Company Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company Email
                      </label>

                      <input
                        type="email"
                        defaultValue="hr@fintaxsolutions.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Industry
                      </label>

                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37] appearance-none bg-white">
                        <option>Accounting / Finance</option>
                        <option>Technology</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company Phone
                      </label>

                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                      />
                    </div>

                    {/* Company Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company Size
                      </label>

                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37] appearance-none bg-white">
                        <option>1 - 10 Employees</option>
                        <option>11 - 50 Employees</option>
                        <option>51 - 200 Employees</option>
                        <option>201 - 500 Employees</option>
                        <option>500+ Employees</option>
                      </select>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Website
                      </label>

                      <input
                        type="url"
                        defaultValue="https://www.fintaxsolutions.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                      />
                    </div>

                    {/* Founded */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Founded Year
                      </label>

                      <input
                        type="text"
                        defaultValue="2018"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company Location
                      </label>

                      <input
                        type="text"
                        defaultValue="Mumbai, Maharashtra, India"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company Description
                    </label>

                    <textarea
                      rows={4}
                      defaultValue="FinTax Solutions Pvt. Ltd. is a leading financial and accounting solutions provider. We help businesses with taxation, compliance, auditing and financial advisory services. Our mission is to deliver accurate, reliable and technology-driven solutions."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37] resize-none"
                    />
                  </div>

                  {/* Save */}
                  <div className="pt-2">
                    <button className="bg-[#087A37] hover:bg-[#06632c] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-gray-100 self-stretch" />

                {/* Logo */}
                <div className="w-full lg:w-[280px] shrink-0 flex flex-col items-center">
                  <div className="w-full text-left">
                    <h2 className="text-lg font-bold text-gray-900">
                      Company Logo
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 mb-5 leading-relaxed">
                      Upload your company logo. Recommended size 300x300px,
                      JPG/PNG.
                    </p>
                  </div>

                  <div className="w-full aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="flex text-[40px] font-bold tracking-tighter mb-2">
                        <span className="text-blue-900">F</span>
                        <span className="text-green-600">T</span>
                      </div>

                      <div className="text-center font-bold leading-tight">
                        <div className="text-blue-900 text-lg">FinTax</div>
                        <div className="text-green-600 text-[10px] tracking-widest">
                          SOLUTIONS
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 border border-[#087A37] text-[#087A37] hover:bg-[#087A37]/5 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                      <Upload size={16} strokeWidth={2} />
                      Change Logo
                    </button>

                    <button className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                      <Trash2 size={16} strokeWidth={2} />
                      Remove Logo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs */}
            {activeTab !== "Company Profile" && (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab}
                </h3>

                <p className="text-gray-500">
                  This section is under construction.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6">
              Profile Completion
            </h3>

            <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-6">
              {/* Progress Circle */}
              <div className="relative w-32 h-32 shrink-0">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-gray-100 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />

                  <circle
                    className="text-[#087A37] stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 85) / 100}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    85%
                  </span>

                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Completed
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <div className="w-full space-y-3">
                {[
                  "Company Information",
                  "Company Logo",
                  "Company Description",
                  "Industry Details",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.2}
                      className="text-[#087A37]"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}

                <div className="flex items-center gap-2.5">
                  <Circle
                    size={16}
                    strokeWidth={2}
                    className="text-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-500">
                    Team Members
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= QUICK SETTINGS ================= */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4">
              Quick Settings
            </h3>

            <div className="space-y-1">
              {quickSettings.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    onClick={() => setActiveTab(item.tab)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* COLORFUL ICON */}
                      <div
                        className={`w-9 h-9 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={2}
                          className={item.iconColor}
                        />
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold text-gray-900 transition-colors ${item.hoverColor}`}
                        >
                          {item.title}
                        </p>

                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                      className={`text-gray-400 transition-colors ${item.hoverColor}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= NEED HELP ================= */}
          <div className="bg-brand-light border border-[#6D28D9]/10 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center">
                <Headset
                  size={20}
                  strokeWidth={2}
                  className="text-[#087A37]"
                />
              </div>

              <h3 className="font-bold text-gray-900">
                Need Help?
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Need help with your account settings? Our support team is here
              to assist you.
            </p>

            <button className="text-[#087A37] font-semibold text-sm flex items-center gap-1.5 hover:gap-2 transition-all">
              Visit Help Center
              <span className="text-lg leading-none mt-[-2px]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}