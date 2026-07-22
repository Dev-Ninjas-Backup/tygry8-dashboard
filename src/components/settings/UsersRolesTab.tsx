"use client";

import React, { useState } from "react";
import { UserPlus, ChevronDown, X } from "lucide-react";

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  email: string;
  status: "Active" | "Pending";
  role: "Viewer" | "Admin" | "Analyst" | "Super Admin";
}

export const UsersRolesTab: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      initials: "AA",
      name: "Alex Admin",
      email: "alex@wiscohomebuyer.com",
      status: "Active",
      role: "Viewer",
    },
    {
      id: "2",
      initials: "PS",
      name: "Priya Shah",
      email: "priya@wiscohomebuyer.com",
      status: "Active",
      role: "Admin",
    },
    {
      id: "3",
      initials: "MW",
      name: "Marcus Williams",
      email: "marcus@wiscohomebuyer.com",
      status: "Active",
      role: "Analyst",
    },
    {
      id: "4",
      initials: "EW",
      name: "Erin Walsh",
      email: "erin@wiscohomebuyer.com",
      status: "Active",
      role: "Admin",
    },
  ]);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Viewer");
  const [inviteRoleDropdownOpen, setInviteRoleDropdownOpen] = useState(false);
  const [activeOpenDropdown, setActiveOpenDropdown] = useState<string | null>(
    null
  );

  const roleOptions: TeamMember["role"][] = ["Viewer", "Admin", "Analyst"];

  const handleRoleChange = (id: string, newRole: TeamMember["role"]) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
    setActiveOpenDropdown(null);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const namePart = inviteEmail.split("@")[0] || "New Member";
    const initials = namePart
      .split(".")
      .map((p) => p.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);

    const newMember: TeamMember = {
      id: String(Date.now()),
      initials: initials || "NM",
      name: namePart.replace(".", " "),
      email: inviteEmail,
      status: "Active",
      role: inviteRole,
    };

    setMembers([...members, newMember]);
    setInviteEmail("");
    setIsInviteOpen(false);
  };

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-8">
      {/* Top Header & Invite/Cancel Toggle Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Users & Roles
          </h3>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
            Give your team the right level of access to manage leads and property data.
          </p>
        </div>

        {isInviteOpen ? (
          <button
            onClick={() => setIsInviteOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0f2347] hover:bg-[#1a366b] dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl shadow-md transition-all self-start sm:self-auto"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        ) : (
          <button
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0f2347] hover:bg-[#1a366b] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-2xl shadow-md transition-all self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite team member</span>
          </button>
        )}
      </div>

      {/* Inline Invite Form Expanding Bar */}
      {isInviteOpen && (
        <form
          onSubmit={handleSendInvite}
          className="p-5 bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Work email input (6 cols) */}
            <div className="md:col-span-6">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Work email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Dropdown Selector (3 cols) */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Role
              </label>
              <button
                type="button"
                onClick={() =>
                  setInviteRoleDropdownOpen(!inviteRoleDropdownOpen)
                }
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all"
              >
                <span>{inviteRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {inviteRoleDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-30 space-y-1">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setInviteRole(opt);
                        setInviteRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        inviteRole === opt
                          ? "bg-[#0f2347] text-white dark:bg-blue-600"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Send Invite Button (3 cols) */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-[#0f2347] hover:bg-[#1a366b] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-2xl shadow-md transition-all"
              >
                Send Invite
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Team Member List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {members.map((member) => (
          <div
            key={member.id}
            className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            {/* Left: Initials Avatar, Name, Active Badge, Email */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#0b1424] text-white flex items-center justify-center font-extrabold text-xs tracking-wider shrink-0 shadow-xs">
                {member.initials}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full">
                    {member.status}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                  {member.email}
                </p>
              </div>
            </div>

            {/* Right: Custom Role Selector Dropdown */}
            <div className="relative self-end sm:self-auto">
              <button
                onClick={() =>
                  setActiveOpenDropdown(
                    activeOpenDropdown === member.id ? null : member.id
                  )
                }
                className="flex items-center justify-between gap-3 w-32 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xs transition-all"
              >
                <span>{member.role}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeOpenDropdown === member.id && (
                <div className="absolute right-0 mt-2 w-36 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-20 space-y-1">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleRoleChange(member.id, opt)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        member.role === opt
                          ? "bg-[#0f2347] text-white dark:bg-blue-600"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
