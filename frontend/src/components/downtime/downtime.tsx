import { Wrench } from "lucide-react";

const Downtime = () => {
  return (
    <div>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 p-6 text-center">
        <Wrench className="size-24 text-gold" strokeWidth={1.2} />
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
            System Notice
          </p>
          <h1 className="display-serif text-3xl md:text-5xl">Under Maintenance</h1>
          <p className="max-w-md text-sm text-mute">
            We are currently undergoing maintenance. <br />
            Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Downtime;
