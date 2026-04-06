import { useState, useEffect, useCallback } from "react";

const CARDS = [
  // Data & Analytics
  { category: "Data & Analytics", term: "Adobe Experience Platform (AEP)", definition: "The central data hub. Ingests data from every channel, creates real-time unified customer profiles, and feeds all other Adobe applications. Powers segmentation, identity resolution, and data governance.", sprinklrLink: "Sprinklr enriches AEP profiles with social care data so agents have more context around the customer.", icon: "◆" },
  { category: "Data & Analytics", term: "Adobe Analytics", definition: "Enterprise web and mobile analytics tool. Tracks website traffic, conversion funnels, campaign attribution, and user behavior in real-time. Uses \"report suites\" to organize data.", sprinklrLink: "Sprinklr integrates web performance signals with social analytics to show which content and channels drive the highest ROI.", icon: "◆" },
  { category: "Data & Analytics", term: "Customer Journey Analytics (CJA)", definition: "Next-gen analytics built on AEP. Stitches together data from web, mobile, CRM, call centers, and offline sources for a full cross-channel view. Same Analysis Workspace UI as Adobe Analytics but far more flexible.", sprinklrLink: "Combines social influence and organic engagement data with conversion paths for complete, multi-touch, journey-aware attribution.", icon: "◆" },
  { category: "Data & Analytics", term: "Real-Time CDP", definition: "Customer Data Platform built on AEP. Collects B2B and B2C profiles in real-time and activates audiences across email, ads, and web personalization. Replacing Adobe Audience Manager.", sprinklrLink: "Not a direct integration, but Sprinklr social data flows into AEP which feeds the CDP.", icon: "◇" },

  // Content Management & Creation
  { category: "Content & Creation", term: "Adobe Experience Manager (AEM)", definition: "Enterprise CMS + DAM. AEM Sites builds and manages websites; AEM Assets is the digital asset management system for images, videos, and documents. Cloud-native and globally scalable.", sprinklrLink: "Synchronizes approved assets between AEM and Sprinklr's DAM—updates mirror in both systems, single source of truth.", icon: "◆" },
  { category: "Content & Creation", term: "Adobe Firefly", definition: "Adobe's generative AI engine. Creates images, video, and audio from text prompts. Trained on licensed content (commercially safe). Embedded across Creative Cloud apps and available as standalone APIs.", sprinklrLink: "Create and refine images inside Sprinklr using Firefly's generative AI—ideate, edit, and publish in one workspace.", icon: "◆" },
  { category: "Content & Creation", term: "Adobe Express", definition: "Lightweight browser-based design tool (like Canva but in Adobe's ecosystem). Non-designers can quickly create and localize social posts, ads, and collateral using templates and Firefly AI.", sprinklrLink: "Quickly adapt creative assets for local markets or channels, then review and publish tailored content directly within Sprinklr.", icon: "◆" },
  { category: "Content & Creation", term: "GenStudio for Performance Marketing", definition: "Newer app combining generative AI with performance data. Marketing teams create, review, and optimize on-brand emails and ads, then measure impact—all in one place.", sprinklrLink: "No direct integration yet, but complements Sprinklr's content supply chain story.", icon: "◇" },

  // Marketing & Orchestration
  { category: "Marketing & Orchestration", term: "Adobe Marketo Engage", definition: "B2B marketing automation platform. Manages lead scoring, email nurture, account-based marketing (ABM), and sales/marketing alignment. Integrates natively with Salesforce and Dynamics CRM.", sprinklrLink: "Automatically identifies inbound social messages as leads or support queries, routing leads directly into Marketo for fast sales action.", icon: "◆" },
  { category: "Marketing & Orchestration", term: "Adobe Journey Optimizer (AJO)", definition: "Real-time journey orchestration across email, push, SMS, web, and in-app. Uses AEP profiles and segments. Think of it as the B2C counterpart to Marketo.", sprinklrLink: "No direct integration, but Sprinklr extends journey orchestration to 30+ social channels.", icon: "◇" },
  { category: "Marketing & Orchestration", term: "Adobe Target", definition: "A/B testing and personalization engine. Serves personalized content and offers based on audience segments. Powers website personalization at scale.", sprinklrLink: "Not a direct integration, but social insights inform targeting strategies.", icon: "◇" },
  { category: "Marketing & Orchestration", term: "Adobe Campaign", definition: "Cross-channel campaign management for email, SMS, direct mail, and push. Used for high-volume outbound campaigns with complex workflows.", sprinklrLink: "Sprinklr complements Campaign by handling social channel activation.", icon: "◇" },

  // Work Management
  { category: "Work Management", term: "Adobe Workfront", definition: "Enterprise work management platform. Centralizes project intake, resource planning, workflow automation, proofing/approvals, and reporting. Adobe's \"marketing system of record.\"", sprinklrLink: "Push campaigns and assets from Workfront to Sprinklr with a single click—eliminating manual copy/paste.", icon: "◆" },

  // Other Products
  { category: "Other Products", term: "LLM Optimizer", definition: "Adobe's new generative-AI-first application for Generative Engine Optimization (GEO). Helps brands understand and optimize how they appear in AI search results and conversational AI.", sprinklrLink: "Helps brands understand how they need to show up in AI search and what trends to adapt to be seen.", icon: "◆" },
  { category: "Other Products", term: "Adobe Commerce (Magento)", definition: "B2B and B2C e-commerce platform acquired in 2018. Powers online storefronts, product catalogs, and checkout. Integrated with AEP for personalized shopping.", sprinklrLink: "No direct integration, but social commerce and social listening complement Commerce.", icon: "◇" },

  // Technical Concepts
  { category: "Technical Concepts", term: "XDM (Experience Data Model)", definition: "Adobe's open-source data schema standard. Defines how customer data is structured in AEP so data from different sources can be combined into a single profile.", sprinklrLink: "Sprinklr data flowing into AEP must conform to XDM schemas.", icon: "⚙" },
  { category: "Technical Concepts", term: "Real-Time Customer Profile", definition: "AEP's core feature. Merges identity-stitched data from multiple sources into a single, always-current view of each customer. Updates in milliseconds. Powers all personalization.", sprinklrLink: "Sprinklr enriches these profiles with social care and conversation data.", icon: "⚙" },
  { category: "Technical Concepts", term: "Identity Graph", definition: "Stitches together different identifiers for the same person—email, cookie ID, device ID, loyalty number, CRM ID—to connect touchpoints across channels and devices.", sprinklrLink: "CJA uses this graph for cross-channel analysis that includes Sprinklr social data.", icon: "⚙" },
  { category: "Technical Concepts", term: "Edge Network", definition: "Adobe's global server infrastructure for real-time data collection and personalization. Collects data and returns personalized content in single-digit milliseconds.", sprinklrLink: "Technical infrastructure—not a direct Sprinklr touchpoint.", icon: "⚙" },
  { category: "Technical Concepts", term: "Content Credentials", definition: "Metadata automatically attached to Firefly-generated images showing they were AI-created. Powered by the Content Authenticity Initiative (CAI) Adobe co-founded. Important for brand trust.", sprinklrLink: "Relevant when using Firefly inside Sprinklr—generated content carries these credentials.", icon: "⚙" },

  // Jargon
  { category: "Jargon Decoder", term: "Report Suite", definition: "A container for web analytics data in Adobe Analytics. It's the legacy way data is organized—each website or app typically has its own report suite.", sprinklrLink: "", icon: "💬" },
  { category: "Jargon Decoder", term: "Data View", definition: "CJA's equivalent of a report suite, but far more flexible. You can create multiple data views from the same data connection with different settings.", sprinklrLink: "", icon: "💬" },
  { category: "Jargon Decoder", term: "Workfront Fusion", definition: "Low-code integration and automation tool within Workfront. Connects Workfront to hundreds of apps and automates workflows without code.", sprinklrLink: "", icon: "💬" },
  { category: "Jargon Decoder", term: "Web SDK (alloy.js)", definition: "Adobe's unified JavaScript library for data collection. One tag sends data to AEP, Analytics, Target, and other services simultaneously. Replaced older individual libraries.", sprinklrLink: "", icon: "💬" },
];

const CATEGORIES = [...new Set(CARDS.map((c) => c.category))];

const CAT_COLORS = {
  "Data & Analytics": { bg: "#0D1B2A", accent: "#1B9AAA", glow: "rgba(27,154,170,0.3)" },
  "Content & Creation": { bg: "#1A0A2E", accent: "#D4A017", glow: "rgba(212,160,23,0.3)" },
  "Marketing & Orchestration": { bg: "#0A1628", accent: "#E8553D", glow: "rgba(232,85,61,0.3)" },
  "Work Management": { bg: "#0F1A0F", accent: "#5CB85C", glow: "rgba(92,184,92,0.3)" },
  "Other Products": { bg: "#1A1520", accent: "#9B59B6", glow: "rgba(155,89,182,0.3)" },
  "Technical Concepts": { bg: "#0D1520", accent: "#3498DB", glow: "rgba(52,152,219,0.3)" },
  "Jargon Decoder": { bg: "#1A1510", accent: "#E67E22", glow: "rgba(230,126,34,0.3)" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [selectedCats, setSelectedCats] = useState(new Set(CATEGORIES));
  const [deck, setDeck] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [learning, setLearning] = useState(new Set());
  const [showSprinklr, setShowSprinklr] = useState(false);
  const [mode, setMode] = useState("menu");
  const [animDir, setAnimDir] = useState(null);

  const buildDeck = useCallback(
    (cats, onlyLearning = false) => {
      let cards = CARDS.map((c, i) => ({ ...c, origIdx: i })).filter((c) => cats.has(c.category));
      if (onlyLearning) cards = cards.filter((c) => learning.has(c.origIdx));
      return shuffle(cards);
    },
    [learning]
  );

  const startStudy = (onlyLearning = false) => {
    const d = buildDeck(selectedCats, onlyLearning);
    if (d.length === 0) return;
    setDeck(d);
    setCurrentIdx(0);
    setFlipped(false);
    setShowSprinklr(false);
    setMode("study");
  };

  const advance = useCallback(() => {
    setAnimDir(null);
    if (currentIdx < deck.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setFlipped(false);
      setShowSprinklr(false);
    } else {
      setMode("results");
    }
  }, [currentIdx, deck.length]);

  const markCard = useCallback(
    (status) => {
      if (!deck[currentIdx]) return;
      const origIdx = deck[currentIdx].origIdx;
      if (status === "known") {
        setKnown((prev) => new Set([...prev, origIdx]));
        setLearning((prev) => { const n = new Set(prev); n.delete(origIdx); return n; });
        setAnimDir("right");
      } else {
        setLearning((prev) => new Set([...prev, origIdx]));
        setKnown((prev) => { const n = new Set(prev); n.delete(origIdx); return n; });
        setAnimDir("left");
      }
      setTimeout(advance, 250);
    },
    [deck, currentIdx, advance]
  );

  // Keyboard controls
  useEffect(() => {
    if (mode !== "study") return;
    const handler = (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!flipped) setFlipped(true);
      }
      if (flipped && (e.key === "ArrowLeft" || e.key === "1")) markCard("learning");
      if (flipped && (e.key === "ArrowRight" || e.key === "2")) markCard("known");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, flipped, markCard]);

  const totalFiltered = CARDS.filter((c) => selectedCats.has(c.category)).length;
  const knownFiltered = CARDS.filter((c, i) => selectedCats.has(c.category) && known.has(i)).length;
  const learningFiltered = CARDS.filter((c, i) => selectedCats.has(c.category) && learning.has(i)).length;

  const toggleCat = (cat) => {
    setSelectedCats((prev) => {
      const n = new Set(prev);
      if (n.has(cat)) n.delete(cat);
      else n.add(cat);
      return n;
    });
  };

  const card = deck[currentIdx];
  const catColor = card ? CAT_COLORS[card.category] : null;

  const baseStyles = {
    minHeight: "100vh",
    background: "#0A0A0F",
    color: "#E8E6E3",
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
  };

  // ==================== MENU ====================
  if (mode === "menu") {
    return (
      <div style={{ ...baseStyles, padding: "32px 20px" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#CC0000", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Adobe Summit 2026</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 }}>Product Flashcards</h1>
            <p style={{ fontSize: 14, color: "#8A8680", margin: 0 }}>Tap categories to focus your study session</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            {CATEGORIES.map((cat) => {
              const cc = CAT_COLORS[cat];
              const active = selectedCats.has(cat);
              const count = CARDS.filter((c) => c.category === cat).length;
              const knownCount = CARDS.filter((c, i) => c.category === cat && known.has(i)).length;
              return (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", borderRadius: 12,
                    background: active ? `linear-gradient(135deg, ${cc.bg}, #0A0A0F)` : "#111118",
                    border: `1.5px solid ${active ? cc.accent + "80" : "#222230"}`,
                    color: active ? "#E8E6E3" : "#555",
                    cursor: "pointer", transition: "all 0.2s",
                    boxShadow: active ? `0 0 20px ${cc.glow}` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: active ? cc.accent : "#333" }} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{cat}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {knownCount > 0 && (
                      <span style={{ fontSize: 11, color: "#5CB85C", fontFamily: "'JetBrains Mono', monospace" }}>{knownCount}✓</span>
                    )}
                    <span style={{ fontSize: 12, color: "#666", fontFamily: "'JetBrains Mono', monospace" }}>{count}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => startStudy(false)}
              disabled={totalFiltered === 0}
              style={{
                padding: "16px", borderRadius: 12, border: "none",
                cursor: totalFiltered > 0 ? "pointer" : "default",
                background: totalFiltered > 0 ? "linear-gradient(135deg, #CC0000, #991100)" : "#222",
                color: totalFiltered > 0 ? "#fff" : "#555",
                fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.5,
                boxShadow: totalFiltered > 0 ? "0 4px 20px rgba(204,0,0,0.3)" : "none",
              }}
            >
              Study All ({totalFiltered} cards)
            </button>

            {learningFiltered > 0 && (
              <button
                onClick={() => startStudy(true)}
                style={{
                  padding: "14px", borderRadius: 12,
                  border: "1.5px solid #E8553D50",
                  cursor: "pointer", background: "#1A1015", color: "#E8553D",
                  fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Review "Still Learning" ({learningFiltered} cards)
              </button>
            )}
          </div>

          {(knownFiltered > 0 || learningFiltered > 0) && (
            <div style={{ marginTop: 24, padding: "16px", borderRadius: 12, background: "#111118", border: "1px solid #222230" }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 10, fontWeight: 600 }}>Progress</div>
              <div style={{ display: "flex", gap: 4, height: 6, borderRadius: 3, overflow: "hidden", background: "#1A1A22" }}>
                <div style={{ width: `${(knownFiltered / totalFiltered) * 100}%`, background: "#5CB85C", borderRadius: 3, transition: "width 0.5s" }} />
                <div style={{ width: `${(learningFiltered / totalFiltered) * 100}%`, background: "#E8553D", borderRadius: 3, transition: "width 0.5s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ color: "#5CB85C" }}>✓ Got it: {knownFiltered}</span>
                <span style={{ color: "#E8553D" }}>✗ Learning: {learningFiltered}</span>
                <span style={{ color: "#555" }}>○ Unseen: {totalFiltered - knownFiltered - learningFiltered}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==================== RESULTS ====================
  if (mode === "results") {
    return (
      <div style={{ ...baseStyles, padding: "32px 20px" }}>
        <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#CC0000", fontWeight: 700, marginBottom: 16, textTransform: "uppercase" }}>Session Complete</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Nice work!</h1>
          <p style={{ fontSize: 14, color: "#8A8680", marginBottom: 32 }}>Here's how you did this round</p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 40 }}>
            <div style={{ padding: "20px 28px", borderRadius: 16, background: "#0F1A0F", border: "1px solid #5CB85C30" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#5CB85C", fontFamily: "'JetBrains Mono', monospace" }}>{knownFiltered}</div>
              <div style={{ fontSize: 12, color: "#5CB85C", marginTop: 4 }}>Got it</div>
            </div>
            <div style={{ padding: "20px 28px", borderRadius: 16, background: "#1A0F0F", border: "1px solid #E8553D30" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#E8553D", fontFamily: "'JetBrains Mono', monospace" }}>{learningFiltered}</div>
              <div style={{ fontSize: 12, color: "#E8553D", marginTop: 4 }}>Still learning</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {learningFiltered > 0 && (
              <button
                onClick={() => startStudy(true)}
                style={{
                  padding: "16px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #CC0000, #991100)", color: "#fff",
                  fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(204,0,0,0.3)",
                }}
              >
                Review "Still Learning" cards
              </button>
            )}
            <button
              onClick={() => startStudy(false)}
              style={{
                padding: "14px", borderRadius: 12,
                border: "1.5px solid #333",
                cursor: "pointer", background: "#111118", color: "#E8E6E3",
                fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Reshuffle & study all again
            </button>
            <button
              onClick={() => setMode("menu")}
              style={{
                padding: "14px", borderRadius: 12, border: "none",
                cursor: "pointer", background: "transparent", color: "#666",
                fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ← Back to categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== STUDY ====================
  return (
    <div style={{ ...baseStyles, padding: "20px" }}>
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button
            onClick={() => setMode("menu")}
            style={{
              background: "none", border: "none", color: "#666", cursor: "pointer",
              fontSize: 13, fontFamily: "'DM Sans', sans-serif", padding: "4px 0",
            }}
          >
            ← Back
          </button>
          <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#555" }}>
            {currentIdx + 1} / {deck.length}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, borderRadius: 2, background: "#1A1A22", marginBottom: 24, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${((currentIdx + 1) / deck.length) * 100}%`,
              background: catColor?.accent || "#CC0000",
              borderRadius: 2,
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* Category tag */}
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              fontSize: 11, letterSpacing: 2, fontWeight: 700, textTransform: "uppercase",
              color: catColor?.accent, padding: "4px 10px", borderRadius: 6,
              background: catColor?.accent + "15",
              border: `1px solid ${catColor?.accent}30`,
            }}
          >
            {card.category}
          </span>
          {card.icon === "◆" && (
            <span style={{ fontSize: 10, color: "#CC0000", marginLeft: 8, fontWeight: 700 }}>SPRINKLR INTEGRATION</span>
          )}
        </div>

        {/* Card */}
        <div
          onClick={() => !flipped && setFlipped(true)}
          style={{
            minHeight: 320, borderRadius: 20, padding: "32px 28px",
            cursor: !flipped ? "pointer" : "default",
            background: `linear-gradient(160deg, ${catColor?.bg || "#111"} 0%, #0A0A0F 100%)`,
            border: `1px solid ${catColor?.accent || "#333"}25`,
            boxShadow: `0 8px 40px ${catColor?.glow || "rgba(0,0,0,0.3)"}`,
            transition: "transform 0.25s, opacity 0.25s",
            transform:
              animDir === "right"
                ? "translateX(60px) rotate(2deg)"
                : animDir === "left"
                ? "translateX(-60px) rotate(-2deg)"
                : "none",
            opacity: animDir ? 0 : 1,
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, lineHeight: 1.3, color: "#F0EDE8" }}>
            {card.term}
          </h2>

          {!flipped ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 160 }}>
              <div
                style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: `2px solid ${catColor?.accent}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 20, color: catColor?.accent }}>?</span>
              </div>
              <p style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
                Tap to reveal definition
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#B8B4AE", marginBottom: 20 }}>
                {card.definition}
              </p>

              {card.sprinklrLink && (
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSprinklr(!showSprinklr);
                    }}
                    style={{
                      background: "none",
                      border: "1px solid #0097A940",
                      borderRadius: 8,
                      color: "#0097A9",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: "8px 14px",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {showSprinklr ? "Hide" : "Show"} Sprinklr connection →
                  </button>
                  {showSprinklr && (
                    <div
                      style={{
                        marginTop: 12, padding: "14px 16px", borderRadius: 10,
                        background: "#0097A910", border: "1px solid #0097A925",
                        fontSize: 13, lineHeight: 1.6, color: "#0097A9",
                      }}
                    >
                      {card.sprinklrLink}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {flipped && (
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button
              onClick={() => markCard("learning")}
              style={{
                flex: 1, padding: "16px", borderRadius: 14, cursor: "pointer",
                background: "#1A0F0F", border: "1.5px solid #E8553D40",
                color: "#E8553D", fontSize: 15, fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ✗ Still learning
            </button>
            <button
              onClick={() => markCard("known")}
              style={{
                flex: 1, padding: "16px", borderRadius: 14, cursor: "pointer",
                background: "#0F1A0F", border: "1.5px solid #5CB85C40",
                color: "#5CB85C", fontSize: 15, fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ✓ Got it
            </button>
          </div>
        )}

        {/* Keyboard hint */}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#333" }}>
          {!flipped ? "tap card or press space to flip" : "← still learning · got it →"}
        </div>
      </div>
    </div>
  );
}
