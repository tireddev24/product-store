import { DollarSign } from "lucide-react";
import { useColorModeValue } from "../context/ThemeContext";
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
  const trackColor = useColorModeValue("#e5e7eb", "#374151");
  const min = 0;
  const max = 100000;
  const minPercent = ((rangeVal[0] - min) / (max - min)) * 100;
  const maxPercent = ((rangeVal[1] - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-bold">Price Range</p>
      <div className="relative h-2 w-64 sm:w-80 md:w-92">
        <div
          className="absolute h-2 w-full rounded-full"
          style={{ backgroundColor: trackColor }}
        />
        <div
          className="absolute h-2 rounded-full bg-blue-500"
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
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white"
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
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
      <div className="mt-2 flex max-w-88 flex-col gap-2 md:flex-row md:items-center">
        <div className="flex gap-2">
          <div className="relative">
            <DollarSign className="absolute top-2.5 left-2 size-4 text-cyan-500" />
            <Input
              variant="filled"
              value={rangeVal[0]}
              type="number"
              className="pl-8"
              onChange={(e) =>
                setRangeVal([Number(e.target.value), rangeVal[1]])
              }
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute top-2.5 left-2 size-4 text-cyan-500" />
            <Input
              variant="filled"
              value={rangeVal[1]}
              type="number"
              className="pl-8"
              onChange={(e) =>
                setRangeVal([rangeVal[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
        <Button variant="cyan" className="min-w-24" onClick={() => handleSlider()}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PriceRange;
