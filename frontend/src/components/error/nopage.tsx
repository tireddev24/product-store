import { CircleOff } from "lucide-react";
import Navbar from "../navbar";

const Nopage = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-6 p-6 text-center">
        <CircleOff className="size-32 text-mute" strokeWidth={1} />
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
            404
          </p>
          <h1 className="display-serif text-3xl md:text-5xl">Page not found</h1>
          <p className="text-sm text-mute">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nopage;
