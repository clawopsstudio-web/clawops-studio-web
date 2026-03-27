# ClawOps Studio - Installation Plan

**Date:** 2026-03-27  
**Phase:** MVP Setup  
**Goal:** 95% automation

---

## 🎯 INSTALLATION OVERVIEW

This plan covers installing the required tools, agents, and skills to build ClawOps Studio's MVP.

**Order:** 1 → 2 → 3 (each must complete before next)

---

## PHASE 0: CORE INFRASTRUCTURE

### 1️⃣ MetaClaw (CORE - Install First)

**What:** Agent meta-learning infrastructure  
**Repo:** https://github.com/aiming-lab/MetaClaw  
**Priority:** 🔴 MUST HAVE

**Why First:** MetaClaw is the core that makes all our other agents smarter. It handles:
- Auto-fix when skills break
- Auto-improve successful patterns
- Auto-learn from usage
- Cross-session memory

**Installation:**
```bash
# Clone MetaClaw
git clone https://github.com/aiming-lab/MetaClaw.git

# Follow their setup guide
cd MetaClaw
cat README.md
```

**What to do:**
1. Install MetaClaw on our main VPS
2. Configure it to work with OpenClaw
3. Test auto-learning capabilities
4. Document configuration

**Verification:**
```bash
# Test that MetaClaw is running
curl -s http://localhost:PORT/health
```

---

### 2️⃣ agency-agents (Team Templates)

**What:** Pre-built agent personas  
**Repo:** https://github.com/msitarzewski/agency-agents  
**Priority:** 🔴 HIGH

**Why Second:** These give us templates for our team (Dave, Kyle, Marcus, Tyler, Ryan).

**Contains:**
- Frontend Developer (React/Vue/Angular)
- Backend Architect
- Reddit Content Manager
- And more...

**Installation:**
```bash
# Clone the repo
git clone https://github.com/msitarzewski/agency-agents.git

# Review each agent definition
cd agency-agents
ls -la
cat README.md
```

**What to do:**
1. Review each agent persona
2. Adapt for our team:
   - Frontend Dev → Dave (DevOps/Engineering)
   - Backend Architect → Kyle (Backend/API)
   - Reddit Manager → Tyler (Marketing)
   - Research Agent → Ryan (Research)
   - Sales Agent → Marcus (Sales)
3. Customize their prompts for ClawOps context
4. Test each agent

**Files to create:**
```
/root/.openclaw/workspaces/arjun/agents/
├── dave.md      # DevOps/Engineering
├── kyle.md      # Backend/API
├── marcus.md    # Sales/Revenue
├── tyler.md     # Marketing/Growth
└── ryan.md      # Research/Analysis
```

---

### 3️⃣ openclaw-skills (Agent Capabilities)

**What:** 86 production-ready skills  
**Repo:** https://github.com/moriiisaac/openclaw-skills  
**Priority:** 🔴 HIGH

**Why Third:** Skills give our agents specialized capabilities.

**Categories to install:**

| Agent | Skills to Install |
|-------|-------------------|
| **Dave** | Engineering (21 core, 25 advanced) |
| **Kyle** | Engineering (backend focus) |
| **Marcus** | Business & Growth (4), Sales skills |
| **Tyler** | Marketing (7), Content creation |
| **Ryan** | Research, Regulatory/Quality (for analysis) |

**Installation:**
```bash
# Clone the repo
git clone https://github.com/moriiisaac/openclaw-skills.git

# Install by domain
cd openclaw-skills

# Install engineering skills
/plugin install engineering-skills@claude-code-skills

# Install marketing skills
/plugin install marketing-skills@claude-code-skills

# Install business skills
/plugin install business-growth-skills@claude-code-skills
```

**Alternative (manual):**
```bash
# Copy skill folders to OpenClaw skills directory
cp -r openclaw-skills/engineering ~/.openclaw/skills/
cp -r openclaw-skills/marketing ~/.openclaw/skills/
cp -r openclaw-skills/business-growth ~/.openclaw/skills/
```

**Skills Available:**

**Engineering (21 core skills):**
- Architecture
- Automated Testing
- CI/CD
- Cloud Infrastructure
- Code Review
- Database Design
- Debugging
- DevOps
- Docker
- Frontend Development
- Git
- Kubernetes
- Linux
- Monitoring
- Networking
- Performance
- Python
- Refactoring
- Security
- System Design
- Testing

**Marketing (7 skills):**
- Content Marketing
- Copywriting
- Email Marketing
- SEO
- Social Media
- Marketing Strategy
- Analytics

**Business & Growth (4 skills):**
- Growth Hacking
- Lead Generation
- Market Research
- Product Launch

---

## PHASE 1: POST-MVP

### 4️⃣ AutoResearchClaw (Ryan's Base)

**What:** Autonomous research agent  
**Repo:** https://github.com/aiming-lab/AutoResearchClaw  
**Priority:** 🟡 MEDIUM

**Installation:**
```bash
git clone https://github.com/aiming-lab/AutoResearchClaw.git
cd AutoResearchClaw
# Follow setup instructions
```

**For:** Ryan (Research agent)

---

### 5️⃣ LobsterBoard (Client Dashboard)

**What:** Dashboard builder  
**Repo:** https://github.com/Curbob/LobsterBoard  
**Priority:** 🟡 MEDIUM

**Installation:**
```bash
git clone https://github.com/Curbob/LobsterBoard.git
cd LobsterBoard
npm install
node server.cjs
# Opens at http://localhost:8080
```

**For:** Client-facing dashboard

---

### 6️⃣ geo-seo-claude (Tyler's SEO Tool)

**What:** GEO/SEO optimization  
**Repo:** https://github.com/zubair-trabzada/geo-seo-claude  
**Priority:** 🟢 LOW

**Installation:**
```bash
git clone https://github.com/zubair-trabzada/geo-seo-claude.git
cd geo-seo-claude
./install.sh
```

**For:** Tyler (Marketing) - SEO optimization

---

## PHASE 2: AFTER REVENUE

### 7️⃣ OpenSpace (Cost Optimization)
**Repo:** https://github.com/HKUDS/OpenSpace  
**Purpose:** 46% fewer tokens, self-evolving agents

### 8️⃣ Memento-Skills (Auto-Agent Generation)
**Repo:** https://github.com/Memento-Teams/Memento-Skills  
**Purpose:** Auto-generate client-specific agents

### 9️⃣ canopy (Team Management)
**Repo:** https://github.com/Miosa-osa/canopy  
**Purpose:** Team orchestration and virtual office

---

## 📋 INSTALLATION CHECKLIST

```
PHASE 0: CORE INFRASTRUCTURE
☐ 1. MetaClaw installed and configured
☐ 2. agency-agents cloned and reviewed
☐ 3. Team agent definitions created (Dave, Kyle, Marcus, Tyler, Ryan)
☐ 4. openclaw-skills installed per agent role
☐ 5. Skills tested per agent

PHASE 1: POST-MVP
☐ 6. AutoResearchClaw installed
☐ 7. Ryan configured with research agent
☐ 8. LobsterBoard installed
☐ 9. geo-seo-claude installed

PHASE 2: AFTER REVENUE
☐ 10. OpenSpace integrated
☐ 11. Memento-Skills integrated
☐ 12. canopy integrated
```

---

## 🔧 VERIFICATION COMMANDS

After each installation, verify:

**MetaClaw:**
```bash
# Check if running
curl -s http://localhost:PORT/health

# Check logs
tail -f ~/.openclaw/logs/metaclaw.log
```

**OpenClaw:**
```bash
# Check status
openclaw status

# List agents
openclaw agents list
```

**Skills:**
```bash
# List installed skills
ls ~/.openclaw/skills/

# Verify a skill
cat ~/.openclaw/skills/SKILL.md
```

---

## ⚠️ TROUBLESHOOTING

### If MetaClaw fails:
1. Check Node.js version (needs 22+)
2. Check Docker is running
3. Review logs at `~/.openclaw/logs/`

### If skills don't load:
1. Verify skill folder structure
2. Check SKILL.md exists
3. Restart OpenClaw

### If agents don't respond:
1. Check Paperclip is running
2. Verify agent config
3. Check memory files

---

## 📞 REFERENCES

- MetaClaw: https://github.com/aiming-lab/MetaClaw
- agency-agents: https://github.com/msitarzewski/agency-agents
- openclaw-skills: https://github.com/moriiisaac/openclaw-skills
- AutoResearchClaw: https://github.com/aiming-lab/AutoResearchClaw
- LobsterBoard: https://github.com/Curbob/LobsterBoard
- geo-seo-claude: https://github.com/zubair-trabzada/geo-seo-claude

---

*Document created: 2026-03-27 by Henry (CEO Agent)*
