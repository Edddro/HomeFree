"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function InstancePage() {
  const [profiles, setProfiles] = useState([
    {
      name: "Edward D.",
      image: "/Edward.jpg",
      email: "edward@example.com",
      phone: "+1 416-000-000",
      videoUrl: "",
    },
    {
      name: "Krishna C.",
      image: "/krishna.webp",
      email: "krishna@example.com",
      phone: "+1 416-000-000",
      videoUrl: "",
    },
    {
      name: "Elizabeth W.",
      image: "/elizabeth.jpg",
      email: "elizabeth@example.com",
      phone: "+1 416-000-000",
      videoUrl: "",
    },
    { name: "Add friends", image: "", email: "", phone: "", videoUrl: "" },
  ]);

  const [selectedProfileIndex, setSelectedProfileIndex] = useState<
    number | null
  >(null);
  const [inputValue, setInputValue] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputVideoUrl, setInputVideoUrl] = useState("");
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);

  const [userName, setUserName] = useState("HomeSafe");
  const [userEmail, setUserEmail] = useState("homesafe@example.com");
  const [userPhone, setUserPhone] = useState("+1 416-000-000");

  const handleProfileUpdate = (index: number) => {
    const updatedProfile = {
      ...profiles[index],
      name: inputValue || profiles[index].name,
      email: inputEmail || profiles[index].email,
      phone: inputPhone || profiles[index].phone,
      videoUrl: inputVideoUrl || profiles[index].videoUrl,
    };

    setProfiles((prevProfiles) => {
      const updatedProfiles = [...prevProfiles];
      updatedProfiles[index] = updatedProfile;
      return updatedProfiles;
    });
  };

  const handleRemoveFriend = (index: number) => {
    setProfiles((prevProfiles) => prevProfiles.filter((_, i) => i !== index));
    setSelectedProfileIndex(null);
  };

  const handleSelectProfile = (index: number) => {
    if (index === 3) return;
    setSelectedProfileIndex(index);
    setInputValue(profiles[index].name);
    setInputEmail(profiles[index].email);
    setInputPhone(profiles[index].phone);
    setInputVideoUrl(profiles[index].videoUrl);
  };

  const handleUserSettingsUpdate = () => {
    console.log("Updated User Settings:", { userName, userEmail, userPhone });
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Friends</h2>
        <div className="grid grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <Popover key={index}>
              <PopoverTrigger>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleSelectProfile(index)}
                >
                  <div className="w-12 h-12 relative rounded-full overflow-hidden">
                    {profile.name === "Add friends" ? (
                      <Plus size={24} />
                    ) : (
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <span className="text-sm">{profile.name}</span>
                </div>
              </PopoverTrigger>
            </Popover>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold mb-4">Your Settings</h2>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input
            value={userName}
            className="mt-1"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input
            value={userEmail}
            className="mt-1"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <Input
            value={userPhone}
            className="mt-1"
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Enable Geolocation
          </label>
          <Switch
            checked={geolocationEnabled}
            onCheckedChange={(checked) => setGeolocationEnabled(checked)}
            className={`${
              geolocationEnabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                geolocationEnabled ? "translate-x-full" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>
        <Button
          className="mt-4 px-6 py-2 rounded-lg shadow"
          onClick={handleUserSettingsUpdate}
        >
          Update Changes
        </Button>
      </div>

      {selectedProfileIndex !== null && selectedProfileIndex !== 3 && (
        <div className="space-y-4 mt-6">
          <h2 className="text-lg font-bold mb-4">
            Update {profiles[selectedProfileIndex].name} Information
          </h2>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              value={inputValue}
              className="mt-1"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              value={inputEmail}
              className="mt-1"
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              value={inputPhone}
              className="mt-1"
              onChange={(e) => setInputPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Video URL</label>
            <Input
              value={inputVideoUrl}
              className="mt-1"
              onChange={(e) => setInputVideoUrl(e.target.value)}
            />
          </div>

          <div className="mt-4 text-center flex justify-between">
            <Button
              className="px-6 py-2 rounded-lg shadow"
              onClick={() => handleProfileUpdate(selectedProfileIndex)}
            >
              Update Changes
            </Button>
            <Button
              className="px-6 py-2 rounded-lg shadow bg-red-500 text-white"
              onClick={() => handleRemoveFriend(selectedProfileIndex)}
            >
              Remove Friend
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
