import React from "react";
import {
    Asterisk,
    User,
    Upload,
    Mail,
    Phone,
    ShoppingBag,
    Linkedin,
    MapPin,
    Globe, // ✅ replaces Location
} from "lucide-react";

const PersonalInfoForm = ({
    data = {}, // ✅ Prevents undefined access
    onChange = () => { }, // ✅ Safe fallback
    removeBackground,
    setRemoveBackground,
}) => {
    // ✅ Helper for field updates (fixed)
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="w-full flex flex-col mt-4">
            {/* --- Header --- */}
            <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    Personal Information
                </p>
                <p className="text-sm text-gray-500">
                    Get started by filling out your personal details.
                </p>
            </div>

            {/* --- Upload User Image --- */}
            <div className="flex items-center gap-3 mb-6">
                <label htmlFor="profileImage">
                    {data.image ? (
                        <img
                            src={
                                typeof data.image === "string"
                                    ? data.image
                                    : URL.createObjectURL(data.image)
                            }
                            alt="user-image"
                            className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
                        />
                    ) : (
                        <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
                            <User className="size-10 p-2.5 border rounded-full" />
                            upload user image
                        </div>
                    )}

                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                </label>
                {typeof data.image === "object" && (
  <div className="flex flex-col gap-2 mt-2">
    <p className="text-sm font-medium text-gray-700">Remove Background</p>

    <label className="relative inline-flex items-center cursor-pointer">
      {/* ✅ Controlled checkbox with peer for animation */}
      <input
        type="checkbox"
        className="sr-only peer"
        checked={removeBackground}
        onChange={() => {
          if (typeof setRemoveBackground === "function") {
            setRemoveBackground((prev) => !prev);
          }
        }}
      />
      {/* ✅ Track (background) */}
      <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200"></div>
      {/* ✅ Knob (the moving circle) */}
      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></div>
    </label>
  </div>
)}


            </div>

            {/* --- Full Name Input --- */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="size-4 text-black" />
                    Full Name
                    <Asterisk className="size-3 text-red-500" />
                </label>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={data.full_name || ""}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className="text-gray-900  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>

            {/* --- Email Input --- */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail className="size-4 text-black" />
                    Email Address
                    <Asterisk className="size-3 text-red-500" />
                </label>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={data.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="text-gray-900  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>

            {/* --- Phone Input --- */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <Phone className="size-4 text-black" />
                    Phone Number
                    <Asterisk className="size-3 text-red-500" />
                </label>
                <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={data.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="text-gray-900  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>

            {/* --- Location Input --- */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <MapPin className="size-4 text-black" />
                    Location
                </label>
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={data.location || ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="text-gray-900  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>

            {/* --- Profession Input --- */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <ShoppingBag className="size-4 text-black" />
                    Profession
                    <Asterisk className="size-3 text-red-500" />
                </label>
                <input
                    type="text"
                    placeholder="Enter your profession"
                    value={data.profession || ""}
                    onChange={(e) => handleChange("profession", e.target.value)}
                    className=" text-gray-900 border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>

            {/* --- LinkedIn Input --- */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <Linkedin className="size-4 text-black" />
                    LinkedIn Profile
                </label>
                <input
                    type="url"
                    placeholder="Enter Your LinkedIn Profile"
                    value={data.linkedin || ""}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                    className="text-gray-900  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>
            {/*-------- personal website ----*/}
            <div className="flex flex-col gap-2 mb-5">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <Globe className="size-4 text-black" />
                    Personal Website
                </label>
                <input
                    type="url"
                    placeholder="Enter Your Personal Website"
                    value={data.website || ""}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="text-gray-900  border border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white/70 transition-all duration-200"
                />
            </div>
            
        </div>
    );
};

export default PersonalInfoForm;
