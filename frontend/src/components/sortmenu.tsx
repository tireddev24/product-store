import { ChevronDown } from "lucide-react";
import { useRef, useState, type MutableRefObject } from "react";
import { cn } from "../lib/cn";
import { Button } from "./ui/Button";

type SortParam = {
  title: string;
  key: string;
  direction: string;
  value: string;
};

type SortMenuProps = {
  handleClick: (t: string, k: string, d: string, v: string) => void;
  params: SortParam[];
  sortstatus: MutableRefObject<string>;
  value: string;
  setValue: (value: string) => void;
};

const SortMenu = ({
  handleClick,
  params,
  sortstatus,
  value,
  setValue,
}: SortMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-xs" ref={menuRef}>
      <Button
        variant="default"
        rightIcon={
          <ChevronDown
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        }
        className="flex w-full min-w-40 justify-between sm:min-w-60"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2">
          <span className="text-mute">Sort:</span>
          <span className="text-gold">{sortstatus.current}</span>
        </span>
      </Button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10"
            aria-label="Close sort menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute z-20 mt-2 w-full border border-hairline bg-surface-2 py-1 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)]">
            {params.map((p) => (
              <button
                type="button"
                key={p.value}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition",
                  value === p.value
                    ? "bg-gold/10 text-gold"
                    : "text-ivory hover:bg-noir-2 hover:text-gold",
                )}
                onClick={() => {
                  handleClick(p.title, p.key, p.direction, p.value);
                  setValue(p.value);
                  setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "inline-block size-1.5 rounded-full",
                    value === p.value ? "bg-gold" : "bg-hairline-strong",
                  )}
                />
                {p.title}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortMenu;
