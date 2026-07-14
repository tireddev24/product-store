import { AlertOctagon } from "lucide-react";
import { Button } from "../ui/Button";

const Rooterror = () => {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-10 px-6 text-center">
      <AlertOctagon
        className="size-24 text-[color:var(--color-danger)]"
        strokeWidth={1.2}
      />
      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
          Something broke
        </p>
        <h2 className="display-serif text-2xl md:text-4xl">
          An unexpected error occurred.
        </h2>
      </div>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  );
};

export default Rooterror;
