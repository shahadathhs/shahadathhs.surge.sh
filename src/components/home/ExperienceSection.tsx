import { experienceData } from "@/constant/experienceData";
import { BorderBeam } from "../magicui/border-beam";
import { Timeline } from "../ui/timeline";

export default function ExperienceSection() {
  return (
    <div className="relative w-full mt-10 border rounded overflow-clip">
      <Timeline data={experienceData} />
      <BorderBeam duration={200} size={250} />
    </div>
  );
}
