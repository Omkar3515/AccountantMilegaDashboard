import { useState } from "react";
import {
  Settings,
  MessageSquare,
  Send,
  CheckCircle2,
  Archive,
  Search,
  Filter,
  MoreVertical,
  Info,
  Paperclip,
  Smile,
  FileText,
  MessageCircle,
  Ban,
  Headset,
  ChevronRight,
  CheckCheck
} from "lucide-react";

export const initialChatList = [
  { id: 1, name: "Rahul Verma", time: "10:30 AM", msg: "Hello, I am interested in the Senior...", unread: 2, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 2, name: "Priya Singh", time: "Yesterday", msg: "Thank you for considering my application...", unread: 1, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 3, name: "Amit Kumar", time: "Yesterday", msg: "When will be the interview round?", unread: 0, initials: "AK", color: "bg-green-100 text-green-700" },
  { id: 4, name: "Sneha Patil", time: "20 May", msg: "Please share more details about the role.", unread: 0, initials: "SP", color: "bg-orange-100 text-orange-700" },
  { id: 5, name: "Vikram Joshi", time: "19 May", msg: "I have 5+ years of experience in audit...", unread: 1, initials: "VJ", color: "bg-blue-100 text-blue-700" },
  { id: 6, name: "Neha Sharma", time: "18 May", msg: "Looking forward to hearing from you.", unread: 0, initials: "NS", color: "bg-pink-100 text-pink-700" },
  { id: 7, name: "Rohit Mehta", time: "17 May", msg: "I am available for the interview.", unread: 0, avatar: "https://i.pravatar.cc/150?u=7" },
];

export const getUnreadMessagesCount = () => {
  return initialChatList.reduce((acc, chat) => acc + (chat.unread || 0), 0);
};

export default function EmployerMessages() {
  const [activeTab, setActiveTab] = useState("All (23)");
  const [chatList] = useState(initialChatList);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">
            <span className="hover:text-[#087A37] cursor-pointer">Dashboard</span>{" "}
            <span className="mx-1">›</span>
            <span className="text-gray-900 font-medium">Messages</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Communicate with candidates easily and manage all conversations.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-[#087A37] text-[#087A37] hover:bg-[#087A37]/5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Settings className="w-4 h-4" /> Message Settings
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#087A37]/10 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-[#087A37]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Conversations</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">23</span>
              <span className="text-xs text-gray-500 mb-1">All time</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Open Conversations</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">8</span>
              <span className="text-xs text-gray-500 mb-1">347 new messages</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Replied</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">12</span>
              <span className="text-xs text-gray-500 mb-1">52%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <Archive className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Archived</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">3</span>
              <span className="text-xs text-gray-500 mb-1">13%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

        {/* Chat Interface */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[700px]">

          {/* Left Column: Chat List */}
          <div className="w-full md:w-[320px] border-r border-gray-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                  />
                </div>
                <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-[#087A37] hover:bg-gray-50 transition-colors shrink-0">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex border-b border-gray-200">
              {["All (23)", "Unread (8)", "Archived (3)"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-semibold text-center relative ${activeTab === tab ? "text-[#087A37]" : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#087A37]" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {chatList.map((chat, idx) => (
                <div
                  key={chat.id}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors ${idx === 0 ? "bg-[#087A37]/5 border-l-2 border-[#087A37]" : "hover:bg-gray-50 border-b border-gray-50"}`}
                >
                  <div className="relative shrink-0">
                    {chat.avatar ? (
                      <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${chat.color}`}>
                        {chat.initials}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm truncate ${idx === 0 ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>{chat.name}</h4>
                      <span className={`text-[10px] ${chat.unread > 0 ? "text-[#087A37] font-semibold" : "text-gray-400"}`}>{chat.time}</span>
                    </div>
                    <p className={`text-xs truncate ${chat.unread > 0 ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                      {chat.msg}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[#087A37] text-white flex items-center justify-center text-[10px] font-bold shrink-0 self-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-[#087A37] text-xs font-semibold hover:underline flex items-center justify-center gap-1 w-full">
                View All Conversations <span className="text-[14px]">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
            {/* Chat Header */}
            <div className="h-[72px] px-6 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?u=2" alt="Rahul Verma" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    Rahul Verma
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1 text-[#087A37] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#087A37]"></span> Online
                    </span>
                    <span>Senior Accountant • 5+ Years Exp.</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
                <button className="hover:text-gray-600 transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-center">
                <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  20 May 2025
                </span>
              </div>

              {/* Received Message */}
              <div className="flex gap-3">
                <img src="https://i.pravatar.cc/150?u=2" alt="Rahul" className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
                <div className="max-w-[75%]">
                  <div className="bg-white border border-gray-200 text-gray-700 text-sm p-4 rounded-2xl rounded-tl-sm shadow-sm">
                    <p className="mb-2 font-medium">Hello,</p>
                    <p className="leading-relaxed">
                      I am interested in the Senior Accountant position at FinTax Solutions. Please let me know the next steps in the hiring process.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1.5 ml-1 block">10:30 AM</span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex gap-3 justify-end">
                <div className="max-w-[75%] flex flex-col items-end">
                  <div className="bg-[#087A37]/10 text-[#065d2a] border border-[#087A37]/20 text-sm p-4 rounded-2xl rounded-tr-sm">
                    <p className="mb-2 font-medium">Hi Rahul,</p>
                    <p className="leading-relaxed">
                      Thank you for your interest in the role. We have reviewed your application and would like to schedule a preliminary screening call.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 mr-1">
                    <span className="text-[10px] text-gray-400">10:35 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#087A37]" />
                  </div>
                </div>
              </div>

              {/* Received Message */}
              <div className="flex gap-3">
                <img src="https://i.pravatar.cc/150?u=2" alt="Rahul" className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
                <div className="max-w-[75%]">
                  <div className="bg-white border border-gray-200 text-gray-700 text-sm p-4 rounded-2xl rounded-tl-sm shadow-sm">
                    <p className="leading-relaxed">
                      Sure, that works for me. <br /> Please share the available time slots.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1.5 ml-1 block">10:38 AM</span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex gap-3 justify-end">
                <div className="max-w-[75%] flex flex-col items-end">
                  <div className="bg-[#087A37]/10 text-[#065d2a] border border-[#087A37]/20 text-sm p-4 rounded-2xl rounded-tr-sm">
                    <p className="leading-relaxed">
                      How about tomorrow between 11:00 AM - 1:00 PM? <br /> Please confirm a suitable time.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 mr-1">
                    <span className="text-[10px] text-gray-400">10:40 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#087A37]" />
                  </div>
                </div>
              </div>

            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                  <Smile className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#087A37]/20 focus:border-[#087A37]"
                  />
                </div>
                <button className="bg-[#087A37] hover:bg-[#06632c] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-[#087A37]/20 flex items-center gap-2">
                  Send
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Overview Chart */}

          {/* Overview Chart */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6">Messages Overview</h3>

            <div className="flex items-center justify-between gap-4">

              {/* Donut Chart */}
              <div className="relative w-24 h-24 shrink-0">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Background */}
                  <circle
                    className="text-gray-100 stroke-current"
                    strokeWidth="12"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />

                  {/* Open - Purple - 34.8% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#4F12E8"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${251.2 * 0.348} ${251.2}`}
                    strokeDashoffset="0"
                  />

                  {/* Replied - Green - 52.2% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${251.2 * 0.522} ${251.2}`}
                    strokeDashoffset={-(251.2 * 0.348)}
                  />

                  {/* Archived - Orange - 13% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F97316"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${251.2 * 0.13} ${251.2}`}
                    strokeDashoffset={-(251.2 * (0.348 + 0.522))}
                  />
                </svg>

                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white m-3 rounded-full">
                  <span className="text-xl font-bold text-gray-900">23</span>
                  <span className="text-[9px] font-semibold text-gray-500">
                    Total
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3 w-full">

                {/* Open */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F12E8]"></span>
                    <span className="text-gray-700 font-medium">
                      Open
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-900">
                      8
                    </span>
                    <span className="text-gray-400 w-10 text-right">
                      (34.8%)
                    </span>
                  </div>
                </div>

                {/* Replied */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                    <span className="text-gray-700 font-medium">
                      Replied
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-900">
                      12
                    </span>
                    <span className="text-gray-400 w-10 text-right">
                      (52.2%)
                    </span>
                  </div>
                </div>

                {/* Archived */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
                    <span className="text-gray-700 font-medium">
                      Archived
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-900">
                      3
                    </span>
                    <span className="text-gray-400 w-10 text-right">
                      (13.0%)
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#087A37]/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#087A37]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#087A37] transition-colors">Create Template</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Save time with message templates</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087A37] transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#087A37]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#087A37]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#087A37] transition-colors">Quick Replies</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Use pre-defined replies</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087A37] transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <Ban className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">Blocked Users</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Manage blocked candidates</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Messaging Tips */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Messaging Tips</h3>
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087A37] mt-0.5 shrink-0" />
                <span className="text-xs text-gray-700 font-medium">Respond promptly to candidates</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087A37] mt-0.5 shrink-0" />
                <span className="text-xs text-gray-700 font-medium">Keep your messages clear and concise</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087A37] mt-0.5 shrink-0" />
                <span className="text-xs text-gray-700 font-medium">Use templates for common queries</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087A37] mt-0.5 shrink-0" />
                <span className="text-xs text-gray-700 font-medium">Be professional and courteous</span>
              </div>
            </div>
            <button className="text-[#087A37] text-xs font-semibold hover:underline flex items-center gap-1">
              View All Tips <span className="text-lg leading-none mt-[-2px]">→</span>
            </button>
          </div>

          {/* Need Help */}
          <div className="bg-[#087A37]/5 border border-[#087A37]/10 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#087A37]/10 flex items-center justify-center">
                <Headset className="w-5 h-5 text-[#087A37]" />
              </div>
              <h3 className="font-bold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Learn how to manage conversations effectively.
            </p>
            <button className="text-[#087A37] font-semibold text-xs flex items-center gap-1.5 hover:gap-2 transition-all">
              Visit Help Center <span className="text-lg leading-none mt-[-2px]">→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}