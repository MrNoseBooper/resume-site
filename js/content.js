/* =====================================================================
   CONTENT — edit this file to change what appears on the site.
   ---------------------------------------------------------------------
   • The page is built from the `sections` array, top to bottom.
   • Reorder sections by moving entries around.
   • Hide a section with `enabled: false` (or just delete the entry).
   • Add a section by copying an entry and giving it a unique `id`.
   • `nav: false` keeps a section out of the top navigation bar.

   Available section types:
     hero, about, timeline, skills, projects, github, list, contact, custom
   Anything in [BRACKETS] is a placeholder waiting for your details.
   ===================================================================== */

window.RESUME = {
  settings: {
    accent: "#7c5cff",   // main brand colour
    accent2: "#22d3ee",  // secondary colour used in gradients
  },

  profile: {
    name: "Christopher Foo",
    fullName: "Christopher Foo Chia Keith",
    // Drop your photo at assets/profile.jpg (square works best).
    // If the file is missing, your initials are shown instead.
    photo: "assets/profile.jpg",
    roles: ["Software Engineering Student", "Problem Solver", "IT Support"], // cycled in the hero
    tagline:
      "Software Engineering student acquiring skills in coding, problem solving and the development of efficient software solutions.",
    location: "Kota Kemuning, KL",
    email: "christopherfoo3000@gmail.com",
    phone: "", // e.g. "+60 13 340 1792" — shown in the Contact section when set (this site is public!)
    resumePdf: "", // e.g. "assets/resume.pdf" — shows a download button when set
    socials: [
      { label: "GitHub",   url: "https://github.com/MrNoseBooper", icon: "github" },
      { label: "LinkedIn", url: "",                                icon: "linkedin" }, // empty url = hidden
      { label: "Email",    url: "mailto:christopherfoo3000@gmail.com", icon: "mail" },
    ],
  },

  sections: [
    { type: "hero", id: "home", title: "Home" },

    {
      type: "about",
      id: "about",
      title: "About Me",
      paragraphs: [
        "I'm a Software Engineering student at Sunway University, acquiring skills in coding, problem solving and the development of efficient software solutions. I'm currently looking to gain experience working retail for a tech company during my studies.",
        "My goal is to gain hands-on experience in the workforce, understand the inner workings of a functioning business, learn how it's managed, and integrate myself as part of the team.",
      ],
      interests: ["Golfing", "Video Games", "Lawn Care", "Badminton"],
      facts: [
        { label: "Based in", value: "Kota Kemuning, KL" },
        { label: "Studying", value: "B. Software Engineering" },
        { label: "University", value: "Sunway University" },
        { label: "Languages", value: "English, Mandarin" },
      ],
      // `decimals` sets how many decimal places the counter shows
      highlights: [
        { value: 3.5, decimals: 2, label: "CGPA" },
        { value: 2, label: "Languages spoken" },
      ],
    },

    {
      type: "timeline",
      id: "timeline",
      title: "Timeline",
      subtitle: "Where I've been and what I've done.",
      // `kind` controls the icon and the filter buttons: work, education, award, project, volunteer
      // Optional fields: `points` (bullet list), `description`, `tags`, `location`
      items: [
        {
          kind: "award",
          date: "Feb 2025 — Apr 2025",
          title: "Dean's List Award",
          org: "Sunway University",
        },
        {
          kind: "work",
          date: "2024 — Present",
          title: "IT Support",
          org: "B2B Company",
        },
        {
          kind: "education",
          date: "2023 — Present",
          title: "Bachelor of Software Engineering",
          org: "Sunway University",
          location: "Subang Jaya",
          description: "CGPA 3.50",
        },
        {
          kind: "work",
          date: "2023",
          title: "Part-Time Waiter",
          org: "Rakuzen",
        },
        {
          kind: "education",
          date: "2022 — 2023",
          title: "South Australian Certificate of Education (SACE)",
          org: "Taylor's University Lakeside Campus",
          location: "Subang Jaya",
        },
        {
          kind: "education",
          date: "2015 — 2021",
          title: "International General Certificate of Secondary Education (IGCSE)",
          org: "UCSI International School",
          location: "Subang Jaya",
        },
      ],
    },

    {
      type: "skills",
      id: "skills",
      title: "Skills",
      // Give a skill a `level` (0–100) to show an animated bar; omit it to show a chip.
      groups: [
        {
          name: "Technical Skills",
          items: [{ name: "Java" }, { name: "Python" }, { name: "HTML" }],
        },
        {
          name: "Soft Skills",
          items: [
            { name: "Time Management" },
            { name: "Problem-solving" },
            { name: "Adaptability" },
            { name: "Customer Service" },
            { name: "Persuasion" },
            { name: "Enthusiasm" },
            { name: "Work Ethic" },
          ],
        },
      ],
    },

    {
      type: "projects",
      id: "projects",
      title: "Projects",
      items: [
        {
          title: "WMS 1.0",
          description:
            "An application integrated with a database and user verification, built to support the economic development of the indigenous people of Malaysia.",
          tags: ["Database", "User Verification"],
          links: [],
        },
        {
          title: "Un-Named (Ongoing)",
          description:
            "A web application that reads, stores and processes company documents to improve staff efficiency and reduce cost.",
          tags: ["Web App", "Document Processing"],
          links: [],
        },
        {
          title: "Resume Website",
          description: "This site — a config-driven, animated personal resume.",
          tags: ["HTML", "CSS", "JavaScript"],
          image: "", // optional, e.g. "assets/projects/resume.png"
          links: [{ label: "Code", url: "https://github.com/MrNoseBooper" }],
        },
      ],
    },

    {
      type: "github",
      id: "github",
      title: "GitHub",
      subtitle: "Live from my GitHub profile.",
      username: "MrNoseBooper",
      repoCount: 6,             // how many repos to show (0 hides them)
      contributionChart: true,  // contribution heatmap image
      // GitHub has no API for achievements, so list the ones you've earned by slug.
      // Examples: "pull-shark", "quickdraw", "yolo", "pair-extraordinaire",
      //           "starstruck", "galaxy-brain", "arctic-code-vault-contributor"
      achievements: [],
    },

    {
      type: "list",
      id: "certifications",
      title: "Certifications",
      enabled: false, // flip to true once you've filled it in
      items: [
        { title: "[Certificate Name]", subtitle: "[Issuer]", date: "2025", url: "" },
      ],
    },

    {
      type: "custom",
      id: "extra",
      title: "Anything Else",
      enabled: false,
      html: "<p>Any HTML you like goes here.</p>",
    },

    {
      type: "contact",
      id: "contact",
      title: "Get In Touch",
      message: "I'm looking for opportunities to gain hands-on experience, especially working with a tech company during my studies. Drop me a message and I'll get back to you.",
    },
  ],
};
