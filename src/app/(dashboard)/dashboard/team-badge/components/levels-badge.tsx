import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const LevelsBadge = () => {
  return (
    <div>
      <div className="text-end mb-8">
        <Button className="bg-[#03383b] hover:bg-[#02292b]">
          <Plus />
          Create Level
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="shadow-lg bg-white p-5 rounded-md border border-gray-200 space-y-8"
          >
            <div>
              <h1 className="font-bold text-xl">Levels & Badges</h1>
            </div>

            <div className="flex items-center justify-between opacity-60">
              <div>
                <h1>Level Name: 01</h1>
              </div>

              <div className="flex items-center gap-5">
                <div>
                  <h1>Level Badge:</h1>
                </div>

                <div>
                  <Image
                    src={"/levels-badge.png"}
                    alt="levels-badge.png"
                    width={1000}
                    height={1000}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelsBadge;
