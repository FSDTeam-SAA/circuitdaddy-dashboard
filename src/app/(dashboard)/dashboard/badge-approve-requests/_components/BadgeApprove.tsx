
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useSession } from "next-auth/react";
import { useApproveLevel, useGetAllLevelRequest } from "@/hooks/apiCalling";

import { useState } from "react";
import Image from "next/image";

export default function BadgeApprove() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<null | any>(null);
  const [isOpen, setIsOpen] = useState(false);

  // API Calls
  const { data: levelData, isLoading } = useGetAllLevelRequest(token);
  const users = levelData?.data || [];

  const approveRequest = useApproveLevel(token);

  const handleAccept = (userId: string) => {
    approveRequest.mutate({ userId });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (user: any) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Profession</TableHead>
            <TableHead className="text-center">Current Level</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell><Skeleton className="h-5 w-36" /></TableCell>
                <TableCell><Skeleton className="h-5 w-36" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              </TableRow>
            ))
            : users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.professionTitle}</TableCell>
                <TableCell className="text-center">{user.level}</TableCell>

                <TableCell className="flex gap-2 items-center justify-center">
                  {/* VIEW BUTTON */}
                  <Button
                    variant="outline"
                    onClick={() => handleView(user)}
                  >
                    View
                  </Button>

                  {/* ACCEPT BUTTON */}
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAccept(user._id)}
                  >
                    Accept
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>


      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl rounded-xl shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">User Badge Request Details</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">

              {/* PROFILE */}
              <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-lg border">
                <Image
                  width={100}
                  height={100}
                  src={selectedUser.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <p className="text-gray-700 font-medium">{selectedUser.professionTitle}</p>
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div className="grid grid-cols-2 gap-5 bg-white p-4 rounded-lg border shadow-sm">
                <div className="space-y-1">
                  <p><strong>Experience:</strong> {selectedUser.experience} years</p>
                  <p><strong>Location:</strong> {selectedUser.location}</p>
                  <p><strong>Rate:</strong> ${selectedUser.rate}/hr</p>
                  <p><strong>Completed Projects:</strong> {selectedUser.completedProjectsCount}</p>
                  <p><strong>User Status:</strong> {selectedUser.userstatus}</p>
                </div>

                <div className="space-y-2">
                  <h2 className="font-semibold text-lg">Skills</h2>
                  <ul className="list-disc ml-5 text-gray-800">
                    {selectedUser.skills?.map((skill: string[], i: number) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>

                  <h2 className="font-semibold text-lg mt-4">GitHub</h2>
                  <a
                    href={selectedUser.gitHubLink}
                    target="_blank"
                    className="text-blue-600 underline break-all"
                  >
                    {selectedUser.gitHubLink}
                  </a>
                </div>
              </div>

              {/* BADGE IMAGES */}
              {selectedUser?.badgeRequest && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h2 className="font-semibold text-lg mb-3">
                    Requested Badge: {selectedUser?.badgeRequest?.name}
                  </h2>

                  <div className="flex gap-4 flex-wrap">
                    {selectedUser?.badgeRequest?.badge?.map((img: string, i: number) => (
                      <Image
                        width={200}
                        height={200}
                        key={i}
                        src={img}
                        alt="Badge"
                        className="w-24 h-24 rounded-lg object-cover shadow-sm border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* DOCUMENTS */}
              <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
                <h2 className="font-semibold text-lg">Documents</h2>

                <div>
                  <p className="font-medium">CV:</p>
                  <a
                    href={selectedUser.cv}
                    target="_blank"
                    className="text-blue-600 underline break-all"
                  >
                    Download CV
                  </a>
                </div>

                <div>
                  <p className="font-medium">Certifications:</p>
                  <a
                    href={selectedUser.certifications}
                    target="_blank"
                    className="text-blue-600 underline break-all"
                  >
                    View Certifications
                  </a>
                </div>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
