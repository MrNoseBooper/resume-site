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
    // Optional accent overrides, e.g. "#b4441c". Leave empty to use the
    // defaults in css/style.css (rust on paper / light rust on charcoal).
    accent: "",
    accentDark: "",
  },

  profile: {
    name: "Christopher Foo",
    fullName: "Christopher Foo Chia Keith",
    // Drop your photo at assets/profile.jpg (square works best).
    // If the file is missing, your initials are shown instead.
    photo: "assets/profile.jpg",
    roles: ["Software Engineering Graduand", "Full-Stack Web Developer", "IT Support"], // cycled in the hero
    tagline:
      "Software Engineering Graduand acquiring skills in coding, problem solving and the development of efficient software solutions.",
    availability: "Open to opportunities", // small line above the name in the hero
    location: "Kota Kemuning, Selangor",
    email: "christopherfoochiakeith@gmail.com",
    phone: "", // e.g. "+60 13 340 1792" — shown in the Contact section when set (this site is public!)
    resumePdf: "", // e.g. "assets/resume.pdf" — shows a download button when set
    socials: [
      { label: "GitHub",   url: "https://github.com/MrNoseBooper", icon: "github" },
      { label: "LinkedIn", url: "",                                icon: "linkedin" }, // empty url = hidden
      { label: "Email",    url: "mailto:christopherfoochiakeith@gmail.com", icon: "mail" },
    ],
  },

  sections: [
    { type: "hero", id: "home", title: "Home" },

    {
      type: "about",
      id: "about",
      title: "About Me",
      paragraphs: [
        "I'm a Software Engineering Graduand from Sunway University, acquiring skills in coding, problem solving and the development of efficient software solutions. I'm currently looking to gain experience working for a company to further develop my skill set and knowledge base.",
        "My goal is to gain hands-on experience in the workforce, gain insight into the inner workings of a functioning business, learn how to manage it, and integrate myself as part of the team.",
      ],
      interests: ["Brazilian Jiu-Jitsu", "Golfing", "Guitar", "Video Games", "Lawn Care", "Badminton"],
      facts: [
        { label: "Based in", value: "Kota Kemuning, Selangor" },
        { label: "Degree", value: "B. Software Engineering (Hons)" },
        { label: "University", value: "Sunway University" },
        { label: "Languages", value: "English (Fluent), Mandarin (Semi-Fluent), Russian (Basic)" },
      ],
      // `decimals` sets how many decimal places the counter shows
      highlights: [
        { value: 3.27, decimals: 2, label: "CGPA" },
        { value: 3, label: "Languages spoken" },
      ],
    },

    {
      type: "timeline",
      id: "timeline",
      title: "Timeline",
      subtitle: "Where I've been and what I've done.",
      // `kind` controls the icon and label: work, education, award, project, volunteer
      // Optional fields: `points` (bullet list), `description`, `tags`, `location`
      items: [
        {
          kind: "education",
          date: "2023 — 2026",
          title: "Bachelor of Software Engineering (Hons)",
          org: "Sunway University",
          location: "Subang Jaya",
          description: "CGPA 3.27",
        },
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
          org: "Popular Meadows Sdn Bhd",
          points: [
            "Developed and maintained an internal web-based system to improve business efficiency and digitise manual processes.",
            "Designed and developed web applications using HTML, CSS, JavaScript, Python, Flask, and SQL/MySQL.",
            "Deployed and hosted the web application using cPanel, including application configuration and troubleshooting.",
            "Developed a price-checking system to help staff verify product pricing and improve data accuracy from the B2B system.",
            "Gathered requirements from company staff and translated business needs into practical system features and improvements.",
            "Performed system maintenance, debugging, and feature enhancements based on user feedback.",
            "Installed and configured a UGREEN NAS to improve digital document storage, organisation, and retrieval while reducing reliance on physical documents.",
            "Contributed to the company's digitalisation and paper-reduction efforts, supporting its sustainability goals (SDG).",
          ],
          tags: ["Python", "Flask", "MySQL", "JavaScript", "cPanel", "NAS"],
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
          name: "Programming Languages",
          items: [
            { name: "Java" }, { name: "Python" }, { name: "JavaScript" },
            { name: "HTML" }, { name: "CSS" }, { name: "SQL" }, { name: "Dart" },
          ],
        },
        {
          name: "Frameworks & Tools",
          items: [
            { name: "Flask" }, { name: "MySQL" }, { name: "Firebase Firestore" },
            { name: "cPanel" }, { name: "Vercel" }, { name: "UGREEN NAS" },
          ],
        },
        {
          name: "Soft Skills",
          items: [
            { name: "Time Management" },
            { name: "Problem-Solving" },
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
      // Optional `status` shows a small live badge, e.g. "On-going".
      items: [
        {
          title: "pmmy-systems",
          status: "On-going",
          description:
            "A full-stack internal business management web application that digitises and streamlines company processes, including product price management, purchase order generation, receiving note verification, and product analysis. Features database-driven workflows, automated document generation, and data validation to reduce manual work, improve data accuracy, and increase operational efficiency.",
          tags: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript", "cPanel"],
          links: [],
        },
        {
          title: "personal-website",
          status: "On-going",
          description:
            "A multi-purpose personal website built to do anything I'd like it to — completing tasks, playing games, hosting servers and more. Hosted on Vercel's hobby plan with Firestore for data. I designed how each component should function and used AI to implement them for rapid development.",
          tags: ["Vercel", "Firebase Firestore", "AI-Assisted"],
          links: [],
        },
        {
          title: "skill_share_platform",
          description:
            "A \"Neighbourhood Skill-Share Platform\" built as a group project for SWE3025 (Code Camp). Users can create an account, sign in, set up and join classes, report other users, and communicate through messaging or a notice board.",
          tags: ["Dart", "Firebase Firestore", "Group Project"],
          links: [{ label: "Code", url: "https://github.com/MrNoseBooper/skill_share_platform" }],
        },
        {
          title: "Capstone-2",
          description:
            "Capstone project for PRJ3223: a Python program that compares the outputs of 4 different machine learning models in predicting sepsis in a home setting before it occurs, analysing the strengths and shortcomings of each model.",
          tags: ["Python", "Machine Learning"],
          links: [{ label: "Code", url: "https://github.com/MrNoseBooper/Capstone-2" }],
        },
        {
          title: "resume-site",
          description:
            "This website — built to present my resume better. I guided the build and designed its architecture, with AI writing the code.",
          tags: ["HTML", "CSS", "JavaScript", "Vercel"],
          image: "", // optional, e.g. "assets/projects/resume.png"
          links: [
            { label: "Live", url: "https://resume-site-chi-navy.vercel.app/" },
            { label: "Code", url: "https://github.com/MrNoseBooper/resume-site" },
          ],
        },
        {
          title: "Boqkova-website",
          description:
            "A static website with no backend logic for a friend to advertise their language tutoring classes, with the potential to sell cheaper courses in the long term.",
          tags: ["HTML", "CSS", "JavaScript", "Static Site"],
          links: [],
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
      headline: "Let's talk",
      message: "I’m looking to gain experience working for a company to further develop my skill set and knowledge base. Drop me a message and I’ll get back to you.",
    },
  ],
};
