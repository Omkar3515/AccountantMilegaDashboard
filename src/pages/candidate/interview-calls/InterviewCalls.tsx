import React, { useState } from "react";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Calendar,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Lightbulb,
  MapPin,
  MoreVertical,
  Plus,
  Sparkles,
  Star,
  Video,
  X,
} from "lucide-react";

export interface UpcomingInterview {
  id: string;
  initials: string;
  color: string;
  company: string;
  position: string;
  location: string;
  experience: string;
  dateStr: string;
  timeStr: string;
  platform: "Google Meet" | "Microsoft Teams" | "Zoom";
  meetingLink: string;
  status: "Confirmed" | "Rescheduled" | "Pending";
  daysLeft: string;
  calendarDay: number;
}

export interface PastInterview {
  id: string;
  initials: string;
  color: string;
  company: string;
  position: string;
  dateStr: string;
  timeStr: string;
  status: "Completed" | "Cancelled";
  rating: number; // e.g. 4 for 4 stars
  feedbackText: string;
}

const initialUpcoming: UpcomingInterview[] = [
  {
    id: "1",
    initials: "CA",
    color: "bg-blue-700 text-white",
    company: "Sharma & Co.",
    position: "Senior Accountant",
    location: "Mumbai, Maharashtra",
    experience: "4 - 6 Yrs Experience",
    dateStr: "24 May 2025 (Saturday)",
    timeStr: "10:00 AM - 11:00 AM",
    platform: "Google Meet",
    meetingLink: "meet.google.com/abc-defg-hij",
    status: "Confirmed",
    daysLeft: "In 2 Days",
    calendarDay: 24,
  },
  {
    id: "2",
    initials: "FinTax",
    color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    company: "Fintax Solutions Pvt. Ltd.",
    position: "Tax Executive",
    location: "Pune, Maharashtra",
    experience: "2 - 4 Yrs Experience",
    dateStr: "26 May 2025 (Monday)",
    timeStr: "02:30 PM - 03:30 PM",
    platform: "Google Meet",
    meetingLink: "meet.google.com/xyz-abcd-123",
    status: "Confirmed",
    daysLeft: "In 4 Days",
    calendarDay: 26,
  },
  {
    id: "3",
    initials: "SK",
    color: "bg-amber-500 text-white",
    company: "SK Enterprises",
    position: "Accounts Executive",
    location: "Nagpur, Maharashtra",
    experience: "2 - 5 Yrs Experience",
    dateStr: "28 May 2025 (Wednesday)",
    timeStr: "11:00 AM - 12:00 PM",
    platform: "Microsoft Teams",
    meetingLink: "teams.microsoft.com/l/meetup-join/...",
    status: "Rescheduled",
    daysLeft: "In 6 Days",
    calendarDay: 28,
  },
];

const initialPast: PastInterview[] = [
  {
    id: "p1",
    initials: "AG",
    color: "bg-violet-50 text-violet-700 border border-violet-200",
    company: "AG Financial Services",
    position: "Junior Accountant",
    dateStr: "20 May 2025",
    timeStr: "10:00 AM - 11:00 AM",
    status: "Completed",
    rating: 4,
    feedbackText: "Good Interview",
  },
];

interface InterviewCallsProps {
  onNavigate?: (page: string) => void;
}

const InterviewCalls: React.FC<InterviewCallsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    "Upcoming" | "Scheduled" | "Completed" | "Cancelled"
  >("Upcoming");
  const [upcomingList] = useState<UpcomingInterview[]>(initialUpcoming);
  const [pastList] = useState<PastInterview[]>(initialPast);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<UpcomingInterview | null>(null);

  return (
    <div className="interview-calls-page max-w-[1220px] mx-auto font-sans text-slate-900">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
        <button
          onClick={() => onNavigate && onNavigate("dashboard")}
          className="hover:text-blue-700 transition-colors"
        >
          Dashboard
        </button>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Interview Calls</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Interview Calls
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Stay updated with your upcoming and past interview schedules.
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowCalendarModal(true)}
            className="border border-blue-700 text-blue-700 hover:bg-blue-50 bg-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-blue-700" />
            Add to Calendar
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 mt-6 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab("Upcoming")}
          className={`pb-3 relative transition-colors ${
            activeTab === "Upcoming"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Upcoming ({upcomingList.length})
        </button>
        <button
          onClick={() => setActiveTab("Scheduled")}
          className={`pb-3 relative transition-colors ${
            activeTab === "Scheduled"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Scheduled (0)
        </button>
        <button
          onClick={() => setActiveTab("Completed")}
          className={`pb-3 relative transition-colors ${
            activeTab === "Completed"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Completed (4)
        </button>
        <button
          onClick={() => setActiveTab("Cancelled")}
          className={`pb-3 relative transition-colors ${
            activeTab === "Cancelled"
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Cancelled (1)
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_295px] gap-6 mt-6">
        {/* Left Column: Upcoming Cards & Past Table */}
        <div className="min-w-0 space-y-4">
          {/* Upcoming Interview Cards List */}
          {activeTab === "Upcoming" && (
            <div className="space-y-4">
              {upcomingList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  {/* Left: Avatar + Details */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl grid place-items-center font-bold text-sm shrink-0 shadow-sm ${item.color}`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base text-slate-900 truncate">
                        {item.company}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {item.position}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {item.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Date & Time & Platform */}
                  <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center min-w-[210px]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{item.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.timeStr}</span>
                    </div>
                    <div className="mt-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <Video className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.platform}</span>
                      </div>
                      <a
                        href={`https://${item.meetingLink}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-blue-600 hover:underline block truncate mt-0.5 font-medium"
                      >
                        {item.meetingLink}
                      </a>
                    </div>
                  </div>

                  {/* Right: Status, Reminder & View Details button */}
                  <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-0.5 rounded-full ${
                          item.status === "Rescheduled"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        }`}
                      >
                        {item.status}
                      </span>
                      <button
                        title="More Options"
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <button className="text-xs text-blue-700 font-semibold flex items-center gap-1 hover:underline mt-2">
                      <Bell className="w-3.5 h-3.5 text-blue-700" />
                      Set Reminder
                    </button>

                    <button
                      onClick={() => setSelectedInterview(item)}
                      className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors mt-3 w-full md:w-auto text-center"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab !== "Upcoming" && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No {activeTab.toLowerCase()} interviews found</p>
              <p className="text-xs text-slate-400 mt-1">Check upcoming interviews tab for active schedules.</p>
            </div>
          )}

          {/* Past Interviews Table Section */}
          <div className="pt-4">
            <h2 className="text-base font-bold text-slate-900 mb-3">Past Interviews</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">Company</th>
                      <th className="py-3 px-3 font-semibold">Position</th>
                      <th className="py-3 px-3 font-semibold">Date & Time</th>
                      <th className="py-3 px-3 font-semibold">Status</th>
                      <th className="py-3 px-3 font-semibold">Feedback</th>
                      <th className="py-3 px-4 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {pastList.map((past) => (
                      <tr key={past.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg grid place-items-center font-bold text-xs shrink-0 ${past.color}`}
                            >
                              {past.initials}
                            </div>
                            <span className="font-bold text-slate-900 text-xs truncate">
                              {past.company}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 align-middle text-slate-700 font-medium">
                          {past.position}
                        </td>

                        <td className="py-3.5 px-3 align-middle">
                          <p className="text-slate-800 font-medium text-[11px]">{past.dateStr}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{past.timeStr}</p>
                        </td>

                        <td className="py-3.5 px-3 align-middle whitespace-nowrap">
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                            {past.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 align-middle">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[1, 2, 3, 4].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                            <Star className="w-3 h-3 text-slate-300" />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                            {past.feedbackText}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap">
                          <button className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors">
                            View Feedback
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="border border-slate-200 bg-white hover:bg-slate-50 text-blue-700 rounded-xl px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-700" />
                View All Completed Interviews
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <aside className="w-full space-y-5 min-w-0">
          {/* Upcoming Interviews Mini Widget */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-sm text-slate-900">Upcoming Interviews</h2>
              <button
                onClick={() => setShowCalendarModal(true)}
                className="text-xs text-blue-700 font-semibold hover:underline"
              >
                View Calendar
              </button>
            </div>

            <div className="space-y-3.5">
              {upcomingList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg grid place-items-center font-bold text-xs shrink-0 ${item.color}`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">
                        {item.company}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {item.dateStr.split(" ")[0]} {item.dateStr.split(" ")[1]}, {item.timeStr.split(" - ")[0]}
                      </p>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100 whitespace-nowrap shrink-0">
                    {item.daysLeft}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Calendar Widget */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-sm text-slate-900 mb-2">Calendar</h2>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 my-2">
              <span>May 2025</span>
              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-1 hover:text-slate-600 rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:text-slate-600 rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-[10px] text-slate-400 font-semibold mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-700 gap-y-1.5">
              {[27, 28, 29, 30, 1, 2, 3].map((d) => (
                <span key={`prev-${d}`} className="text-slate-300 py-1">
                  {d}
                </span>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const is24 = day === 24;
                const is26 = day === 26;
                const is28 = day === 28;

                return (
                  <div key={day} className="py-0.5 flex justify-center items-center">
                    <span
                      className={`w-6 h-6 rounded-full text-xs grid place-items-center ${
                        is24
                          ? "bg-blue-700 text-white font-bold shadow-sm"
                          : is26
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : is28
                          ? "bg-amber-500 text-white font-bold shadow-sm"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Interview Tips Card */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
              <Lightbulb className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Interview Tips</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Join the interview 5-10 minutes early.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Check your internet and device.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Keep your resume handy.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dress professionally and stay confident.</span>
              </li>
            </ul>

            <button className="text-blue-700 hover:text-blue-800 text-xs font-bold mt-4 flex items-center gap-1 transition-colors">
              View More Tips <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>
        </aside>
      </div>

      {/* Details / Calendar Modal */}
      {(showCalendarModal || selectedInterview) && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => {
                setShowCalendarModal(false);
                setSelectedInterview(null);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 grid place-items-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {selectedInterview ? selectedInterview.company : "Calendar Schedule"}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedInterview ? selectedInterview.position : "Upcoming interviews for May 2025"}
                </p>
              </div>
            </div>

            {selectedInterview ? (
              <div className="space-y-3 text-xs text-slate-700">
                <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-100">
                  <p><span className="font-semibold text-slate-900">Date:</span> {selectedInterview.dateStr}</p>
                  <p><span className="font-semibold text-slate-900">Time:</span> {selectedInterview.timeStr}</p>
                  <p><span className="font-semibold text-slate-900">Platform:</span> {selectedInterview.platform}</p>
                  <p><span className="font-semibold text-slate-900">Location:</span> {selectedInterview.location}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meeting Link
                  </label>
                  <a
                    href={`https://${selectedInterview.meetingLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 font-semibold hover:underline flex items-center gap-1 text-xs"
                  >
                    https://{selectedInterview.meetingLink} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                You have 3 interviews scheduled in May 2025: Sharma &amp; Co. (24 May), Fintax Solutions (26 May), and SK Enterprises (28 May).
              </p>
            )}

            <div className="pt-5 flex justify-end">
              <button
                onClick={() => {
                  setShowCalendarModal(false);
                  setSelectedInterview(null);
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-5 py-2 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewCalls;
