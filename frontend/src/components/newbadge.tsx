import { useEffect, useState } from "react";
import { Badge } from "./ui/Layout";

function Newbadge({ dateCreated }: { dateCreated: string | Date }) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const today = new Date();
    const date = new Date(dateCreated);
    const diff = today.getTime() - date.getTime();
    setIsNew(diff <= 604800000);
  }, [dateCreated]);

  if (!isNew) return null;

  return (
    <Badge
      variant="gold"
      className="absolute top-3 right-3 z-10 backdrop-blur-sm"
    >
      New
    </Badge>
  );
}

export default Newbadge;
