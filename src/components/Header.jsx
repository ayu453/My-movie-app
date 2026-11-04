import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo, usersInTheAc } from "../utils/constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeGeminiSearchState } from "../utils/geminiSlice";

const Header = ({ from }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user?.displayName);
  const toggleSearch = useSelector((store) => store.gemini.isGeminiSearchEnable);
  const [currentUser, setCurrentUser] = useState({ icon: usersInTheAc[0].icon });
  const [isDropDownEnable, setIsDropDownEnable] = useState(false);

  const handleSignOut = () => signOut(auth).catch(() => navigate("/error"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (photoURL) setCurrentUser({ icon: photoURL });
        if (location.pathname === "/" || location.pathname === "/login" || location.pathname.startsWith("/register")) navigate("/browse");
      } else {
        dispatch(removeUser());
        if (location.pathname !== "/" && location.pathname !== "/login" && !location.pathname.startsWith("/register")) navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  if (from === "browse") return (
    <header className="aflux-header">
      <button onClick={() => { if (toggleSearch) dispatch(changeGeminiSearchState()); navigate("/browse"); }} className="shrink-0" aria-label="Aflix home">
        <img className="aflux-logo" src={Logo} alt="Aflix" />
      </button>
      <nav className="aflux-nav" aria-label="Main navigation">
        <button onClick={() => { dispatch(changeGeminiSearchState(false)); navigate("/browse"); }}>Discover</button>
        <button onClick={() => dispatch(changeGeminiSearchState())}>{toggleSearch ? "← Back to cinema" : "✦ AI discovery"}</button>
      </nav>
      <div className="relative ml-auto">
        <button className="aflux-profile" onClick={() => setIsDropDownEnable(!isDropDownEnable)} aria-expanded={isDropDownEnable}>
          <img src={currentUser.icon} alt="" />
          <span>{userName || "Your account"}</span>
          <span className="text-[#c5a66a]">⌄</span>
        </button>
        {isDropDownEnable && <div className="aflux-profile-menu">
          <div className="px-3 py-2 text-xs tracking-wider text-[#bba06e] uppercase">Signed in as</div>
          <div className="px-3 pb-3 text-sm text-white break-all">{userName || "Aflix member"}</div>
          <button onClick={handleSignOut}>Sign out of Aflix ↗</button>
        </div>}
      </div>
    </header>
  );

  return (
    <header className={`absolute z-20 w-full px-5 md:px-12 py-5 flex items-center justify-between ${from === "register" ? "bg-white border-b" : ""}`}>
      {from === "login" ? <img className="w-28 md:ml-10" src="/AflixLogo.png" alt="Aflix" /> : <>
        <img className="w-24 md:w-28" src={Logo} alt="Aflix" />
        <div className="flex items-center gap-3">
          <select className={`border border-[#777] rounded px-3 py-2 text-sm ${from === "register" ? "bg-white text-black" : "bg-black/50 text-white"}`} aria-label="Language">
            <option value="English">English</option><option value="Hindi">Hindi</option>
          </select>
          <button onClick={() => navigate("/login")} className="aflux-primary !py-2 !px-4">Sign in</button>
        </div>
      </>}
    </header>
  );
};
export default Header;