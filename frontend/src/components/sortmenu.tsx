import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
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
  sortstatus: React.MutableRefObject<string>;
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
    <div className="relative -mb-12 w-full max-w-xs" ref={menuRef}>
      <Button
        variant="blue"
        rightIcon={<ChevronDown className="size-4" />}
        className="flex w-full min-w-40 justify-between sm:min-w-60"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-1">
          <span className="hidden font-bold sm:inline">Sort by:</span>
          <span className="font-serif font-light">{sortstatus.current}</span>
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
          <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {params.map((p) => (
              <label
                key={p.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700",
                  value === p.value && "bg-blue-50 dark:bg-blue-950",
                )}
                onClick={() => {
                  handleClick(p.title, p.key, p.direction, p.value);
                  setValue(p.value);
                  setOpen(false);
                }}
              >
                <input
                  type="radio"
                  name="sort"
                  value={p.value}
                  checked={value === p.value}
                  onChange={() => setValue(p.value)}
                  className="size-4 accent-blue-500"
                />
                <span className="text-sm font-medium hover:underline">
                  {p.title}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortMenu;
