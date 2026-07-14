import { DollarSign } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

type PriceRangeProps = {
  handleSliderChange: (val: number[]) => void;
  handleSlider: () => void;
  rangeVal: number[];
  setRangeVal: (val: number[]) => void;
};

const PriceRange = ({
  handleSliderChange,
  handleSlider,
  rangeVal,
  setRangeVal,
}: PriceRangeProps) => {
  const min = 0;
  const max = 100000;
  const minPercent = ((rangeVal[0] - min) / (max - min)) * 100;
  const maxPercent = ((rangeVal[1] - min) / (max - min)) * 100;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-mute">
        Price Range
      </p>
      <div className="relative h-2 w-64 sm:w-80 md:w-96">
        <div className="absolute h-[2px] w-full translate-y-[3px] bg-hairline" />
        <div
          className="absolute h-[2px] translate-y-[3px] bg-gold"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={rangeVal[0]}
          onChange={(e) =>
            handleSliderChange([
              Math.min(Number(e.target.value), rangeVal[1] - 1),
              rangeVal[1],
            ])
          }
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-noir"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={rangeVal[1]}
          onChange={(e) =>
            handleSliderChange([
              rangeVal[0],
              Math.max(Number(e.target.value), rangeVal[0] + 1),
            ])
          }
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-noir"
        />
      </div>
      <div className="mt-3 flex w-full max-w-md flex-col gap-2 md:flex-row md:items-center">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <DollarSign className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-gold" />
            <Input
              value={rangeVal[0]}
              type="number"
              className="pl-8"
              onChange={(e) =>
                setRangeVal([Number(e.target.value), rangeVal[1]])
              }
            />
          </div>
          <div className="relative flex-1">
            <DollarSign className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-gold" />
            <Input
              value={rangeVal[1]}
              type="number"
              className="pl-8"
              onChange={(e) =>
                setRangeVal([rangeVal[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
        <Button variant="primary" onClick={handleSlider}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PriceRange;
