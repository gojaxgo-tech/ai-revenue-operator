const revenueExamples = {
  sales: {
    label: "Inbound Lead Follow-Up",
    type: "Sales Automation",
    companyType: "B2B service company",
    businessProblem:
      "We receive inbound leads from our website but follow-up is inconsistent. Some leads wait hours or days before sales responds, and the team has no clear scoring or routing process.",
    goal:
      "Respond faster, qualify leads, route high-intent prospects to sales, and generate weekly pipeline reporting.",
    currentTools: "Website forms, Gmail, HubSpot, Google Sheets, Slack",
  },
  marketing: {
    label: "Content Engine",
    type: "Marketing Content Engine",
    companyType: "Founder-led CPG brand",
    businessProblem:
      "The team needs more sales content, investor updates, retail pitch copy, and social posts, but messaging is inconsistent and every asset starts from scratch.",
    goal:
      "Turn one approved product brief into audience-specific content for retail, distributors, investors, and social channels.",
    currentTools: "Google Docs, Canva, Gmail, LinkedIn, Shopify, Notion",
  },
  operations: {
    label: "Ops Command Center",
    type: "Operations Efficiency System",
    companyType: "Multi-location service business",
    businessProblem:
      "Operations updates are scattered across email, texts, spreadsheets, and meetings. Managers spend too much time chasing status and preparing updates.",
    goal:
      "Centralize inputs, summarize status, flag risks, assign owners, and generate weekly operating reports.",
    currentTools: "Email, Slack, Google Sheets, Asana, calendar, shared drive",
  },
};

const revenueForm = document.querySelector("#revenueForm");
const revenueExampleTabs = document.querySelector("#revenueExamples");
const workflowBadge = document.querySelector("#workflowBadge");
let currentRevenueExample = "sales";

function getRevenueData() {
  return Object.fromEntries(new FormData(revenueForm).entries());
}

function escapeRevenueHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripRevenueHtml(html) {
  const holder = document.createElement("div");
  holder.innerHTML = html;
  return holder.innerText.trim();
}

function setRevenueForm(data) {
  revenueForm.elements.companyType.value = data.companyType;
  revenueForm.elements.businessProblem.value = data.businessProblem;
  revenueForm.elements.goal.value = data.goal;
  revenueForm.elements.currentTools.value = data.currentTools;
  revenueForm.elements.workflowType.value = data.type;
  workflowBadge.textContent = data.type;
}

function renderRevenueExamples() {
  revenueExampleTabs.innerHTML = Object.entries(revenueExamples)
    .map(
      ([key, item]) => `
      <button class="example-tab ${key === currentRevenueExample ? "active" : ""}" type="button" data-revenue-example="${key}">
        <strong>${item.label}</strong>
        <span>${item.type}</span>
      </button>`,
    )
    .join("");
}

function getWorkflowConfig(type) {
  const configs = {
    "Sales Automation": {
      trigger: "Website form submission, booked-call request, inbound email, or demo request.",
      dataInput: "Name, email, company, role, budget, urgency, need, source, and message.",
      aiTask:
        "Score the lead, summarize need, draft personalized response, recommend next step, and assign priority.",
      humanReview:
        "Sales reviews high-value or ambiguous leads before custom outreach is sent.",
      output:
        "CRM record, lead score, personalized email, Slack alert, and follow-up sequence.",
      destination: "HubSpot or Salesforce lead record plus activity timeline.",
      followUp:
        "Send 3-touch sequence over 7 days and alert sales when a lead clicks, replies, or books.",
      metrics:
        "Speed to lead, qualification rate, meetings booked, conversion rate, pipeline created.",
      tools: ["Website form", "OpenAI or Claude", "HubSpot", "Slack", "Gmail", "Looker Studio"],
      crm: [
        "Lead source",
        "AI lead score",
        "Budget range",
        "Urgency",
        "Primary need",
        "Recommended next action",
        "Owner",
        "Follow-up status",
      ],
      before: [
        "Leads wait for manual review",
        "No consistent qualification",
        "Sales writes each reply from scratch",
        "Pipeline reporting is delayed",
      ],
      after: [
        "Instant response and lead summary",
        "AI scoring based on fit and urgency",
        "CRM record created automatically",
        "Weekly pipeline report generated",
      ],
      outreach:
        "Hi [Name], thanks for reaching out. Based on what you shared, it looks like your main priority is [need]. The fastest next step is a short call to confirm fit, timeline, and scope. Are you open to [two time options] this week?",
    },
    "Marketing Content Engine": {
      trigger: "New campaign brief, product launch, sales push, investor update, or content request.",
      dataInput: "Product brief, audience, offer, proof points, channel, brand voice, and CTA.",
      aiTask:
        "Generate audience angles, draft channel-specific content, repurpose approved messaging, and create publishing checklist.",
      humanReview:
        "Founder or marketing lead approves claims, tone, compliance, and final creative direction.",
      output:
        "Email, landing page copy, social posts, sales talking points, and content calendar.",
      destination: "Notion content database, Google Drive, CMS, or marketing calendar.",
      followUp:
        "Schedule posts, send campaign variants, and create performance summary after launch.",
      metrics:
        "Content velocity, engagement, email clicks, conversion rate, campaign-attributed pipeline.",
      tools: ["Google Docs", "OpenAI or Claude", "Canva", "Notion", "Mailchimp", "GA4"],
      crm: [
        "Campaign name",
        "Audience",
        "Channel",
        "CTA",
        "Asset status",
        "Approved message",
        "Launch date",
        "Performance notes",
      ],
      before: [
        "Every asset starts from scratch",
        "Messaging changes by audience",
        "Approvals are scattered",
        "Performance learnings are not reused",
      ],
      after: [
        "One brief generates multi-channel assets",
        "Messaging stays consistent",
        "Human approval is built into the flow",
        "Performance insights feed the next campaign",
      ],
      outreach:
        "We built a content engine around your approved product brief. The first draft includes buyer-facing copy, channel-specific posts, and a campaign CTA. Review the claim language first, then we can publish the approved variants.",
    },
    "Operations Efficiency System": {
      trigger: "Weekly status update, new project intake, missed deadline, support backlog, or manager request.",
      dataInput: "Project notes, tasks, owners, dates, blockers, customer issues, and source documents.",
      aiTask:
        "Summarize status, detect blockers, assign next steps, draft stakeholder update, and flag risk.",
      humanReview:
        "Operator confirms priorities, ownership, dates, customer-sensitive details, and final update.",
      output:
        "Task plan, risk checklist, owner assignments, stakeholder update, and weekly report.",
      destination: "Asana, Airtable, Notion, Google Sheets, or operations dashboard.",
      followUp:
        "Send reminders, update task status, escalate overdue items, and generate weekly leadership summary.",
      metrics:
        "Hours saved, overdue tasks, cycle time, blocker count, team response rate, on-time completion.",
      tools: ["Email", "Slack", "OpenAI or Claude", "Asana", "Airtable", "Google Sheets"],
      crm: [
        "Project",
        "Owner",
        "Status",
        "Priority",
        "Blocker",
        "Due date",
        "Escalation needed",
        "Last update",
      ],
      before: [
        "Updates are scattered across tools",
        "Managers chase status manually",
        "Risks surface too late",
        "Leadership reports take hours",
      ],
      after: [
        "Status inputs are centralized",
        "AI drafts updates and flags risks",
        "Owners and next steps are clear",
        "Reports are generated on schedule",
      ],
      outreach:
        "Here is the current operating summary: [status], [blocker], and [next step]. Please confirm owner and timing by end of day so the system can update the weekly report and escalate anything at risk.",
    },
  };
  return configs[type] || configs["Sales Automation"];
}

function estimateImpact(data) {
  const type = data.workflowType;
  const base = type === "Sales Automation" ? 28 : type === "Marketing Content Engine" ? 21 : 24;
  const complexity = Math.min(12, Math.ceil((data.businessProblem.length + data.currentTools.length) / 90));
  const speed = Math.min(74, base + complexity * 4);
  const hours = Math.min(32, 10 + complexity * 3);
  const revenue = type === "Sales Automation" ? 28000 + complexity * 4500 : type === "Marketing Content Engine" ? 16000 + complexity * 3000 : 12000 + complexity * 2500;
  return { speed, hours, revenue };
}

function generateRevenueWorkflow(data) {
  const config = getWorkflowConfig(data.workflowType);
  const impact = estimateImpact(data);
  const steps = [
    ["Trigger", config.trigger],
    ["Data input", config.dataInput],
    ["AI task", config.aiTask],
    ["Human review", config.humanReview],
    ["Output", config.output],
    ["CRM or database", config.destination],
    ["Follow-up automation", config.followUp],
    ["Reporting metrics", config.metrics],
  ];
  return { config, impact, steps };
}

function renderList(selector, items) {
  document.querySelector(selector).innerHTML = items.map((item) => `<li>${escapeRevenueHtml(item)}</li>`).join("");
}

function renderRevenueWorkflow() {
  const data = getRevenueData();
  const { config, impact, steps } = generateRevenueWorkflow(data);
  workflowBadge.textContent = data.workflowType;
  document.querySelector("#revenueImpactPill").textContent = data.workflowType;
  document.querySelector("#problemSummary").textContent =
    `${data.companyType} problem: ${data.businessProblem} Goal: ${data.goal}`;

  renderList("#beforeList", config.before);
  renderList("#afterList", config.after);
  renderList("#aiTasks", [
    config.aiTask,
    "Generate structured summary for the team",
    "Create next-best-action recommendation",
    "Produce weekly performance report",
  ]);
  renderList("#humanTasks", [
    config.humanReview,
    "Approve sensitive external messages",
    "Handle exceptions and strategic decisions",
    "Review KPI trends and improve the workflow",
  ]);
  renderList("#toolsStack", config.tools);
  renderList("#crmFields", config.crm);
  renderList("#kpiDashboard", config.metrics.split(", "));
  document.querySelector("#sampleOutreach").textContent = config.outreach;

  document.querySelector("#workflowSteps").innerHTML = steps
    .map(
      ([label, text], index) => `
      <article class="workflow-step-card">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h4>${escapeRevenueHtml(label)}</h4>
        <p>${escapeRevenueHtml(text)}</p>
      </article>`,
    )
    .join("");

  document.querySelector("#kpiImpact").innerHTML = [
    [`${impact.speed}%`, "estimated speed improvement"],
    [`${impact.hours}h`, "weekly manual time saved"],
    [`$${impact.revenue.toLocaleString()}`, "pipeline or value protected"],
    ["7 days", "prototype implementation"],
  ]
    .map(
      ([value, label]) => `
      <div>
        <strong>${value}</strong>
        <span>${label}</span>
      </div>`,
    )
    .join("");

  document.querySelector("#businessValue").textContent =
    "This matters because the workflow converts inconsistent manual execution into a measurable operating system. It improves response speed, reduces repetitive work, creates cleaner data, and gives leadership a weekly view of what is working.";

  document.querySelector("#implementationPlan").innerHTML = [
    ["Phase 1", "Map current workflow, fields, owners, tools, and failure points."],
    ["Phase 2", "Build prompt logic, routing rules, CRM fields, and sample outputs."],
    ["Phase 3", "Test with real examples, define review points, and tune tone."],
    ["Phase 4", "Launch, measure KPIs, and turn learnings into the next workflow."],
  ]
    .map(
      ([phase, text]) => `
      <div class="roadmap-card">
        <span>${phase}</span>
        <p>${text}</p>
      </div>`,
    )
    .join("");

  document.querySelector("#heroSpeed").textContent = `${impact.speed}%`;
  document.querySelector("#heroHours").textContent = `${impact.hours}h`;
  document.querySelector("#heroRevenue").textContent = `$${Math.round(impact.revenue / 1000)}k`;
}

function getRevenuePackText() {
  const data = getRevenueData();
  const { config, impact, steps } = generateRevenueWorkflow(data);
  return [
    "AI REVENUE OPERATOR",
    `Company type: ${data.companyType}`,
    `Workflow type: ${data.workflowType}`,
    `Business problem: ${data.businessProblem}`,
    `Goal: ${data.goal}`,
    `Current tools: ${data.currentTools}`,
    "",
    "WORKFLOW MAP",
    steps.map(([label, text]) => `${label}: ${text}`).join("\n"),
    "",
    "TOOLS STACK",
    config.tools.join(", "),
    "",
    "SAMPLE OUTREACH",
    config.outreach,
    "",
    "CRM FIELDS",
    config.crm.join(", "),
    "",
    "KPI DASHBOARD",
    config.metrics,
    "",
    "ESTIMATED IMPACT",
    `${impact.speed}% speed improvement, ${impact.hours} hours saved weekly, $${impact.revenue.toLocaleString()} pipeline or value protected.`,
  ].join("\n");
}

revenueExampleTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-revenue-example]");
  if (!tab) return;
  currentRevenueExample = tab.dataset.revenueExample;
  setRevenueForm(revenueExamples[currentRevenueExample]);
  renderRevenueExamples();
  renderRevenueWorkflow();
});

revenueForm.addEventListener("submit", (event) => {
  event.preventDefault();
  currentRevenueExample = "";
  renderRevenueExamples();
  renderRevenueWorkflow();
  document.querySelector("#output").scrollIntoView({ behavior: "smooth" });
});

revenueForm.addEventListener("input", () => {
  currentRevenueExample = "";
  renderRevenueExamples();
  renderRevenueWorkflow();
});

document.querySelector("#copyRevenuePack").addEventListener("click", async (event) => {
  try {
    await navigator.clipboard.writeText(getRevenuePackText());
    event.currentTarget.textContent = "Copied Workflow";
    setTimeout(() => {
      event.currentTarget.textContent = "Copy Full Workflow";
    }, 1300);
  } catch {
    event.currentTarget.textContent = "Select Text";
  }
});

document.querySelector("#downloadRevenuePack").addEventListener("click", () => {
  const blob = new Blob([getRevenuePackText()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-revenue-operator-workflow.txt";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#printRevenuePack").addEventListener("click", () => {
  window.print();
});

renderRevenueExamples();
setRevenueForm(revenueExamples[currentRevenueExample]);
renderRevenueWorkflow();
