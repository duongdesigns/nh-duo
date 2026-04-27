import SkillBar from "./SkillBar";

function SkillsSection({ intro, skillGroups }) {
  return (
    <section
      data-about-block
      aria-labelledby="about-skills-title"
      className="py-28 md:py-36"
    >
      <div className="grid gap-8 xl:grid-cols-[0.52fr_1.48fr] xl:gap-10">
        <div className="max-w-[30rem]">
          <div className="text-sm leading-6 text-white/42">Fähigkeiten / Expertise</div>
          <h2
            id="about-skills-title"
            className="subsection-title mt-4 max-w-[20ch] text-white"
          >
            Platzhalter für Tools und Systeme aus Design, Code und Umsetzung.
          </h2>
          <p className="body-safe mt-4 text-sm leading-7 text-white/60 md:text-[0.96rem]">
            {intro}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[1.55rem] border border-white/10 bg-[#121A22]/95 p-4 md:p-5"
            >
              <div className="text-sm font-medium leading-6 text-[rgba(214,161,31,0.76)]">
                {group.title}
              </div>
              <p className="mt-3 text-sm leading-7 text-white/54">
                {group.summary}
              </p>

              <ul className="mt-5 grid gap-4" aria-label={`${group.title} Skills`}>
                {group.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    label={skill.name}
                    value={skill.value}
                  />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
