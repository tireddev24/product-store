import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

const Spin = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex h-[50px] items-center justify-center", className)}>
      <Loader2 className="size-8 animate-spin text-blue-500" />
    </div>
  );
};

export default Spin;
