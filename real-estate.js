const listingModules = [
  "Video Script",
  "Social Captions",
  "Listing Description",
  "Lead Funnel",
  "Production Handoff",
];

let activeListingModule = "Video Script";
let listingGenerated = {};

const listingForm = document.querySelector("#listingForm");
const listingTabs = document.querySelector("#listingTabs");
const listingOutput = document.querySelector("#listingOutput");
const listingEyebrow = document.querySelector("#listingEyebrow");
const listingTitle = document.querySelector("#listingTitle");
const listingWorkflow = document.querySelector("#listingWorkflow");
const copyListingOutput = document.querySelector("#copyListingOutput");
const copyListingPack = document.querySelector("#copyListingPack");
const downloadListingPack = document.querySelector("#downloadListingPack");
const printListingPack = document.querySelector("#printListingPack");

function getListingData() {
  return Object.fromEntries(new FormData(listingForm).entries());
}

function escapeListingHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripListingHtml(html) {
  const holder = document.createElement("div");
  holder.innerHTML = html;
  return holder.innerText.trim();
}

function listingBullets(items) {
  return `<ul>${items.map((item) => `<li>${escapeListingHtml(item)}</li>`).join("")}</ul>`;
}

function getListingFacts(data) {
  const notes = data.listingNotes || "";
  const fallback = "move-in-ready home with strong lifestyle appeal";
  const features = [
    "open-concept kitchen",
    "large island",
    "natural light",
    "updated primary suite",
    "landscaped backyard",
    "two-car garage",
    "schools",
    "parks",
    "restaurants",
    "commuter routes",
  ].filter((feature) => notes.toLowerCase().includes(feature));

  return {
    source: data.listingUrl || "Listing URL not provided",
    coreOffer: features.slice(0, 4).join(", ") || fallback,
    lifestyle: features.slice(4).join(", ") || "daily comfort, entertaining, and convenience",
    hook:
      data.buyerPersona === "Luxury buyer"
        ? "A polished home designed for comfort, privacy, and elevated daily living."
        : data.buyerPersona === "Investor"
          ? "A practical property story built around demand, location, and buyer appeal."
          : "A move-in-ready home with the space, flow, and location buyers are looking for.",
  };
}

function workflowBlock(input, processing, outputText, review, repeatable) {
  return [
    ["Input", input],
    ["AI processing", processing],
    ["Output", outputText],
    ["Human review", review],
    ["Repeatable system", repeatable],
  ];
}

function generateVideoScript(data) {
  const facts = getListingFacts(data);
  const deliverable = `
<h4>Short-Form Listing Video Script: 35-45 Seconds</h4>
<div class="production-table">
  <div><strong>Scene 1: Hook / Exterior</strong><p>Shot: Front exterior, clean push-in, neighborhood context.<br>VO: "${facts.hook}"<br>On-screen text: "${escapeListingHtml(data.location)} | ${escapeListingHtml(data.price)}"</p></div>
  <div><strong>Scene 2: Main Living Space</strong><p>Shot: Wide living area, natural light, movement toward kitchen.<br>VO: "Inside, the layout is open, bright, and built for the way people actually live."<br>On-screen text: "Open flow. Natural light. Easy living."</p></div>
  <div><strong>Scene 3: Kitchen Feature</strong><p>Shot: Island detail, cabinets, appliances, dining connection.<br>VO: "The kitchen anchors the home with ${escapeListingHtml(facts.coreOffer)}."<br>On-screen text: "The everyday gathering point."</p></div>
  <div><strong>Scene 4: Primary Suite / Lifestyle</strong><p>Shot: Primary bedroom, bath detail, quiet transition shot.<br>VO: "The private spaces give buyers the comfort and separation they want after a long day."<br>On-screen text: "Comfort where it counts."</p></div>
  <div><strong>Scene 5: Backyard / Location</strong><p>Shot: Backyard, patio, nearby lifestyle b-roll if available.<br>VO: "Outside, the setting supports ${escapeListingHtml(facts.lifestyle)}."<br>On-screen text: "Room to live, gather, and unwind."</p></div>
  <div><strong>Scene 6: CTA</strong><p>Shot: Best hero angle or agent walking shot.<br>VO: "Want the full details or a private tour? ${escapeListingHtml(data.cta)}."<br>On-screen text: "${escapeListingHtml(data.cta)}"</p></div>
</div>`;

  return {
    title: "Short-form listing video script",
    eyebrow: "Video script",
    deliverable,
    workflow: workflowBlock(
      "Listing URL, property notes, price, location, buyer persona, agent brand, and CTA.",
      "Identifies the strongest hook, organizes features into a visual sequence, and turns listing facts into scene-level production direction.",
      "Scene structure with shot direction, voiceover, on-screen text, and CTA.",
      "Producer verifies property claims, shot availability, fair housing compliance, and agent tone.",
      "Every listing follows the same intake to script to shoot list to editor handoff process.",
    ),
  };
}

function generateCaptions(data) {
  const facts = getListingFacts(data);
  const deliverable = `
<h4>Instagram Caption</h4>
<p>${escapeListingHtml(facts.hook)} This ${escapeListingHtml(data.location)} listing brings together ${escapeListingHtml(facts.coreOffer)} with the lifestyle details buyers notice fast. ${escapeListingHtml(data.cta)} for the full tour.</p>
<p>#RealEstate #${escapeListingHtml(data.location).replace(/[^a-z0-9]/gi, "")}Homes #ListingVideo #HomeTour #RealEstateMarketing</p>

<h4>TikTok Caption</h4>
<p>This ${escapeListingHtml(data.location)} home has the layout buyers keep asking for: ${escapeListingHtml(facts.coreOffer)}. Watch the full tour and ${escapeListingHtml(data.cta).toLowerCase()}.</p>
<p>#hometour #realestate #listingagent #dreamhome #moving</p>

<h4>YouTube Shorts Caption</h4>
<p>Tour this ${escapeListingHtml(data.location)} listing in under a minute. Key highlights: ${escapeListingHtml(facts.coreOffer)} plus ${escapeListingHtml(facts.lifestyle)}. Contact ${escapeListingHtml(data.agentName)} to ${escapeListingHtml(data.cta).toLowerCase()}.</p>`;

  return {
    title: "Platform-ready social captions",
    eyebrow: "Social captions",
    deliverable,
    workflow: workflowBlock(
      "Listing facts, target buyer, platform, CTA, and agent brand voice.",
      "Adapts the same property story into platform-specific length, tone, and behavior.",
      "Instagram, TikTok, and YouTube Shorts captions with CTA and hashtag direction.",
      "Agent checks claims, location wording, hashtags, and compliance-sensitive language.",
      "Caption templates can be reused across every property while swapping hook, features, and CTA.",
    ),
  };
}

function generateDescription(data) {
  const facts = getListingFacts(data);
  const deliverable = `
<h4>Conversion-Optimized Listing Description</h4>
<p>${escapeListingHtml(facts.hook)}</p>
<p>Located in ${escapeListingHtml(data.location)}, this listing is built around the details that make daily living easier: ${escapeListingHtml(facts.coreOffer)}. The floor plan gives buyers a clear sense of connection between the main living areas, while the private spaces offer the comfort and separation needed for real life.</p>
<p>The outdoor and location story adds another layer of value, with ${escapeListingHtml(facts.lifestyle)} supporting the way today's buyers want to live. Whether someone is planning quiet evenings at home, weekend gatherings, or a more convenient daily routine, this property gives them a strong reason to take the next step.</p>
<p><strong>Next step:</strong> ${escapeListingHtml(data.cta)} with ${escapeListingHtml(data.agentName)}.</p>`;

  return {
    title: "Conversion-focused listing description",
    eyebrow: "Listing description",
    deliverable,
    workflow: workflowBlock(
      "Property notes, location, price, buyer persona, differentiators, and CTA.",
      "Turns features into buyer benefits and structures the copy around hook, lifestyle, proof, and next step.",
      "A listing description ready for MLS, landing pages, email, or property pages.",
      "Agent verifies accuracy, required disclosures, forbidden language, and local compliance.",
      "The same conversion structure works across listings while preserving property-specific details.",
    ),
  };
}

function generateFunnel(data) {
  const facts = getListingFacts(data);
  const deliverable = `
<h4>Simple Lead Capture Funnel</h4>
<div class="production-table">
  <div><strong>Traffic Source</strong><p>Instagram Reel, TikTok, YouTube Shorts, email blast, agent website, and paid retargeting.</p></div>
  <div><strong>Landing Page Headline</strong><p>Tour this ${escapeListingHtml(data.location)} listing before the next wave of buyers sees it.</p></div>
  <div><strong>Subheadline</strong><p>Get the full listing packet, private showing options, and key details for ${escapeListingHtml(data.price)}.</p></div>
  <div><strong>Lead Magnet</strong><p>Full photo gallery, floor plan, property highlights, neighborhood notes, and showing availability.</p></div>
  <div><strong>Form Fields</strong><p>Name, email, phone, buying timeline, pre-approval status, preferred showing time.</p></div>
  <div><strong>CTA Buttons</strong><p>Primary: ${escapeListingHtml(data.cta)}<br>Secondary: Send me the full listing packet</p></div>
  <div><strong>Auto-Reply Message</strong><p>Thanks for your interest in the ${escapeListingHtml(data.location)} listing. We will send the details and follow up with showing availability shortly.</p></div>
  <div><strong>Agent Alert</strong><p>New lead interested in ${escapeListingHtml(facts.coreOffer)}. Follow up within 5 minutes with showing options.</p></div>
</div>`;

  return {
    title: "Lead capture funnel and CTA messaging",
    eyebrow: "Lead funnel",
    deliverable,
    workflow: workflowBlock(
      "Listing URL, buyer persona, CTA, traffic channel, and required lead fields.",
      "Converts the listing story into a landing-page offer, CTA hierarchy, form flow, auto-reply, and agent alert.",
      "A simple funnel plan that captures intent and routes leads to a human quickly.",
      "Agent verifies form requirements, CRM handoff, compliance language, and response SLA.",
      "The funnel can be cloned for each listing with updated headline, lead magnet, CTA, and follow-up copy.",
    ),
  };
}

function generateHandoff(data) {
  const facts = getListingFacts(data);
  const deliverable = `
<h4>Production Handoff Checklist</h4>
${listingBullets([
  `Source URL: ${facts.source}`,
  `Confirm price, location, beds, baths, square footage, disclosures, and showing instructions before publishing.`,
  "Capture exterior hero, entry, living area, kitchen, primary suite, best secondary room, backyard, and lifestyle/location b-roll.",
  "Editor builds a 35-45 second vertical cut with hook in first 2 seconds, captions burned in, and CTA in final 4 seconds.",
  "Social manager posts platform captions with the correct link, CTA, hashtags, and agent contact info.",
  "Lead capture page connects to CRM or email alert before traffic is sent.",
  "Agent reviews all claims and approves final video, description, captions, and funnel copy.",
])}
<h4>Asset Naming</h4>
<p>${escapeListingHtml(data.location)} - Listing Video Package - Script / Captions / Description / Funnel</p>`;

  return {
    title: "Production-ready handoff package",
    eyebrow: "Production handoff",
    deliverable,
    workflow: workflowBlock(
      "Generated creative assets plus real production constraints.",
      "Packages outputs into the tasks an agent, videographer, editor, and social manager need.",
      "Checklist, asset naming, review steps, and publishing order.",
      "Producer confirms source facts and assigns owners before work begins.",
      "Each listing package can move through the same intake, production, approval, and distribution workflow.",
    ),
  };
}

function generateAllListingModules() {
  const data = getListingData();
  listingGenerated = {
    "Video Script": generateVideoScript(data),
    "Social Captions": generateCaptions(data),
    "Listing Description": generateDescription(data),
    "Lead Funnel": generateFunnel(data),
    "Production Handoff": generateHandoff(data),
  };
}

function renderListingTabs() {
  listingTabs.innerHTML = listingModules
    .map(
      (module) => `
      <button class="example-tab ${module === activeListingModule ? "active" : ""}" type="button" data-listing-module="${module}">
        <strong>${module}</strong>
        <span>${module === "Lead Funnel" ? "CTA system" : "Production asset"}</span>
      </button>`,
    )
    .join("");
}

function renderListingWorkflow(items) {
  listingWorkflow.innerHTML = items
    .map(
      ([label, text]) => `
      <div class="breakdown-card">
        <span>${escapeListingHtml(label)}</span>
        <p>${escapeListingHtml(text)}</p>
      </div>`,
    )
    .join("");
}

function renderListingModule() {
  const module = listingGenerated[activeListingModule];
  listingEyebrow.textContent = module.eyebrow;
  listingTitle.textContent = module.title;
  listingOutput.innerHTML = module.deliverable;
  renderListingWorkflow(module.workflow);
  renderListingTabs();
}

function getListingPackText() {
  const data = getListingData();
  return [
    "REAL ESTATE AI PRODUCTION SYSTEM",
    `Listing URL: ${data.listingUrl}`,
    `Location: ${data.location}`,
    `Price: ${data.price}`,
    `CTA: ${data.cta}`,
    "",
    listingModules
      .map((module) => {
        const item = listingGenerated[module];
        const workflowText = item.workflow
          .map(([label, text]) => `${label}: ${text}`)
          .join("\n");
        return `${module.toUpperCase()}\n\n${stripListingHtml(item.deliverable)}\n\nWorkflow:\n${workflowText}`;
      })
      .join("\n\n---\n\n"),
  ].join("\n");
}

function renderPipelineCards() {
  const cards = [
    ["1", "Intake", "Listing URL, notes, price, location, buyer persona, and CTA."],
    ["2", "Creative", "Generate hook, scene structure, voiceover, on-screen text, and shot notes."],
    ["3", "Distribution", "Adapt captions for Instagram, TikTok, and YouTube Shorts."],
    ["4", "Conversion", "Create listing copy, landing-page CTA, lead form, and auto-reply."],
    ["5", "Review", "Human verifies claims, compliance, visuals, pricing, and final approval."],
  ];
  document.querySelector("#pipelineCards").innerHTML = cards
    .map(
      ([number, title, text]) => `
      <article class="system-card proof-card">
        <span class="icon">${number}</span>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>`,
    )
    .join("");
}

listingTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-listing-module]");
  if (!tab) return;
  activeListingModule = tab.dataset.listingModule;
  renderListingModule();
});

listingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  generateAllListingModules();
  renderListingModule();
  document.querySelector("#outputs").scrollIntoView({ behavior: "smooth" });
});

listingForm.addEventListener("input", () => {
  generateAllListingModules();
  renderListingModule();
});

copyListingOutput.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(listingOutput.innerText.trim());
    copyListingOutput.textContent = "Copied";
    setTimeout(() => {
      copyListingOutput.textContent = "Copy Output";
    }, 1300);
  } catch {
    copyListingOutput.textContent = "Select Text";
  }
});

copyListingPack.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(getListingPackText());
    copyListingPack.textContent = "Copied Package";
    setTimeout(() => {
      copyListingPack.textContent = "Copy Full Package";
    }, 1300);
  } catch {
    copyListingPack.textContent = "Select Text";
  }
});

downloadListingPack.addEventListener("click", () => {
  const blob = new Blob([getListingPackText()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "real-estate-listing-content-package.txt";
  link.click();
  URL.revokeObjectURL(url);
});

printListingPack.addEventListener("click", () => {
  window.print();
});

generateAllListingModules();
renderListingTabs();
renderListingModule();
renderPipelineCards();
