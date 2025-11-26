// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   FolderOpen,
//   ImageIcon,
//   LogOut,
//   User2,
//   Award,
//   ClipboardList,
//   LayoutPanelLeft,
//   Settings,
// } from "lucide-react";
// import Image from "next/image";


// const navigation = [
//   { name: "Dashboard Overview", href: "/dashboard", icon: LayoutPanelLeft },
//   { name: "User Management", href: "/dashboard/user-management", icon: User2 },
//   { name: "Team & Badge Approvals", href: "/dashboard/team-badge", icon: Award },
//   { name: "Services", href: "/dashboard/services", icon: ClipboardList },
//   { name: "Industries", href: "/dashboard/industries", icon: FolderOpen },
//   { name: "Blog & FAQ CMS", href: "/dashboard/blog", icon: ImageIcon },
//   { name: "Settings", href: "/dashboard/setting", icon: Settings },

// ];

// export function DashboardSidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col w-[350px] bg-card border-r border-border h-screen">
//       <div className="px-6">
//         <Image src="/logo.png" alt="logo" width={700} height={700} />
//       </div>
//       <div className="flex items-center justify-center mb-10">
//         <Image src="/profile.jpg" alt="logo" width={700} height={700} className="w-20 h-20 rounded-full" />
//       </div>
//       <nav className="flex-1 scrollbar-none px-4 space-y-[24px] overflow-y-auto">
//         {navigation.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center px-2 py-3 text-[16px] font-medium rounded-md transition-colors",
//                 isActive
//                   ? "bg-[#00383B] text-white"
//                   : "text-muted-foreground hover:text-foreground hover:bg-muted"
//               )}
//             >
//               <item.icon className="mr-3 h-6 w-6" />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//       <button
//         className="flex items-center px-3 py-2 m-4 text-sm font-medium rounded-md text-[#E5102E] hover:text-[#E5102E] hover:bg-muted transition-colors"
//         type="button"
//       >
//         <LogOut className="mr-3 h-4 w-4" />
//         Logout
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FolderOpen,
  ImageIcon,
  LogOut,
  User2,
  Award,
  ClipboardList,
  LayoutPanelLeft,
  Settings,
  CircleFadingArrowUp,
} from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard Overview", href: "/dashboard", icon: LayoutPanelLeft },
  { name: "User Management", href: "/dashboard/user-management", icon: User2 },
  { name: "Team & Badge Approvals", href: "/dashboard/team-badge", icon: Award },
  { name: "Services", href: "/dashboard/services", icon: ClipboardList },
  { name: "Industries", href: "/dashboard/industries", icon: FolderOpen },
  { name: "Blog & FAQ CMS", href: "/dashboard/blog", icon: ImageIcon },
  { name: "Level approve requests", href: "/dashboard/level-approve-requests", icon: CircleFadingArrowUp },
  { name: "Badge approve requests", href: "/dashboard/badge-approve-requests", icon: CircleFadingArrowUp },
  { name: "Settings", href: "/dashboard/setting", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Example logout handler (replace with your own logic)
  const handleLogout = () => {
    setOpen(false);
    // Example: if using NextAuth
    signOut({ callbackUrl: "/" });
    console.log("User logged out");
  };

  return (
    <div className="flex flex-col w-[350px] bg-card border-r border-border h-screen">
      <div className="px-6 py-4">
        <Image src="/logo.png" alt="logo" width={700} height={700} />
      </div>

      {/* <div className="flex items-center justify-center mb-10">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div> */}

      <nav className="flex-1 scrollbar-none px-4 space-y-[24px] overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-3 text-[16px] font-medium rounded-md transition-colors",
                isActive
                  ? "bg-[#00383B] text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center px-3 py-2 m-4 text-sm font-medium rounded-md text-[#E5102E] hover:text-[#E5102E] hover:bg-muted transition-colors"
        type="button"
      >
        <LogOut className="mr-3 h-4 w-4" />
        Logout
      </button>

      {/* Logout confirmation modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to log out? You’ll need to log in again to access your dashboard.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
