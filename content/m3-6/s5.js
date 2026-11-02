/* 3.6 · Section 5: model availability controls (rate limiting, quota enforcement, graceful degradation) */
module.exports = {
  title: 'Model availability: rate limits, quotas and graceful degradation', covers: [5],
  blocks: [
    { type: 'video', title: 'Keeping the model up', kicker: 'Module 3.6 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.6 · Model CIA', title: 'Keeping the model up', sub: 'Rate limits, quotas and graceful degradation', icon: 'power',
        say: 'AI services are expensive to run, and attackers know it. A flood of long prompts can exhaust GPUs, budgets or token quotas, and take a service down for everyone. | This video covers availability controls: rate limits, quotas and graceful degradation, so the service stays up and fails safely.' },
      { t: 'bullets', title: 'What threatens availability', layout: 'grid', cols: 2, items: [
          { icon: 'bars', h: 'Request floods', d: 'Classic denial of service', k: 'threat' },
          { icon: 'text', h: 'Resource-heavy prompts', d: 'Huge contexts, maximum outputs', k: 'data' },
          { icon: 'robot', h: 'Runaway agents', d: 'Loops of tool calls', k: 'model' },
          { icon: 'money', h: 'Denial of wallet', d: 'Cost exhaustion on paid usage', k: 'human' },
          { icon: 'plug', h: 'Dependency outages', d: 'Provider APIs, vector stores', k: 'neutral' },
          { icon: 'gpu', h: 'Capacity contention', d: 'Shared accelerators, noisy neighbours', k: 'control' } ],
        say: 'OWASP calls this risk unbounded consumption, and it takes several forms. | Floods of requests: the classic denial of service. | Resource-heavy prompts: very long contexts, or requests for the maximum output length, where one request can cost as much as thousands of normal ones. | Runaway agents, stuck in loops of tool calls. | Denial of wallet: running up costs on pay-per-use services until budgets are exhausted. | Outages in dependencies, such as a model provider’s API or a vector database. | And contention for shared accelerators, where one workload starves another.' },
      { t: 'shield', title: 'Layered limits', target: 'Model service', targetIcon: 'server',
        layers: ['Edge protection', 'Authentication and rate limits', 'Quotas and budget caps', 'Server limits and timeouts'],
        attacks: [{ t: 'Volumetric flood', stop: 0 }, { t: 'Anonymous scraping', stop: 1 }, { t: 'Denial of wallet', stop: 2 }, { t: 'Oversized prompt', stop: 3 }],
        say: 'Availability controls work in layers. | Edge protection, with DDoS filtering and a web application firewall, absorbs volumetric floods before they reach your service. | Authentication and rate limits at the gateway stop anonymous scraping, and limit each identity’s requests and tokens per minute. | Quotas and budget caps limit what each user, team or application can consume per day or month, which stops denial of wallet. | And limits in the model server itself, on input and output length, concurrency and processing time, stop any single oversized request from monopolising capacity.' },
      { t: 'compare', title: 'Rate limits, quotas and budget caps', labels: ['Time window', 'Protects', 'Measured in', 'When exceeded'],
        cols: [{ h: 'Rate limit', icon: 'clock', k: 'data' }, { h: 'Quota', icon: 'calendar', k: 'human' }, { h: 'Budget cap', icon: 'money', k: 'control' }],
        rows: [
          ['Seconds or minutes', 'Days or months', 'Billing period'],
          ['Capacity from bursts', 'Fair shares', 'Spend'],
          ['Requests and tokens', 'Tokens or calls', 'Currency'],
          ['Retry later', 'Blocked until reset', 'Alert, then stop'] ],
        say: 'Three related controls are easy to confuse. | A rate limit works over seconds or minutes. A quota works over days or months. A budget cap works over a billing period. | Rate limits protect capacity from bursts. Quotas enforce fair shares between users and teams. Budget caps protect spend. | Rate limits count requests and, for language models, tokens. Quotas count tokens or calls. Budget caps count money. | And when they are exceeded: a rate-limited caller is told to retry later, a caller over quota is blocked until the quota resets, and a budget cap raises alerts, then stops or degrades the service.' },
      { t: 'flow', title: 'Degrade gracefully, and fail safe',
        nodes: [
          { id: 'full', x: 230, y: 330, icon: 'model', label: 'Full service', sub: 'primary model', k: 'model', w: 260 },
          { id: 'cb', x: 700, y: 330, icon: 'power', label: 'Circuit breaker', sub: 'trips on failures', k: 'threat', w: 280 },
          { id: 'fb', x: 1200, y: 330, icon: 'layers', label: 'Fallback model', sub: 'smaller, approved', k: 'data', w: 280 },
          { id: 'lim', x: 1200, y: 690, icon: 'filter', label: 'Reduced features', sub: 'cached or core answers', k: 'human', w: 300 },
          { id: 'man', x: 700, y: 690, icon: 'user', label: 'Non-AI path', sub: 'human queue or form', k: 'control', w: 280 } ],
        edges: [{ from: 'full', to: 'cb', k: 'model' }, { from: 'cb', to: 'fb', k: 'threat' }, { from: 'fb', to: 'lim', k: 'data' }, { from: 'lim', to: 'man', k: 'human' }],
        steps: [
          { show: 'full', hi: 'full' },
          { show: 'cb full-cb', flow: 'full-cb', hi: 'cb', mark: { cb: 'alert' } },
          { show: 'fb cb-fb', flow: 'cb-fb', hi: 'fb' },
          { show: 'lim fb-lim', flow: 'fb-lim', hi: 'lim' },
          { show: 'man lim-man', flow: 'lim-man', hi: 'man', mark: { man: 'ok' } },
          {} ],
        say: 'When things go wrong, the service should degrade step by step, not collapse. Normally, requests go to the primary model. | If errors or latency cross a threshold, a circuit breaker trips and stops sending traffic to the failing dependency. | Requests move to a fallback model: smaller or from another provider, but assessed and approved in advance like any other model. | If that is unavailable too, the service offers reduced features, such as cached or core answers. | And as a last resort, users are routed to a non-AI path, such as a human queue or a simple form. | One rule overrides convenience: when a safety or security control, such as a content filter, is unavailable, the system should fail closed, holding or routing output for review rather than skipping the check.' },
      { t: 'summary', items: ['Unbounded consumption: floods, heavy prompts, loops, cost', 'Layer edge, gateway, quota and server limits', 'Rate limits, quotas and budget caps do different jobs', 'Degrade step by step; security controls fail closed'],
        say: 'To recap. | Unbounded consumption includes floods, resource-heavy prompts, runaway agents and cost exhaustion. | Layer the limits: edge protection, gateway rate limits, quotas and budgets, and server-side limits. | Rate limits, quotas and budget caps do different jobs, so use all three. | And degrade step by step when dependencies fail, while making sure that security and safety controls fail closed.' } ] },
    { type: 'text', md: `### Unbounded consumption
The OWASP Top 10 for LLM Applications (2025) lists **LLM10: Unbounded Consumption**: uncontrolled use that leads to denial of service, financial loss (denial of wallet), degraded service, or model theft through excessive querying (Section 2). Model-specific causes include variable-length input floods, very long contexts, requests for maximum-length outputs, recursive agent loops and resource-intensive multimodal inputs. Module 6.1 covers availability attacks, and Module 4.2 covers infrastructure-level controls against resource exhaustion, such as compute throttling and isolated accelerator capacity.

### Controls
| Control | Practice |
|---|---|
| **Input limits** | Maximum prompt tokens, file sizes, image resolutions and number of attachments |
| **Output limits** | Maximum output tokens per request, set to what the use case needs |
| **Rate limiting** | Requests *and tokens* per minute, per key, user, organisation and IP range; token-bucket or sliding-window algorithms; HTTP 429 responses with a Retry-After header |
| **Quotas** | Daily or monthly token and call allowances per user, team and application, with tiers for different customers |
| **Budget caps** | Spending alerts at thresholds, with hard caps that stop or degrade usage; separate budgets for experiments |
| **Server protection** | Timeouts, concurrency limits, request queues with priorities (so critical workloads keep capacity), and autoscaling with a **maximum**, so an attack can’t scale costs without limit |
| **Agent limits** | Maximum steps, tool calls, recursion depth, run time and cost per task, with loop detection |
| **Caching** | Reuse answers to repeated questions to reduce load |

### Resilience and graceful degradation
- **Circuit breakers** stop calling a failing dependency and retry it gradually, protecting both your service and the dependency.
- **Fallbacks:** a smaller or alternative model, or a second provider. A fallback must be assessed and approved like any other model, including data residency and contractual terms, so it can’t become a back door around governance.
- **Reduced modes:** cached answers, core features only, or longer response times instead of errors.
- **Non-AI paths:** a human queue, a standard form or an offline process for essential services.
- **Fail closed for security functions:** if a moderation, DLP or authorisation service is unavailable, hold or route outputs for review rather than skipping the check. Fail open only where the risk assessment accepts it.
- **Plan and test:** capacity planning, SLOs, load and stress testing (Module 4.4), multi-region deployment for critical services, and business continuity plans that map AI dependencies (Module 5.7).` },
    { type: 'callout', kind: 'exam', title: 'Availability questions', md: `Look for **token-aware** limits (request counts alone miss one huge prompt), **per-identity** quotas, **budget caps** for denial of wallet, and **graceful degradation**. When a security control such as a content filter fails, the best answer is usually to **fail closed**, not to keep serving unchecked output.` },
    { type: 'match', title: 'Match the control to the problem', pairs: [
      ['One user sends 50 requests a second for a full minute', 'Rate limit'],
      ['A team uses its whole month’s token allowance in a week', 'Quota'],
      ['Spending on a pay-per-use API is heading for ten times the forecast', 'Budget cap'],
      ['A provider’s API keeps timing out, and every call waits 60 seconds', 'Circuit breaker'],
      ['The content filter is down, and replies are waiting to be checked', 'Fail closed'] ] },
    { type: 'check', q: { q: 'A customer-service LLM screens every reply through an external content-moderation API. The moderation API suddenly becomes unavailable. What should the system do?', o: ['Keep sending replies unmoderated, so that customers aren’t affected by the outage', 'Fail closed: hold replies or route them to human review until moderation is restored', 'Switch off logging for the outage, to reduce load on the remaining services', 'Retry each failed moderation call immediately until it succeeds, however long that takes'], a: 1, b: 5,
      why: 'Moderation is a safety control, so it should fail closed: hold or route replies for review rather than releasing unchecked content. Failing open removes the control, switching off logging loses evidence, and endless immediate retries add load to a struggling dependency.' } }
  ]
};
