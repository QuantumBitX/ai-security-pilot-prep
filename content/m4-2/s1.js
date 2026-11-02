/* 4.2 · Section 1: hardening cloud, on-premises and hybrid AI deployments */
module.exports = {
  title: 'Hardening cloud, on-premises and hybrid AI deployments', covers: [1],
  blocks: [
    { type: 'video', title: 'Hardening the AI stack', kicker: 'Module 4.2 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.2 · AI infrastructure', title: 'Hardening the AI stack', sub: 'Cloud, on-premises and hybrid deployments', icon: 'server',
        say: 'AI platforms are built from ordinary infrastructure, often deployed in a hurry: GPU clusters, notebooks, model servers and orchestration tools, many designed for researchers rather than adversaries. | This video covers hardening AI deployments in the cloud, on premises, and across both.' },
      { t: 'layers', title: 'The AI infrastructure stack',
        layers: [
          { icon: 'code', label: 'ML tooling', sub: 'Notebooks, experiment trackers, pipelines, dashboards', k: 'human' },
          { icon: 'server', label: 'Model serving', sub: 'Inference servers, gateways and endpoints', k: 'model' },
          { icon: 'network', label: 'Orchestration', sub: 'Kubernetes, distributed compute frameworks, schedulers', k: 'data' },
          { icon: 'gpu', label: 'Compute and accelerators', sub: 'Hosts, GPUs, drivers and firmware', k: 'threat' },
          { icon: 'lock', label: 'Network, identity and storage', sub: 'Virtual networks, IAM, buckets, keys', k: 'control' } ],
        say: 'Every layer of the AI stack needs hardening. | At the top, machine learning tooling: notebooks, experiment trackers, pipelines and dashboards, often the weakest point. | Model serving: inference servers, gateways and endpoints. | Orchestration: Kubernetes, distributed compute frameworks and job schedulers. | Compute and accelerators: hosts, GPUs, drivers and firmware. | And underneath it all, the network, identity and storage layer: virtual networks, access management, storage buckets and keys.' },
      { t: 'bullets', title: 'Common weaknesses', layout: 'grid', cols: 2, items: [
          { icon: 'globe', h: 'Exposed dashboards and APIs', d: 'Tools reachable without authentication', k: 'threat' },
          { icon: 'key', h: 'Secrets in notebooks', d: 'Tokens and keys left in code and output', k: 'human' },
          { icon: 'bug', h: 'Unpatched stack', d: 'Drivers, inference servers, frameworks', k: 'model' },
          { icon: 'database', h: 'Public storage', d: 'Datasets and checkpoints left open', k: 'data' },
          { icon: 'unlock', h: 'Over-privileged identities', d: 'Broad roles on clusters and buckets', k: 'neutral' },
          { icon: 'network', h: 'Flat networks', d: 'Open egress, no segmentation', k: 'control' } ],
        say: 'The same weaknesses appear again and again. | Dashboards and job APIs reachable from the internet without authentication. In 2024, attackers exploited exposed clusters running Ray, a popular distributed AI framework whose job interface lacked authentication by default, to steal credentials and computing power. | Secrets left in notebooks: tokens and keys in code cells and saved output. | Unpatched drivers, inference servers and frameworks. | Datasets and model checkpoints in publicly readable storage. | Over-privileged service accounts on clusters and buckets. | And flat networks with open internet egress, where one foothold reaches everything.' },
      { t: 'compare', title: 'Cloud, on-premises and hybrid', labels: ['You harden', 'Key risks', 'Key controls'],
        cols: [{ h: 'Cloud', icon: 'cloud', k: 'data' }, { h: 'On-premises', icon: 'building', k: 'human' }, { h: 'Hybrid', icon: 'link', k: 'model' }],
        rows: [
          ['Configuration, identity, data', 'Everything, down to hardware', 'Both, plus the links'],
          ['Misconfiguration, public endpoints', 'Patching, firmware, physical', 'Inconsistent policy, exposed links'],
          ['Policy guardrails, private endpoints', 'Hardened images, isolated management', 'One identity, private links, one policy'] ],
        say: 'Responsibilities shift with the deployment model. | In the cloud, you harden configuration, identity and data. On premises, you harden everything, down to the hardware. In hybrid deployments, you harden both, plus the links between them. | Cloud risks centre on misconfiguration and public endpoints. On-premises risks include patching, firmware and physical security. Hybrid adds inconsistent policies and exposed connections. | So in the cloud, use organisation-wide policy guardrails and private endpoints. On premises, use hardened images and an isolated management network. And for hybrid, use one identity system, private connectivity, and one policy applied everywhere.' },
      { t: 'bullets', title: 'A hardening baseline', layout: 'grid', cols: 2, items: [
          { icon: 'list', h: 'Start from benchmarks', d: 'CIS for OS, Kubernetes, cloud', k: 'neutral' },
          { icon: 'lock', h: 'Private by default', d: 'No public endpoints or buckets', k: 'control' },
          { icon: 'id', h: 'Least-privilege identities', d: 'Workload identity, no long-lived keys', k: 'human' },
          { icon: 'cycle', h: 'Patch the AI stack', d: 'Drivers, servers, frameworks', k: 'threat' },
          { icon: 'container', h: 'Harden containers', d: 'Minimal, non-root, signed', k: 'model' },
          { icon: 'eye', h: 'Log and monitor', d: 'Control plane, data, GPU use', k: 'data' } ],
        say: 'A practical baseline has six parts. | Start from published benchmarks, such as the CIS benchmarks for operating systems, Kubernetes and cloud platforms. | Make everything private by default: no public endpoints, no public buckets. | Use least-privilege identities, with workload identity rather than long-lived keys. | Patch the whole AI stack, including GPU drivers, inference servers and frameworks. | Harden containers: minimal images, running as non-root, signed and checked at admission. | And log and monitor the control plane, data access and GPU usage, so misuse is spotted quickly.' },
      { t: 'summary', items: ['Harden every layer, from tooling to network and identity', 'ML tools are often exposed, unauthenticated and full of secrets', 'Cloud, on-premises and hybrid shift what you harden', 'Benchmarks, private by default, least privilege, patching, monitoring'],
        say: 'To recap. | Harden every layer of the AI stack, from machine learning tools down to network, identity and storage. | Machine learning tools are often exposed, unauthenticated and full of secrets, so start there. | Cloud, on-premises and hybrid deployments shift what you have to harden. | And build on benchmarks, private-by-default networking, least privilege, patching and monitoring.' } ] },
    { type: 'text', md: `### Why AI infrastructure is a soft target
AI platforms combine high-value assets (data, weights, GPU capacity) with tools built for fast experimentation: notebooks, experiment trackers, model registries, distributed compute frameworks and inference servers. Many ship with authentication off or optional, assume a trusted network, and are deployed by data scientists rather than platform engineers.

**Case: ShadowRay (2024).** Researchers reported active exploitation of internet-exposed clusters running Ray, a widely used distributed computing framework for AI. Ray’s job submission API had no authentication by default (the project’s position was that clusters should only run in trusted, isolated networks). Attackers used exposed clusters to run arbitrary code, steal cloud credentials and tokens, access data and models, and mine cryptocurrency on GPUs. The lesson: **never expose AI tooling directly to the internet**, and treat "it’s meant for a trusted network" as a requirement you must enforce.

### Hardening by layer
| Layer | Key hardening controls |
|---|---|
| **ML tooling** | Authentication and SSO on notebooks, trackers, registries and dashboards; private access only; secret scanning of notebooks and repositories; per-user environments rather than shared kernels |
| **Model serving** | Authenticated endpoints, disabled debug and admin interfaces, input size limits, patched inference servers, minimal images, network policies |
| **Orchestration** | Kubernetes RBAC with least privilege, network policies, Pod Security Standards (restricted profile), encrypted secrets, audit logging, admission control for signed images |
| **Compute and accelerators** | Hardened OS images, timely GPU driver and firmware updates, isolated baseboard management (BMC) networks, disabled unused services |
| **Network, identity and storage** | Private endpoints, segmentation, egress filtering, workload identity, no long-lived keys, encryption with managed keys, blocking public buckets by policy |

### Deployment models
- **Cloud:** use organisation-level policies (for example, service control policies or organisation constraints) to block public endpoints and buckets, restrict regions and enforce encryption; manage everything as **infrastructure as code** with policy checks; use posture management (CSPM, AI-SPM and DSPM, Module 3.4) to detect drift.
- **On-premises:** you own patching, firmware, physical security and capacity; keep management networks isolated; maintain golden images; plan GPU driver and firmware updates as part of change management.
- **Hybrid:** unify identity (federation, single sign-on), connect sites through private interconnects or encrypted tunnels, apply the same policies and monitoring in both, and make sure data residency rules are enforced wherever workloads run.

### Baseline references
CIS Benchmarks (operating systems, Kubernetes, cloud foundations), cloud providers’ security reference architectures for AI services, the NSA and CISA Kubernetes Hardening Guide, and vendor security bulletins for GPU drivers and inference servers.` },
    { type: 'callout', kind: 'exam', title: 'Hardening questions', md: `If an AI tool is exposed to the internet, the first fix is almost always to **remove the exposure** (private networking with authentication) and check for compromise, not to add monitoring or ask users to be careful. "Designed for trusted networks" means you must provide that trusted network.` },
    { type: 'check', q: { q: 'A data science team runs a distributed training cluster whose dashboard and job API are reachable from the internet, so that remote staff can use them. What is the BEST action?', o: ['Leave it reachable, but add a banner warning that access is for authorised staff only', 'Move it behind private networking with authentication, and check for signs of compromise', 'Change the dashboard to a non-standard port number so that scanners are less likely to find it', 'Ask staff to keep the dashboard address confidential and not share it outside the team'], a: 1, b: 1,
      why: 'Internet-exposed AI tooling without strong authentication is actively exploited. Removing exposure and requiring authentication fixes the root cause, and checking for compromise addresses what may already have happened. Banners, unusual ports and secrecy are not controls.' } }
  ]
};
