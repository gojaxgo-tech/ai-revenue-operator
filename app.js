const examples = {
  lead: {
    label: "AI Lead Concierge",
    category: "Sales",
    businessType: "Local service business with inbound website, phone, and social leads",
    workflow:
      "New leads arrive through forms, missed calls, DMs, and email. The team replies when they can, answers the same questions repeatedly, and follows up manually.",
    painPoint:
      "Response times are inconsistent, warm leads go cold, and the owner does not have a reliable view of which inquiries need attention.",
    tools: "Website form, Gmail, phone, Instagram DMs, calendar link, spreadsheet",
    teamSize: "4",
    outcome:
      "Respond to every lead quickly, qualify interest, answer common questions, and hand off to a real person when the lead is ready.",
    priority: "Sales",
  },
  cpg: {
    label: "CPG Launch System",
    category: "Growth",
    businessType: "Functional beverage brand preparing retail, distributor, and investor conversations",
    workflow:
      "The team manually creates investor updates, distributor notes, retail pitches, launch messaging, and follow-up emails from scattered documents.",
    painPoint:
      "The story changes by audience, takes too long to personalize, and is hard to keep consistent across sales and fundraising.",
    tools: "Gmail, LinkedIn, Google Docs, CRM, pitch deck, retail target list",
    teamSize: "5",
    outcome:
      "Create consistent sales and investor materials from one approved brand brief.",
    priority: "Sales",
  },
  production: {
    label: "Production System",
    category: "Production",
    businessType: "Real estate media company producing listing videos and social content",
    workflow:
      "Listing information is manually turned into video scripts, captions, shot lists, production notes, and delivery checklists.",
    painPoint:
      "Creative planning takes too long, outputs vary by listing, and details can get missed between intake and delivery.",
    tools: "Google Sheets, email, Canva, Premiere, ChatGPT, shared drive",
    teamSize: "3",
    outcome:
      "Turn each listing into a repeatable content package with faster planning and clearer production handoffs.",
    priority: "Production",
  },
  ops: {
    label: "Operations Command",
    category: "Operations",
    businessType: "Live event and production team managing multi-vendor projects",
    workflow:
      "Vendors, timelines, permits, run-of-show notes, stakeholder emails, and risk checklists are coordinated across calls, docs, and spreadsheets.",
    painPoint:
      "Important details are scattered across emails, calls, docs, and spreadsheets, so status updates take too much manual coordination.",
    tools: "Email, Google Docs, Sheets, calendar, task lists, shared folders",
    teamSize: "8",
    outcome:
      "Turn event planning into a structured operations command center with clear owners, timelines, risks, and updates.",
    priority: "Operations",
  },
  career: {
    label: "Career Accelerator",
    category: "Recruiting",
    businessType: "Executive job search or founder returning to the market",
    workflow:
      "Experience is matched to roles, resumes are customized, recruiter emails are written, and applications are tracked manually.",
    painPoint:
      "Positioning is unclear, each application takes too much manual work, and follow-up is inconsistent.",
    tools: "LinkedIn, job boards, resume docs, Gmail, Sheets",
    teamSize: "1",
    outcome:
      "Create a repeatable system for targeted applications, recruiter outreach, and follow-up.",
    priority: "Recruiting",
  },
};

const priorities = [
  "Sales",
  "Marketing",
  "Operations",
  "Customer support",
  "Production",
  "Recruiting",
];

const form = document.querySelector("#workflowForm");
const tabs = document.querySelector("#exampleTabs");
const selectedLabel = document.querySelector("#selectedLabel");
let currentKey = "lead";

function estimateImpact(data) {
  const team = Number(data.teamSize) || 1;
  const priorityBase = {
    Production: 13,
    Sales: 11,
    Marketing: 9,
    Operations: 10,
    "Customer support": 12,
    Recruiting: 8,
  };
  return Math.min(46, (priorityBase[data.priority] || 8) + team * 3);
}

function generatePlan(data) {
  const timeSaved = estimateImpact(data);
  const outputAgent =
    data.priority === "Production"
      ? "Creative Output Agent"
      : data.priority === "Sales"
        ? "Revenue Output Agent"
        : data.priority === "Customer support"
          ? "Response Agent"
          : "Execution Agent";

  const agents = [
    {
      name: "Intake Agent",
      purpose: `Collects the key details from ${data.businessType || "the business"} and converts scattered inputs into a clean operating brief.`,
    },
    {
      name: "Analysis Agent",
      purpose: `Reviews the workflow, flags bottlenecks, and identifies where ${data.painPoint || "manual work"} is slowing the team down.`,
    },
    {
      name: outputAgent,
      purpose: `Creates usable first drafts and structured outputs tied to the goal: ${data.outcome || "faster execution"}.`,
    },
    {
      name: "Human Handoff Agent",
      purpose:
        "Summarizes context, routes decisions to the right person, drafts follow-ups, and keeps the system from pretending to replace judgment.",
    },
  ];

  const deliverablesByPriority = {
    Production: [
      "Source brief",
      "Script outline",
      "Shot list",
      "Production notes",
      "Delivery checklist",
    ],
    Sales: [
      "Lead summary",
      "Qualification questions",
      "Sales or booking response",
      "Objection handling",
      "Follow-up sequence",
    ],
    Marketing: [
      "Campaign angles",
      "Audience messages",
      "Social captions",
      "Landing page copy",
      "Content calendar",
    ],
    Operations: [
      "Task plan",
      "Timeline",
      "Owner assignments",
      "Risk checklist",
      "Status update",
    ],
    "Customer support": [
      "Support summary",
      "Response draft",
      "Escalation rules",
      "FAQ update",
      "Resolution report",
    ],
    Recruiting: [
      "Target role map",
      "Resume angle",
      "Recruiter message",
      "Follow-up cadence",
      "Application tracker",
    ],
  };

  return {
    timeSaved,
    diagnosis: `${data.businessType || "This team"} is losing time because the current process depends on manual coordination across ${data.tools || "multiple tools"}. The biggest bottleneck is ${data.painPoint || "inconsistent execution"}. The opportunity is to turn this into a repeatable AI-assisted workflow that moves faster while leaving strategy, tone, approvals, and sensitive decisions with people.`,
    agents,
    deliverables:
      deliverablesByPriority[data.priority] || deliverablesByPriority.Operations,
    reviewPoints: [
      "Approve the source brief before the system generates external-facing outputs",
      "Review tone, accuracy, and business context before anything is sent",
      "Keep pricing, legal claims, customer-sensitive details, and strategy decisions with the team",
      "Use AI for speed, structure, and consistency while preserving human judgment",
    ],
    roadmap: [
      {
        label: "Week 1",
        text: "Audit the current workflow, inputs, tools, and bottlenecks.",
      },
      {
        label: "Week 2",
        text: "Build the first prompt system, handoff rules, and reusable outputs.",
      },
      {
        label: "Week 3",
        text: "Test with real examples, refine tone, and define review points.",
      },
      {
        label: "Week 4",
        text: "Launch, measure time saved, and tune the system from live usage.",
      },
    ],
  };
}

function getFormData() {
  return Object.fromEntries(new FormData(form).entries());
}

function setFormData(data) {
  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
}

function renderTabs() {
  tabs.innerHTML = Object.entries(examples)
    .map(
      ([key, item]) => `
        <button class="example-tab ${key === currentKey ? "active" : ""}" type="button" data-key="${key}">
          <strong>${item.label}</strong>
          <span>${item.category}</span>
        </button>
      `,
    )
    .join("");
}

function renderPriorityOptions() {
  form.elements.priority.innerHTML = priorities
    .map((priority) => `<option value="${priority}">${priority}</option>`)
    .join("");
}

function renderPlan() {
  const data = getFormData();
  const plan = generatePlan(data);
  document.querySelector("#impactPill").textContent =
    `${plan.timeSaved}% less manual planning`;
  document.querySelector("#diagnosis").textContent = plan.diagnosis;

  document.querySelector("#agents").innerHTML = plan.agents
    .map(
      (agent) => `
        <div class="agent-card">
          <h4>${agent.name}</h4>
          <p>${agent.purpose}</p>
        </div>
      `,
    )
    .join("");

  const workflowSteps = [
    "Input",
    "AI Analysis",
    "Draft Output",
    "Human Review",
    "Delivery",
    "Tracking",
  ];
  document.querySelector("#workflowMap").innerHTML = workflowSteps
    .map(
      (step, index) => `
        <div class="map-step">
          <span>Step ${index + 1}</span>
          <strong>${step}</strong>
        </div>
      `,
    )
    .join("");

  document.querySelector("#deliverables").innerHTML = plan.deliverables
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.querySelector("#reviewPoints").innerHTML = plan.reviewPoints
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.querySelector("#roadmap").innerHTML = plan.roadmap
    .map(
      (item) => `
        <div class="roadmap-card">
          <span>${item.label}</span>
          <p>${item.text}</p>
        </div>
      `,
    )
    .join("");
}

tabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-key]");
  if (!tab) return;
  currentKey = tab.dataset.key;
  selectedLabel.textContent = examples[currentKey].label;
  setFormData(examples[currentKey]);
  renderTabs();
  renderPlan();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  currentKey = "";
  selectedLabel.textContent = "Custom workflow";
  renderTabs();
  renderPlan();
});

form.addEventListener("input", () => {
  selectedLabel.textContent = "Custom workflow";
  currentKey = "";
  renderTabs();
  renderPlan();
});

renderPriorityOptions();
renderTabs();
setFormData(examples[currentKey]);
renderPlan();
