import { Typography } from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";
 
export function SimpleFooter() {
    const { userAnonymous, currentUser } = useAuth()
    return (
      <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 text-center md:justify-between py-1 px-2 fixed bottom-0 left-0">
        <Typography color="blue-gray" className="fontFamily">
          {currentUser ? `Bienvenido ${currentUser.displayName}` : ''}
        </Typography>
      </footer>
    );
  }
  