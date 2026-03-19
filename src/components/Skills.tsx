import { skills } from '@/constant/skillsData';

export default function Skills() {
  return (
    <section className="space-y-8 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup) => (
          <div key={skillGroup.category} className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-[11px] font-bold uppercase tracking-tighter"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
