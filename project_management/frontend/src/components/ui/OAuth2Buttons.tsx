import { NavLink } from "react-router";
import { Button } from "./button";

const OAuth2Buttons = () => {
  return (
    <NavLink
      to={`${
        import.meta.env.VITE_GOOGLE_CLIENT_ID || "http://localhost:8083"
      }/oauth2/authorization/google`}
    >
      <Button
        variant="outline"
        className="h-12 w-full rounded-2xl border-black/10 bg-white/60 text-black hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
        type="button"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="mr-3 h-5 w-5"
        />
        Continue with Google
      </Button>
    </NavLink>
  );
};

export default OAuth2Buttons;
