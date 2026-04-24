import SkillBar from "./SkillBar";

function SkillsSection({ intro, skillGroups }) {
  return (
    <section
      data-about-block
      aria-labelledby="about-skills-title"
      className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 md:p-6"
    >
      <div className="grid gap-8 xl:grid-cols-[0.48fr_1.52fr] xl:gap-10">
        <div className="max-w-[30rem]">
          <div className="type-label text-white/38">Skills / Expertise</div>
          <h2
            id="about-skills-title"
            className="section-title mt-4 max-w-[18ch] text-white"
          >
            Tools and systems used across design, code, and delivery.
          </h2>
          <p className="body-safe mt-5 text-base leading-[1.82] text-white/60">
            {intro}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[1.55rem] border border-white/10 bg-white/[0.02] p-4 md:p-5"
            >
              <div className="type-label text-[rgba(58,175,169,0.76)]">
                {group.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-white/54">
                {group.summary}
              </p>

              <ul className="mt-5 grid gap-4" aria-label={`${group.title} skills`}>
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
