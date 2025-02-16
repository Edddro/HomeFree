'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";

export default function InstancePage() {
  const [profiles, setProfiles] = useState([
    { name: "Edward D.", image: "/profile1.jpg" },
    { name: "Krishna C.", image: "/profile2.jpg" },
    { name: "Elizabeth W.", image: "/profile3.jpg" },
  ]);

  const handleProfileUpdate = (index: number, newName: string) => {
    setProfiles((prevProfiles) => {
      const updatedProfiles = [...prevProfiles];
      updatedProfiles[index].name = newName;
      return updatedProfiles;
    });
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-4">
        {profiles.map((profile, index) => (
          <Popover key={index}>
            <PopoverTrigger>
              <div className="flex flex-col items-center cursor-pointer">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="text-sm">{profile.name}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-4 space-y-2">
              <label className="block text-sm font-medium">Name</label>
              <Input
                defaultValue={profile.name}
                className="mt-1"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button className="mt-2 w-full" onClick={() => handleProfileUpdate(index, inputValue)}>Save</Button>
            </PopoverContent>
          </Popover>
        ))}
        <div className="flex flex-col items-center">
          <button className="w-12 h-12 flex items-center justify-center border rounded-lg text-2xl">+</button>
          <span className="text-sm">Add Friends</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input placeholder="HomeFree" className="mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input type="email" placeholder="example@gmail.com" className="mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <Input type="tel" placeholder="+1 416-000-000" className="mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <Input type="password" placeholder="********" className="mt-1" />
        </div>
      </div>

      {/* Update Button */}
      <div className="mt-4 text-center">
        <Button className="px-6 py-2 rounded-lg shadow">Update Changes</Button>
      </div>
    </div>
  );
}
