import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BASE_URL;

  // 🧠 Initialize states with localStorage (for instant persistence)
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [bgCol, setBgCol] = useState(false);
  const [allResume, setAllResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚙️ Set Axios Base URL
  axios.defaults.baseURL = backendUrl;

  // 🔁 Keep token synced with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  // fetch all resumes  
  const fetchAllResume = async()=>{
    try {
      const response = await axios.get(backendUrl+'/api/users/resumes',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setAllResume(response.data.resumes)
      
    } catch (error) {
      console.log(error.message)
      
    }

  }

  // 👤 Fetch user data if token is valid
  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/api/users/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("User fetched successfully!");
    } catch (error) {
      console.error("User fetch failed:", error);
      toast.error("Session expired. Please login again.");
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Fetch user whenever token changes
  useEffect(() => {
    fetchUser();
    fetchAllResume()
  }, [token]);

  // 🧩 Context value shared across app
  const value = {
    bgCol,
    setBgCol,
    backendUrl,
    token,
    setToken,
    user,
    setUser,
    allResume,
    setAllResume,
    loading,
    fetchAllResume
  };

  // 🕓 Prevent blank screen while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
