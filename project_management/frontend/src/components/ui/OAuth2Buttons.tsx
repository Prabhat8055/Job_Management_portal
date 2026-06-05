// import { NavLink } from "react-router";
// import { Button } from "./button";

// const OAuth2Buttons = () => {
//   return (
//     <NavLink
//       to={`${
//         import.meta.env.VITE_GOOGLE_CLIENT_ID || "http://localhost:8083"
//       }/oauth2/authorization/google`}
//     >
//       <Button
//         variant="outline"
//         className="h-12 w-full rounded-2xl border-black/10 bg-white/60 text-black hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
//         type="button"
//       >
//         <img
//           src="https://www.svgrepo.com/show/475656/google-color.svg"
//           alt="google"
//           className="mr-3 h-5 w-5"
//         />
//         Continue with Google
//       </Button>
//     </NavLink>
//   );
// };

// export default OAuth2Buttons;

const OAuth2Buttons = () => {
  const handleGoogleLogin = () => {
    // Must be a full browser redirect, NOT React Router navigation.
    // NavLink/useNavigate intercept the click and do SPA navigation,
    // which breaks the OAuth2 flow. The backend needs a real HTTP redirect.
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8083";
    window.location.href = `${backendBase}/oauth2/authorization/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="group relative flex h-12 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white/60 text-sm font-semibold text-black transition-all duration-200 hover:bg-slate-50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="h-5 w-5 shrink-0"
      />
      Continue with Google
    </button>
  );
};

export default OAuth2Buttons;
