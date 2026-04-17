# Prune Plan Execution — ClawOps Studio

**Goal:** Execute the prune plan to reduce runtime noise and increase business alignment.

---

## 📋 Execution Steps

### Phase 1: Identify Current Runtime State
1. **List all loaded plugins**
   ```bash
   openclaw plugins list
   ```

2. **List all available agents**
   ```bash
   openclaw agents list
   ```

3. **Review config for active skill entries**
   - `/root/.openclaw/openclaw.json` → `skills.entries`
   - `/root/.openclaw/openclaw.json` → `plugins.entries`

### Phase 2: Archive Irrelevant Agents
**Action:** Move extra agent workspaces to archived status or disable from runtime.

**Agents to archive:**
- All agents not in core team (henry, ryan, arjun, dev, dave, kyle, tyler, marcus)
- Move to `~/.openclaw/archive/` or rename with prefix `archived-`

**Target runtime agents only:**
- henry
- ryan  
- arjun
- dev (Andrew)
- dave
- kyle
- tyler
- marcus (future)

### Phase 3: Disable Irrelevant Skills
**Action:** Disable skills not in the KEEP list in config.

**Skills to disable:**
- goplaces
- openai-image-gen
- openai-whisper-api
- gog (already disabled)
- imsg (already disabled)
- capa-officer (already disabled)
- ceo-advisor (already disabled)

### Phase 4: Clean Up Repositories
**Action:** Remove irrelevant repos from disk to reduce discovery noise.

**Repos to remove:**
- `~/.openclaw/workspace/agency-agents/` (too many templates)
- `~/.openclaw/workspace/AutoResearchClaw/` (research-focused)
- `~/.openclaw/workspace/geo-seo-claude/` (SEO tool)
- `~/.openclaw/workspace/marketingskills/` (marketing tools)
- `~/.openclaw/workspace/Memento-Skills/` (auto-agent gen)
- `~/.openclaw/workspace/canopy/` (team management)
- `~/.openclaw/workspace/OpenJarvis/` (research toy)
- `~/.openclaw/workspace/AgentScope/` (competitor)
- `~/.openclaw/workspace/ruflo/` (competitor)
- `~/.openclaw/workspace/NemoClaw/` (alpha)

**Repos to keep:**
- deer-flow (restore with OpenRouter)
- MetaClaw (active)
- HiClaw (optional)
- openclaw-skills (keep core skills)

### Phase 5: Strategic Additions (After Prune)
**Action:** Add DeerFlow and prepare for notebooklm integration.

#### DeerFlow Restoration
1. **Set OpenRouter environment**
   ```bash
   export OPENROUTER_API_KEY="your-key-here"
   ```

2. **Update DeerFlow config to use free model**
   ```yaml
   # config.yaml
   models:
     - name: nvidia/nemotron-4b-instruct
       display_name: Nemotron 4B Free
       use: langchain_openai:ChatOpenAI
       model: nvidia/nemotron-4b-instruct
       api_key: $OPENROUTER_API_KEY
       base_url: https://openrouter.ai/api/v1
       max_tokens: 4096
       temperature: 0.7
   ```

3. **Test with one real research task**
   - Validate on a real Arjun research question
   - Confirm token usage and response quality

#### NotebookLM Integration
1. **Clone and install notebooklm-py**
   ```bash
   git clone https://github.com/teng-lin/notebooklm-py
   cd notebooklm-py
   pip install -r requirements.txt
   ```

2. **Integrate as research tool for Arjun/Tyler**
   - Add to Arjun's lane-specific tools
   - Use for content generation and research

#### CLI-Anything Integration
1. **Install as Dev-only skill**
   ```bash
   npx skills add https://github.com/HKUDS/CLI-Anything --skill cli-anything
   ```

2. **Configure for backend automation**
   - Use for building custom integrations
   - Not for global runtime

---

## 🎯 Expected After Prune

### Runtime State
- **Plugins:** 6 → ~8 (add DeerFlow, notebooklm later)
- **Active Agents:** 7 (core team only)
- **Relevant Skills:** ~15 (core + lane-specific)
- **Noise:** Dramatically reduced

### Business Impact
- More deterministic responses
- Less hallucination risk
- Faster execution
- Clearer lane responsibilities
- Easier maintenance and debugging

---

## 📊 Success Metrics

1. **Doctor output shows clean runtime**
   - Eligible skills: 111 → ~30
   - Loaded plugins: 6 → ~8
   - Active agents: ~40 → 7

2. **Performance improvement**
   - Faster agent startup
   - More reliable responses
   - Less irrelevant tool suggestions

3. **Business focus**
   - Core team lanes clearly defined
   - Lane-specific tooling aligned
   - Ready for revenue execution

---

## 🔄 Next Steps After Prune

1. **Execute autonomy system**
   - Henry pushes next priorities
   - Swarm executes with clean runtime

2. **Restore DeerFlow**
   - Validate on real research task
   - Document capabilities

3. **Define commercial SKU**
   - Pick one vertical
   - Package as named offer

4. **Execute revenue motion**
   - First outreach batch
   - First client wins