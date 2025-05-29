import { BorderBeam } from "../magicui/border-beam";
import { Timeline } from "../ui/timeline";

export default function ExperienceSection() {
  return (
    <div className="relative w-full mt-10 border rounded overflow-clip">
      <Timeline />
      <BorderBeam duration={20} size={150} />
    </div>
  );
}
