import { experienceData } from '@/constant/experienceData';

export default function Experience() {
  return (
    <section className="space-y-8 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        Experience
      </h2>
      <div className="space-y-12">
        {experienceData.map((exp, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
              <h3 className="font-bold text-lg">{exp.designation}</h3>
              <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                {exp.title}
              </span>
            </div>
            <p className="text-sm font-bold text-muted-foreground">
              {exp.company}
            </p>
            <ul className="list-disc list-outside ml-4 space-y-1 pt-2">
              {exp.responsibilities.map((resp, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
