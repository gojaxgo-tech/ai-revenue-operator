const profile = {
  name: "John Jackson",
  headline:
    "AI Agent Operator | AI Workflow Consultant | Product and Growth Operator",
  summary:
    "Operator and builder with experience across media, digital health, and consumer brands. Built and helped launch billion-dollar brands, scaled digital health systems, and now designs AI agent workflows for CPG, real estate, tourism, operations, and career systems through Just Be You AI Systems.",
  highlights: [
    "Sony, 2004-2009: production and media operations across high-pressure creative environments.",
    "Beachbody, 2009-2014: product launches and growth systems for brands including P90X and Shakeology.",
    "Optum, Rally Health, and Real Appeal, 2015-2023: digital health platforms, operating systems, and cross-functional execution.",
    "Board-level involvement scaling a beverage company to 15 states and 1500+ retail accounts.",
    "Current focus: AI agent workflows for CPG, real estate, tourism, operations, and growth teams.",
  ],
};

const modules = [
  "Resume",
  "Tailored Fit",
  "7 Day Sprint",
  "Recruiter Outreach",
  "Cover Letter",
  "Follow Up",
  "Positioning Narrative",
];

let activeModule = "Resume";
let generated = {};

const form = document.querySelector("#jobBuilderForm");
const moduleTabs = document.querySelector("#moduleTabs");
const output = document.querySelector("#moduleOutput");
const strategy = document.querySelector("#moduleStrategy");
const workflow = document.querySelector("#moduleWorkflow");
const moduleEyebrow = document.querySelector("#moduleEyebrow");
const moduleTitle = document.querySelector("#moduleTitle");
const copyOutput = document.querySelector("#copyOutput");
const copyAll = document.querySelector("#copyAll");
const printPack = document.querySelector("#printPack");
const downloadPack = document.querySelector("#downloadPack");
const targetForm = document.querySelector("#targetForm");
const targetList = document.querySelector("#targetList");
const clearTargets = document.querySelector("#clearTargets");
const linkedinPost = document.querySelector("#linkedinPost");
const copyPost = document.querySelector("#copyPost");
let targets = JSON.parse(localStorage.getItem("jobHunterTargets") || "[]");

function getData() {
  return Object.fromEntries(new FormData(form).entries());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function bullets(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function workflowBlock(input, processing, outputText, review, repeatable) {
  return [
    ["Input", input],
    ["AI processing", processing],
    ["Output", outputText],
    ["Human review point", review],
    ["Repeatable system", repeatable],
  ];
}

function analyzeJobPost(text = "") {
  const normalized = text.toLowerCase();
  const categories = [
    {
      label: "AI implementation",
      keywords: ["genai", "generative ai", "ai", "automation", "agent", "workflow"],
      angle:
        "practical GenAI implementation, workflow design, automation, and human-in-the-loop operating systems",
    },
    {
      label: "Product leadership",
      keywords: ["product", "roadmap", "platform", "user experience", "launch", "strategy"],
      angle:
        "product leadership, roadmap judgment, launch execution, and platform operating experience",
    },
    {
      label: "Growth and GTM",
      keywords: ["growth", "go-to-market", "sales", "revenue", "marketing", "pipeline"],
      angle:
        "growth systems, go-to-market execution, sales enablement, and revenue workflow design",
    },
    {
      label: "Operations",
      keywords: ["operations", "process", "cross-functional", "stakeholder", "execution", "scale"],
      angle:
        "cross-functional execution, operating rhythm, process design, and scalable systems",
    },
    {
      label: "Digital health",
      keywords: ["health", "healthcare", "patient", "member", "clinical", "wellness"],
      angle:
        "digital health platform experience, member journeys, behavior change systems, and enterprise execution",
    },
    {
      label: "Consumer and CPG",
      keywords: ["consumer", "brand", "retail", "cpg", "distributor", "commerce"],
      angle:
        "consumer brand building, retail growth, distributor workflows, and CPG operating experience",
    },
  ];

  const scored = categories
    .map((category) => ({
      ...category,
      score: category.keywords.reduce(
        (total, keyword) => total + (normalized.includes(keyword) ? 1 : 0),
        0,
      ),
    }))
    .filter((category) => category.score > 0)
    .sort((a, b) => b.score - a.score);

  const priorities = scored.slice(0, 4);
  const missing = categories
    .filter((category) => !priorities.some((item) => item.label === category.label))
    .slice(0, 2);

  return {
    hasPost: normalized.trim().length > 0,
    priorities,
    missing,
    angle:
      priorities.map((item) => item.angle).join("; ") ||
      "AI workflow design, product execution, growth systems, and operator judgment",
    keywords:
      priorities.flatMap((item) => item.keywords).slice(0, 12).join(", ") ||
      "AI workflow design, GenAI implementation, product operations, growth systems",
  };
}

function getTailoringSummary(data) {
  const analysis = analyzeJobPost(data.jobPost);
  if (!analysis.hasPost) {
    return {
      analysis,
      sentence:
        "No job post has been pasted yet, so outputs use the default AI workflow, product, growth, and operator positioning.",
    };
  }
  return {
    analysis,
    sentence: `Tailored around ${analysis.angle}.`,
  };
}

function generateResume(data) {
  const tailoring = getTailoringSummary(data);
  const deliverable = `
<h4>${profile.name}</h4>
<p><strong>${profile.headline}</strong></p>
<p>${profile.summary}</p>
<h4>Tailored Role Match</h4>
<p>${escapeHtml(tailoring.sentence)}</p>
<h4>Target Roles</h4>
${bullets([
  "AI Workflow Design",
  "AI Automation and GenAI Implementation",
  "Product Leadership",
  "Growth Operations",
  "Fractional AI Systems Consulting",
])}
<h4>Selected Experience</h4>
${bullets([
  "Designed AI workflow systems that convert messy business inputs into structured outputs, review points, follow-up actions, and reusable operating templates.",
  "Built product, media, and growth systems across Sony, Beachbody, Optum, Rally Health, Real Appeal, and emerging consumer brands.",
  "Helped launch and scale major consumer products including P90X and Shakeology, connecting positioning, execution, production, and go-to-market operations.",
  "Built digital health operating systems and platform workflows across enterprise environments from 2015 to 2023.",
  "Contributed at board level to beverage brand growth across 15 states and 1500+ retail accounts.",
  "Currently building AI agent systems through Just Be You AI Systems for CPG, real estate, tourism, career, and operations use cases.",
])}
<h4>AI Workflow Capability</h4>
${bullets([
  "Map manual processes into agent workflows with defined inputs, outputs, escalation rules, and human approval points.",
  "Create reusable prompt systems for lead response, sales follow-up, production planning, investor outreach, and operating reports.",
  "Translate business goals into practical AI systems that improve speed, consistency, and execution quality.",
  `Adapt AI workflow narratives to role-specific keywords including ${tailoring.analysis.keywords}.`,
])}
<h4>Positioning Summary</h4>
<p>Senior operator who can bridge business context, product execution, growth systems, and AI workflow implementation. Strong fit for ${escapeHtml(data.targetRole)} opportunities where companies need practical GenAI adoption tied to business outcomes.</p>`;

  return {
    title: "Senior positioning resume",
    eyebrow: "Resume generator",
    deliverable,
    strategy:
      "This resume leads with operator credibility and business impact, then connects that history to AI workflow implementation. When a job post is pasted, it adds a role-match layer and keyword emphasis without changing the core truth of your background.",
    workflow: workflowBlock(
      "Career history, target role, target industry, proof points, and role keywords.",
      "Extracts the strongest business outcomes, maps them to AI workflow language, and rewrites experience around scale, systems, implementation, and operator judgment.",
      "ATS-friendly resume sections with headline, summary, selected experience, AI capability, and positioning summary.",
      "You verify dates, exact titles, measurable metrics, and any claims before sending.",
      "Each target role gets a variant by swapping keywords, proof points, and the positioning summary while preserving the core career architecture.",
    ),
  };
}

function generateTailoredFit(data) {
  const tailoring = getTailoringSummary(data);
  const priorities = tailoring.analysis.priorities.length
    ? tailoring.analysis.priorities
    : [
        {
          label: "AI implementation",
          angle:
            "practical AI workflow design, human review points, and repeatable operating systems",
          keywords: ["AI", "workflow", "automation", "implementation"],
        },
        {
          label: "Product and growth",
          angle:
            "product execution, go-to-market systems, and operator-level business judgment",
          keywords: ["product", "growth", "operations"],
        },
      ];

  const gaps = tailoring.analysis.missing.length
    ? tailoring.analysis.missing.map((item) => item.label)
    : ["Role-specific metrics", "Company-specific language"];

  const deliverable = `
<h4>Role Match Summary</h4>
<p>${escapeHtml(tailoring.sentence)}</p>
<h4>Likely Hiring Priorities</h4>
${bullets(priorities.map((item) => `${item.label}: emphasize ${item.angle}.`))}
<h4>Resume Adjustments</h4>
${bullets([
  `Use this headline variant: AI Workflow Consultant and Product/Growth Operator for ${data.targetRole}.`,
  `Move the strongest proof point higher: ${data.proofPoint}.`,
  `Add a short role-match line using these keywords: ${tailoring.analysis.keywords}.`,
  "Keep the core story grounded in Sony, Beachbody, Optum/Rally/Real Appeal, CPG scaling, and current AI systems work.",
])}
<h4>Outreach Angle</h4>
<p>Lead with the company's likely need for ${escapeHtml(priorities[0].angle)}. Then connect your operator background to building repeatable AI workflows, not just experimenting with AI tools.</p>
<h4>Watchouts Before Sending</h4>
${bullets(gaps.map((gap) => `Check whether the job post requires stronger evidence for ${gap}.`))}`;

  return {
    title: "Job-specific tailoring plan",
    eyebrow: "Job post tailor",
    deliverable,
    strategy:
      "This module turns a pasted job post into a practical adaptation plan. It keeps the core narrative intact, then shifts emphasis toward the company's likely priorities and language.",
    workflow: workflowBlock(
      "Job post, target role, company challenge, proof point, and career profile.",
      "Scans for priority signals across AI implementation, product, growth, operations, health, and CPG language.",
      "A role-specific fit summary, resume adjustments, outreach angle, and watchouts.",
      "You verify the inferred priorities and add specific company details before sending.",
      "Paste each new job post, regenerate the pack, and keep a saved variant per high-fit opportunity.",
    ),
  };
}

function generateSprint(data) {
  const tailoring = getTailoringSummary(data);
  const days = [
    [
      "Day 1",
      "Finalize target role lanes: AI workflow consultant, GenAI implementation lead, product/growth operator, and fractional AI systems consultant. Update LinkedIn headline and resume summary around AI Agent Operator plus Product and Growth Operator.",
    ],
    [
      "Day 2",
      "Build a list of 30 targets: 10 recruiters, 10 hiring managers, 5 founders, and 5 consulting prospects in digital health, CPG, real estate, tourism, and operations-heavy companies.",
    ],
    [
      "Day 3",
      `Send 10 recruiter messages using the 75-word outreach. Prioritize roles mentioning ${tailoring.analysis.keywords}.`,
    ],
    [
      "Day 4",
      "Post one LinkedIn workflow breakdown using the Real Estate Production System or CPG Launch System. Message 5 warm contacts asking for intros to AI adoption or product leadership teams.",
    ],
    [
      "Day 5",
      "Apply to 5 high-fit roles with a tailored resume and cover letter. Track every submission, contact, reply, and follow-up date in a simple pipeline.",
    ],
    [
      "Day 6",
      "Send 5 founder or operator messages offering a narrow AI workflow audit. Position it as a practical way to turn one manual process into a repeatable system.",
    ],
    [
      "Day 7",
      "Review response rates, tighten messaging, follow up with every warm reply, and package the strongest workflow demo as a PDF or link for interviews.",
    ],
  ];

  return {
    title: "7-day execution plan",
    eyebrow: "7 day job sprint generator",
    deliverable: `<div class="day-list">${days
      .map(
        ([day, text]) =>
          `<div><strong>${day}</strong><p>${escapeHtml(text)}</p></div>`,
      )
      .join("")}</div>`,
    strategy:
      "The sprint balances full-time job search, consulting lead generation, and public proof. It does not wait for applications to work. It creates direct conversations with recruiters, founders, hiring managers, and warm network contacts.",
    workflow: workflowBlock(
      "Target role, opportunity type, strongest proof point, contact type, and target industry.",
      "Segments the market, sequences outreach, creates daily actions, and pairs job search activity with visible AI workflow proof.",
      "A practical 7-day plan with actions, outreach targets, positioning guidance, and what to send.",
      "You choose the actual target list and adjust language based on relationship strength.",
      "Run the sprint weekly, measure response rates, then update the target list, message angle, and follow-up cadence.",
    ),
  };
}

function generateRecruiterEmail(data) {
  const tailoring = getTailoringSummary(data);
  const deliverable = `Hi [Name], I am exploring ${data.opportunityType.toLowerCase()} opportunities where ${tailoring.analysis.angle} matter. My background spans Sony production, Beachbody launches, Optum/Rally/Real Appeal systems, board-level CPG scaling, and current AI agent workflow builds. The fit is practical implementation: turning manual work into repeatable business operations. If you are covering ${data.targetRole} roles, open to quick conversation this week?`;

  return {
    title: "75-word cold recruiter email",
    eyebrow: "Recruiter outreach generator",
    deliverable: `<p>${escapeHtml(deliverable)}</p>`,
    strategy:
      "The email is direct and confident. It names the lane, compresses proof into one sentence, and asks for a low-friction conversation instead of asking the recruiter to solve the whole job search.",
    workflow: workflowBlock(
      "Target role, opportunity type, contact type, strongest proof point, and career highlights.",
      "Ranks the strongest credibility signals and turns them into a short message with role keywords and a clear ask.",
      "A concise cold email for recruiters, hiring managers, founders, or advisors.",
      "You personalize the first line and confirm the role lane is relevant before sending.",
      "The same engine can generate variants by contact type, company category, and proof point.",
    ),
  };
}

function generateCoverLetter(data) {
  const tailoring = getTailoringSummary(data);
  const deliverable = `I have helped turn operating environments into systems that move faster, scale better, and create measurable value. That is the work I would bring to ${data.targetCompany}.

Your challenge is not just adopting AI. It is turning scattered manual work into repeatable workflows that improve speed, consistency, customer experience, and operating leverage. For this role, I would emphasize ${tailoring.analysis.angle}. My background fits: Sony production operations, Beachbody launches including P90X and Shakeology, digital health platform work across Optum, Rally Health, and Real Appeal, and board-level involvement scaling a beverage company to 15 states and 1500+ retail accounts.

I now design AI agent workflows through Just Be You AI Systems across CPG, real estate, tourism, operations, and career systems. I bring operator judgment to define the workflow, a product lens to make it usable, and growth instinct to tie it to outcomes.

For a ${data.targetRole} role, I would help your team move from AI experimentation to disciplined execution.`;

  return {
    title: "180-word cover letter",
    eyebrow: "Cover letter generator",
    deliverable: `<p>${escapeHtml(deliverable).replaceAll("\n\n", "</p><p>")}</p>`,
    strategy:
      "The letter opens with a result, then connects your experience to the company's operating challenge. It avoids generic enthusiasm and instead makes a direct argument for why your operator background fits AI implementation work.",
    workflow: workflowBlock(
      "Target company, target role, company challenge, and proof points.",
      "Matches your career evidence to the company's likely business problem and writes a direct senior-level case.",
      "A concise cover letter that can be tailored by company, role, and challenge.",
      "You add one company-specific sentence after researching the business, product, or hiring need.",
      "Each role gets the same structure: result, challenge, proof, current AI focus, closing argument.",
    ),
  };
}

function generateFollowUp(data) {
  const deliverable = `Thanks again for the conversation. I see a strong fit between your need to make AI practical inside daily operations and my background building product, growth, media, health, and CPG systems. One additional point: I can help define the human review points that make AI workflows safe, useful, and repeatable. A good next step would be a working session on one manual process your team wants to improve.`;

  return {
    title: "Post-call follow-up message",
    eyebrow: "Follow up message generator",
    deliverable: `<p>${escapeHtml(deliverable)}</p>`,
    strategy:
      "The follow-up restates fit in one sentence, adds a new value point around human review, and proposes a concrete next step instead of drifting into vague appreciation.",
    workflow: workflowBlock(
      "Interview notes, company challenge, role target, and strongest value point.",
      "Summarizes fit, adds one new insight, and creates a next-step ask tied to business value.",
      "A warm follow-up message under 100 words.",
      "You add one specific detail from the conversation before sending.",
      "After every call, the system generates a follow-up, logs next step, and schedules a reminder.",
    ),
  };
}

function generateNarrative(data) {
  const deliverable = `
<p>I am an operator and builder who has worked across media, digital health, and consumer brands, and I now design AI agent workflows that turn manual work into scalable business operations.</p>
<p>My career started in production and media at Sony, then moved into product launches and growth systems at Beachbody, including P90X and Shakeology. From 2015 to 2023, I worked across Optum, Rally Health, and Real Appeal building digital health platforms and operating systems. I have also contributed at board level to scaling a beverage company across 15 states and 1500+ retail accounts.</p>
<p>The through-line is systems: taking complex work, organizing the inputs, clarifying the handoffs, and building repeatable execution. My current focus through Just Be You AI Systems is applying that operator lens to AI agent workflows for CPG, real estate, tourism, operations, and career systems.</p>
<p>I do not just use AI tools. I design workflows where AI handles speed, structure, drafting, and analysis while humans keep judgment, context, approvals, and strategy.</p>`;

  return {
    title: "Positioning narrative",
    eyebrow: "Positioning narrative generator",
    deliverable,
    strategy:
      "The narrative creates a through-line from media to consumer product launches to digital health to CPG scaling to AI workflow design. It makes the career feel intentional and gives interviewers a simple way to understand the pivot.",
    workflow: workflowBlock(
      "Career milestones, current focus, target role, and positioning pillars.",
      "Finds the through-line across industries and turns it into a concise operator narrative.",
      "A spoken or written narrative for LinkedIn, interviews, recruiter screens, and consulting calls.",
      "You tune the emphasis depending on whether the audience cares more about AI, product, growth, or operations.",
      "The same narrative becomes LinkedIn About copy, interview answer, intro email, and website positioning.",
    ),
  };
}

function generateLinkedInPost(data) {
  const posts = {
    "AI workflows need human review points": [
      "AI workflow design is not just about making the model generate output.",
      "The real work is deciding where the human stays in control.",
      "For any useful agent system, I want to know:",
      "- What input is trusted?",
      "- What does AI draft or analyze?",
      "- What needs human approval?",
      "- What gets tracked after the handoff?",
      "That is the difference between a tool demo and an operating system.",
    ],
    "Companies need AI operators, not tool collectors": [
      "The next valuable AI role is not someone who has tried every new tool.",
      "It is someone who can look at a messy business process and turn it into a repeatable workflow.",
      "Inputs. Agents. Outputs. Human review. Follow-up. Measurement.",
      `That is the work I am focused on now: ${data.targetRole} opportunities where practical implementation matters more than hype.`,
    ],
    "Manual workflows are the real AI opportunity": [
      "The best AI opportunities are usually hiding inside boring manual workflows.",
      "Lead follow-up. Sales notes. Investor outreach. Production planning. Weekly reporting. Customer support.",
      "If the workflow repeats, has clear inputs, and needs judgment before delivery, it can often become an AI-assisted system.",
      "The goal is not to remove people. The goal is to give them leverage.",
    ],
    "What CPG teams can automate without losing judgment": [
      "CPG teams do not need AI to replace founder judgment.",
      "They need AI to organize the messy middle: retail pitches, distributor follow-ups, investor updates, launch messaging, and account notes.",
      "The human still owns the story, claims, relationships, and strategy.",
      "The system handles structure, first drafts, consistency, and follow-up.",
    ],
  };
  return posts[data.postAngle] || posts["AI workflows need human review points"];
}

function generateAll() {
  const data = getData();
  generated = {
    Resume: generateResume(data),
    "Tailored Fit": generateTailoredFit(data),
    "7 Day Sprint": generateSprint(data),
    "Recruiter Outreach": generateRecruiterEmail(data),
    "Cover Letter": generateCoverLetter(data),
    "Follow Up": generateFollowUp(data),
    "Positioning Narrative": generateNarrative(data),
  };
}

function getFullPackText() {
  const data = getData();
  const sections = modules.map((module) => {
    const item = generated[module];
    const workflowText = item.workflow
      .map(([label, text]) => `${label}: ${text}`)
      .join("\n");
    return `${module.toUpperCase()}\n\n${stripHtml(item.deliverable)}\n\nStrategy:\n${item.strategy}\n\nAI workflow breakdown:\n${workflowText}`;
  });
  return [
    "JOB HUNTER AI AGENT BUILDER",
    `${profile.name} - ${profile.headline}`,
    `Target role: ${data.targetRole}`,
    `Target company or industry: ${data.targetCompany}`,
    "",
    sections.join("\n\n---\n\n"),
    "",
    "LINKEDIN POST",
    generateLinkedInPost(data).join("\n"),
  ].join("\n");
}

function stripHtml(html) {
  const holder = document.createElement("div");
  holder.innerHTML = html;
  return holder.innerText.trim();
}

function renderTabs() {
  moduleTabs.innerHTML = modules
    .map(
      (module) =>
        `<button class="example-tab ${module === activeModule ? "active" : ""}" type="button" data-module="${module}">
          <strong>${module}</strong>
          <span>${module === "7 Day Sprint" ? "Execution plan" : "Generated asset"}</span>
        </button>`,
    )
    .join("");
}

function renderWorkflow(items) {
  workflow.innerHTML = items
    .map(
      ([label, text]) => `
      <div class="breakdown-card">
        <span>${escapeHtml(label)}</span>
        <p>${escapeHtml(text)}</p>
      </div>`,
    )
    .join("");
}

function renderModule() {
  const module = generated[activeModule];
  moduleEyebrow.textContent = module.eyebrow;
  moduleTitle.textContent = module.title;
  output.innerHTML = module.deliverable;
  strategy.textContent = module.strategy;
  renderWorkflow(module.workflow);
  renderTabs();
}

function renderLinkedInPost() {
  linkedinPost.innerHTML = generateLinkedInPost(getData())
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function saveTargets() {
  localStorage.setItem("jobHunterTargets", JSON.stringify(targets));
}

function renderTargets() {
  if (!targets.length) {
    targetList.innerHTML =
      '<p class="empty-state">Add 10 recruiters, 5 hiring managers, and 5 founders or consulting prospects for today.</p>';
    return;
  }

  targetList.innerHTML = targets
    .map(
      (target, index) => `
      <div class="target-item ${target.done ? "done" : ""}">
        <label class="target-check">
          <input type="checkbox" ${target.done ? "checked" : ""} data-target-index="${index}" />
          <span>
            <strong>${escapeHtml(target.name)}</strong>
            <small>${escapeHtml(target.type)}</small>
          </span>
        </label>
        <button type="button" data-remove-index="${index}" aria-label="Remove target">Remove</button>
      </div>`,
    )
    .join("");
}

function renderProof() {
  const cases = [
    {
      name: "Real Estate Production System",
      input: "Listing details, property highlights, agent notes, brand style, and delivery timeline.",
      output: "Scripts, shot lists, captions, production notes, and delivery checklist.",
      review: "Agent or producer approves facts, tone, compliance, and creative direction.",
    },
    {
      name: "CPG Launch System",
      input: "Product brief, retail targets, distributor context, buyer objections, and brand voice.",
      output: "Messaging, distributor outreach, retail pitch, sell sheet angles, and follow-up sequence.",
      review: "Founder or sales lead approves claims, channel strategy, and commercial terms.",
    },
    {
      name: "Investor Outreach System",
      input: "Investor list, thesis match, company story, traction, deck, and warm intro context.",
      output: "Personalized investor emails, follow-ups, meeting prep, and pipeline updates.",
      review: "Founder approves investor fit, claims, tone, and timing before send.",
    },
    {
      name: "Career System",
      input: "Career history, target role, job description, recruiter contact, and proof points.",
      output: "Resume variant, outreach, cover letter, follow-up, and positioning narrative.",
      review: "Candidate verifies accuracy, voice, company fit, and final send decision.",
    },
    {
      name: "Operations System",
      input: "Project goals, stakeholders, timeline, risks, dependencies, and existing tools.",
      output: "Execution plan, owner assignments, risk checklist, status updates, and next steps.",
      review: "Operator confirms priorities, deadlines, sensitive details, and accountability.",
    },
  ];

  document.querySelector("#workflowProof").innerHTML = cases
    .map(
      (item) => `
      <article class="system-card proof-card">
        <span class="icon">${escapeHtml(item.name.slice(0, 2).toUpperCase())}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <p><strong>Input:</strong> ${escapeHtml(item.input)}</p>
        <p><strong>Output:</strong> ${escapeHtml(item.output)}</p>
        <p><strong>Human review:</strong> ${escapeHtml(item.review)}</p>
      </article>`,
    )
    .join("");
}

moduleTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-module]");
  if (!tab) return;
  activeModule = tab.dataset.module;
  renderModule();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generateAll();
  renderModule();
  renderLinkedInPost();
  document.querySelector("#outputs").scrollIntoView({ behavior: "smooth" });
});

form.addEventListener("input", () => {
  generateAll();
  renderModule();
  renderLinkedInPost();
});

copyOutput.addEventListener("click", async () => {
  const text = output.innerText.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyOutput.textContent = "Copied";
    setTimeout(() => {
      copyOutput.textContent = "Copy Output";
    }, 1300);
  } catch {
    copyOutput.textContent = "Select Text";
  }
});

copyAll.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(getFullPackText());
    copyAll.textContent = "Copied Pack";
    setTimeout(() => {
      copyAll.textContent = "Copy Full Pack";
    }, 1300);
  } catch {
    copyAll.textContent = "Select Text";
  }
});

printPack.addEventListener("click", () => {
  window.print();
});

downloadPack.addEventListener("click", () => {
  const blob = new Blob([getFullPackText()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "job-hunter-ai-agent-builder.txt";
  link.click();
  URL.revokeObjectURL(url);
});

targetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(targetForm).entries());
  if (!data.targetName.trim()) return;
  targets = [
    ...targets,
    {
      name: data.targetName.trim(),
      type: data.targetType,
      done: false,
    },
  ];
  targetForm.reset();
  saveTargets();
  renderTargets();
});

targetList.addEventListener("click", (event) => {
  const checkbox = event.target.closest("[data-target-index]");
  const removeButton = event.target.closest("[data-remove-index]");
  if (checkbox) {
    targets[Number(checkbox.dataset.targetIndex)].done = checkbox.checked;
    saveTargets();
    renderTargets();
  }
  if (removeButton) {
    targets = targets.filter(
      (_, index) => index !== Number(removeButton.dataset.removeIndex),
    );
    saveTargets();
    renderTargets();
  }
});

clearTargets.addEventListener("click", () => {
  targets = [];
  saveTargets();
  renderTargets();
});

copyPost.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(linkedinPost.innerText.trim());
    copyPost.textContent = "Copied";
    setTimeout(() => {
      copyPost.textContent = "Copy Post";
    }, 1300);
  } catch {
    copyPost.textContent = "Select Text";
  }
});

generateAll();
renderTabs();
renderModule();
renderLinkedInPost();
renderTargets();
renderProof();
