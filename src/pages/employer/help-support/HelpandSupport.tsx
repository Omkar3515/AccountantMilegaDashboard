import { useState } from "react";
import {
  BookOpen,
  MessageSquare,
  HelpCircle,
  PlayCircle,
  Search,
  Headset,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

export default function EmployerHelpAndSupport({ setPage }: { setPage?: (page: string) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const topCards = [
    {
      id: "help-center",
      title: "Help Center",
      description: "Browse articles and guides on using AccountantMilega.",
      linkText: "View Articles",
      icon: BookOpen,
      iconColor: "text-[#087A37]",
      iconBg: "bg-violet-100",
    },
    {
      id: "contact",
      title: "Contact Support",
      description: "Raise a ticket and our team will get back to you.",
      linkText: "Raise a Ticket",
      icon: MessageSquare,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Find quick answers to common questions.",
      linkText: "View FAQs",
      icon: HelpCircle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-100",
    },
    {
      id: "video",
      title: "Video Tutorials",
      description: "Watch step-by-step videos to learn and get started.",
      linkText: "Watch Now",
      icon: PlayCircle,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
  ];

  const faqs = [
    {
      id: 0,
      question: "How do I post a job on AccountantMilega?",
      answer: "You can post a job by going to Manage Jobs → Create Job and fill in the required details.",
    },
    {
      id: 1,
      question: "How can I view and manage applications?",
      answer: "All applications are available under the Applications section. You can filter, shortlist or reject candidates.",
    },
    {
      id: 2,
      question: "Can I schedule interviews with candidates?",
      answer: "Yes, you can schedule interviews from the Interview Scheduler section.",
    },
    {
      id: 3,
      question: "How does the subscription plan work?",
      answer: "You can choose a plan based on your hiring needs. You can upgrade, downgrade or cancel anytime.",
    },
    {
      id: 4,
      question: "How can I update my company profile?",
      answer: "Go to Settings → Company Profile to update your company details, logo and more.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8 animate-in fade-in duration-500">
      <div>
        <p className="text-sm text-gray-500 mb-2">
          <span className="hover:text-[#087A37] cursor-pointer" onClick={() => setPage && setPage('dashboard')}>
            Dashboard
          </span>{" "}
          <span className="mx-1">›</span>
          <span className="text-gray-900 font-medium">Help & Support</span>
        </p>

        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-sm text-gray-500 mt-1">
          We're here to help you. Find answers or get in touch with our support team.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topCards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex flex-col items-start hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconBg} mb-4`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <h3 className="font-bold text-gray-900 text-[15px] mb-2">{card.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-grow">
              {card.description}
            </p>
            <div className="mt-5 text-[#087A37] font-semibold text-sm flex items-center hover:gap-1.5 transition-all gap-1">
              {card.linkText} <span className="text-lg leading-none mt-[-2px]">→</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Left Column - FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                  <option>All Categories</option>
                  <option>Jobs</option>
                  <option>Billing</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 w-full sm:w-48"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={`border-gray-100 ${index !== faqs.length - 1 ? 'border-b' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-5 pt-0 text-sm text-gray-500 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <button className="border border-violet-200 text-[#087A37] bg-white hover:bg-violet-50 font-semibold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-colors">
              View All FAQs <span className="text-lg leading-none mt-[-2px]">→</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Contact Support */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 relative overflow-hidden">
            <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center mb-4">
               <Headset className="w-6 h-6 text-[#087A37]" />
            </div>
            
            <h3 className="font-bold text-gray-900 text-base mb-1">Contact Support</h3>
            <p className="text-sm text-gray-500 mb-6">
              Our support team is available to assist you.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#087A37]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Email</p>
                  <p className="text-xs text-gray-500 mt-0.5">support@accountantmilega.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#087A37]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Phone</p>
                  <p className="text-xs text-gray-500 mt-0.5">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#087A37]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Live Chat</p>
                  <p className="text-xs text-gray-500 mt-0.5">Available Mon - Sat (10 AM - 7 PM)</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#087A37] hover:bg-violet-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-sm shadow-[#087A37]/20">
              Raise a Support Ticket
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 text-base mb-4">Quick Links</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#087A37] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-violet-50 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-[#087A37]" />
                  </div>
                  <span className="font-medium">Help Center</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087A37]" />
              </button>
              
              <button className="w-full flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#087A37] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-violet-50 flex items-center justify-center">
                    <PlayCircle className="w-3.5 h-3.5 text-[#087A37]" />
                  </div>
                  <span className="font-medium">Video Tutorials</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087A37]" />
              </button>

              <button className="w-full flex items-center justify-between py-2 text-sm text-gray-700 transition-colors group cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-violet-50 flex items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5 text-[#087A37]" />
                  </div>
                  <span className="font-medium">System Status</span>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  All Systems Operational
                </span>
              </button>

              <button className="w-full flex items-center justify-between py-2 text-sm text-gray-700 hover:text-[#087A37] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-violet-50 flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5 text-[#087A37]" />
                  </div>
                  <span className="font-medium">Feature Requests</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087A37]" />
              </button>
            </div>
          </div>
          
          {/* Need more help */}
          <div className="bg-brand-light border border-violet-100 rounded-xl shadow-sm p-5 relative overflow-hidden flex items-start gap-4">
             <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-[#087A37]" />
             </div>
             <div>
                <h3 className="font-bold text-gray-900 text-sm">Can't find what you need?</h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Our support team is here to help you with any questions or issues.
                </p>
                <button className="text-[#087A37] font-semibold text-xs mt-3 flex items-center gap-1 hover:gap-1.5 transition-all">
                  Contact Support <span className="text-lg leading-none mt-[-2px]">→</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}