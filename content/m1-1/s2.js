/* 1.1 · Section 2: ML paradigms */
module.exports = {
  title: 'How machines learn: the ML paradigms', covers: [2],
  blocks: [
    { type: 'video', title: 'Three ways machines learn', kicker: 'Module 1.1 · Video 2 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · AI concepts', title: 'Three ways machines learn', sub: 'Supervised, unsupervised and reinforcement learning', icon: 'vector',
        say: 'Every machine-learning system learns in one of a few basic ways. | Knowing which one a system uses tells you what it needs, how it fails, and how it can be attacked.' },
      { t: 'compare', title: 'The three core paradigms', cols: [{ h: 'Supervised', icon: 'tag', k: 'data' }, { h: 'Unsupervised', icon: 'vector', k: 'model' }, { h: 'Reinforcement', icon: 'target', k: 'human' }],
        labels: ['Learns from', 'Goal', 'Security use'], rows: [
          ['Labelled examples', 'Unlabelled data', 'Rewards from an environment'],
          ['Predict a label or a value', 'Find structure or outliers', 'Learn actions that maximise reward'],
          ['Spam, phishing and malware detection', 'Clustering alerts, spotting anomalies', 'Automated defence and testing research'] ],
        say: 'There are three core paradigms. | Supervised learning learns from labelled examples. Unsupervised learning works with data that has no labels. Reinforcement learning learns from rewards it earns by acting in an environment. | Their goals differ too: predict a label or a value, find hidden structure, or learn a sequence of actions. | In security, supervised models detect spam, phishing and malware, unsupervised models cluster alerts and spot anomalies, and reinforcement learning shows up in research on automated defence and testing.' },
      { t: 'vector', title: 'Supervised learning: learn the boundary', seed: 21,
        clusters: [
          { label: 'Legitimate', k: 'data', cx: 0.28, cy: 0.62, n: 14, sp: 0.09 },
          { label: 'Spam', k: 'threat', cx: 0.72, cy: 0.34, n: 14, sp: 0.09 } ],
        boundary: [0.2, 0.08, 0.82, 0.92], boundaryLabel: 'Learned boundary',
        query: { x: 0.36, y: 0.48, label: 'New email' },
        notes: [{ h: 'Labelled examples', d: 'Each dot is an email someone has already marked as legitimate or spam.' }, { h: 'Two classes', d: 'The labels are the right answers the model learns from.' }, { h: 'Training', d: 'The model learns a boundary that separates the classes as well as possible.' }, { h: 'Prediction', d: 'A new email is classified by which side of the boundary it falls on: legitimate.' }],
        steps: ['points', 'labels', 'boundary', 'query'],
        say: 'In supervised learning, every training example comes with the right answer, called its label. | Here, each dot is an email that someone has already labelled as legitimate or spam. | Training finds a boundary that separates the two classes as well as possible. | When a new email arrives, the model predicts its label from the side of the boundary it falls on.' },
      { t: 'vector', title: 'Unsupervised learning: find the structure', seed: 8,
        clusters: [
          { label: 'Office hours logins', k: 'data', cx: 0.25, cy: 0.35, n: 12, sp: 0.07 },
          { label: 'Overnight batch jobs', k: 'model', cx: 0.7, cy: 0.3, n: 11, sp: 0.06 },
          { label: 'Remote VPN logins', k: 'human', cx: 0.45, cy: 0.74, n: 12, sp: 0.07 } ],
        poison: { pts: [[0.88, 0.82]], k: 'neutral', label: 'Fits no cluster: anomaly', lx: 0.7, ly: 0.93 },
        notes: [{ h: 'No labels', d: 'The model sees raw activity with no right answers attached.' }, { h: 'Clusters emerge', d: 'Similar behaviour groups together on its own.' }, { h: 'Anomalies stand out', d: 'Activity that fits no cluster is flagged for a human to review.' }],
        steps: ['points', 'labels', 'poison'],
        say: 'Unsupervised learning gets no labels at all. | It looks for structure on its own, grouping similar behaviour into clusters, such as normal patterns of logins. | Anything that fits no cluster stands out as an anomaly. That is the idea behind much of security analytics, including user and entity behaviour analytics.' },
      { t: 'cycle', title: 'Reinforcement learning: trial, error, reward', center: 'Agent learns a policy', centerSub: 'what to do in each situation', intro: 'No labels and no fixed dataset: the agent learns by acting and collecting rewards.',
        stages: [
          { icon: 'eye', label: 'Observe the state', d: 'The agent sees the current situation in its environment.' },
          { icon: 'bolt', label: 'Take an action', d: 'It chooses an action, sometimes exploring something new.' },
          { icon: 'globe', label: 'Environment responds', d: 'The world changes as a result of the action.' },
          { icon: 'star', label: 'Receive a reward', d: 'A score says how good the outcome was.' },
          { icon: 'cycle', label: 'Update the policy', d: 'It adjusts its strategy to earn more reward over time.' } ],
        say: 'Reinforcement learning works differently again. | An agent observes the state of its environment. | It takes an action, sometimes exploiting what it knows and sometimes exploring something new. | The environment responds, and changes. | The agent receives a reward, a score for how good the outcome was. | And it updates its policy, its strategy for what to do in each situation, to earn more reward over time. | Language models are tuned the same way in reinforcement learning from human feedback, where people’s preferences become the reward.' },
      { t: 'bullets', title: 'Variations you will meet', layout: 'grid', cols: 2, items: [
          { icon: 'tag', h: 'Semi-supervised', d: 'A few labels plus lots of unlabelled data' },
          { icon: 'text', h: 'Self-supervised', d: 'Labels come from the data itself, such as the next word' },
          { icon: 'copy', h: 'Transfer learning', d: 'Start from a pretrained model and adapt it' },
          { icon: 'network', h: 'Federated learning', d: 'Train where the data lives; share only updates' } ],
        say: 'Real systems often blend these ideas. | Semi-supervised learning combines a small set of labels with a large pool of unlabelled data. | Self-supervised learning makes its own labels from the data, for example by predicting the next word. That is how language models are pretrained. | Transfer learning starts from a model that has already learned something general and adapts it to a new task. | And federated learning trains across many devices or sites, sharing model updates instead of raw data.' },
      { t: 'quiz', q: 'A fraud team has millions of transactions, but almost none are labelled as fraudulent. They want to flag unusual activity for analysts. Which approach fits BEST?',
        o: ['Supervised classification trained on the few labelled cases', 'Unsupervised anomaly detection', 'Reinforcement learning with a reward for each detection', 'Transfer learning from an image recognition model'], a: 1,
        why: 'With almost no labels, a supervised model has little to learn from. Unsupervised anomaly detection learns what normal looks like and flags what doesn’t fit, which is exactly the task.' },
      { t: 'compare', title: 'Each paradigm has a characteristic weakness', cols: [{ h: 'Paradigm', icon: 'layers', k: 'neutral' }, { h: 'What can go wrong', icon: 'alert', k: 'threat' }], rows: [
          ['Supervised', 'Wrong or tampered labels teach the wrong boundary'],
          ['Unsupervised', 'Slowly shifting “normal” can make malicious activity look ordinary'],
          ['Reinforcement', 'Reward hacking: the agent games the metric instead of the goal'],
          ['Federated and online', 'Bad updates arrive through the training process itself'] ],
        say: 'Each paradigm also has a characteristic weakness. | Supervised models are only as good as their labels. Wrong or tampered labels teach the wrong boundary. | Unsupervised models learn what normal looks like, so if normal drifts slowly, malicious activity can come to look ordinary. | Reinforcement learners can find loopholes, maximising the reward without achieving the real goal. This is called reward hacking. | And systems that learn continuously, or from many participants, can receive harmful updates through the training process itself.' },
      { t: 'summary', items: [
          'Supervised learning needs labels and predicts labels or values',
          'Unsupervised learning finds clusters and anomalies without labels',
          'Reinforcement learning optimises actions for reward',
          'Self-supervised pretraining is how LLMs learn language' ],
        say: 'To recap. | Supervised learning needs labels, and predicts labels or values. | Unsupervised learning finds clusters and anomalies without labels. | Reinforcement learning optimises actions for reward. | And self-supervised pretraining is how large language models learn language in the first place.' }
    ] },
    { type: 'text', md: `### Supervised learning

In **supervised learning** the training data contains inputs and the correct outputs, called **labels**. The inputs are described by **features**: measurable properties such as an email’s sender reputation, the number of links it contains or the words it uses. The model learns a mapping from features to labels, then applies it to new data.

Supervised tasks come in two kinds:

- **Classification** predicts a category: spam or legitimate, malicious or benign, fraud or not fraud.
- **Regression** predicts a number: a risk score, a transaction value, the time until a disk fails.

Data is normally split three ways. The **training set** teaches the model. The **validation set** is used to tune it and to decide when to stop training. The **test set** is held back until the end to estimate real-world performance. If test data leaks into training, results look better than they are, which is why dataset separation is a control as well as good practice.

The goal is **generalisation**: performing well on data the model has never seen. A model that memorises its training data (**overfitting**) or is too simple to capture the pattern (**underfitting**) generalises poorly.

### Unsupervised learning

**Unsupervised learning** finds structure in data that has no labels. The main techniques are:

- **Clustering**, which groups similar items, for example grouping endpoints by behaviour or alerts by root cause.
- **Dimensionality reduction**, which compresses many features into fewer while keeping the important variation. It is useful for visualisation and for speeding up other models.
- **Anomaly detection**, which learns what normal looks like and flags what doesn’t fit. Much of user and entity behaviour analytics (UEBA) works this way.
- **Association analysis**, which finds items that occur together.

Unsupervised methods are attractive in security because labelled attack data is scarce. Their weakness is interpretation: an anomaly is unusual, not necessarily malicious, so a person must decide what it means.` },
    { type: 'tabs', title: 'Reinforcement learning, term by term', items: [
      ['Agent and environment', `The **agent** is the learner that makes decisions. The **environment** is everything it interacts with: a game, a robot’s surroundings, a simulated network. The **state** is the agent’s view of the environment at a given moment.`],
      ['Actions and rewards', `At each step the agent takes an **action**. The environment responds with a new state and a **reward**, a number that scores the outcome. The agent’s aim is to maximise **cumulative** reward over time, not just the next reward.`],
      ['Policy', `The **policy** is the agent’s strategy: what action to take in each state. Training improves the policy. In deep reinforcement learning the policy is a neural network.`],
      ['Exploration vs exploitation', `The agent must balance **exploiting** actions it already knows work against **exploring** new actions that might work better. Too little exploration gets stuck in mediocre strategies; too much wastes effort.`],
      ['RLHF', `**Reinforcement learning from human feedback** tunes language models using human preferences. People rank model responses, a *reward model* learns to predict those rankings, and the language model is then optimised to produce responses the reward model scores highly. It is a major reason chat assistants behave helpfully and refuse some requests.`] ] },
    { type: 'text', md: `### Other learning setups

- **Semi-supervised learning** combines a small labelled set with a large unlabelled one, which helps when labelling is expensive, as it is with expert-reviewed security events.
- **Self-supervised learning** generates labels from the data itself: predict the next word, fill in a masked word, or predict a missing patch of an image. It lets models learn from enormous unlabelled datasets and is how foundation models are pretrained.
- **Transfer learning** reuses a model trained on one task as the starting point for another. Fine-tuning a foundation model is transfer learning. It saves data and compute, but the new model inherits the original’s strengths, biases and any hidden flaws.
- **Federated learning** trains a shared model across many devices or organisations. Each participant trains locally and sends only model updates to be combined, so raw data never leaves its owner. That helps privacy, but the combining step must defend against participants who send harmful updates.
- **Online (continual) learning** updates the model as new data arrives. It adapts quickly to change, and for the same reason it can be pushed in the wrong direction by manipulated data.` },
    { type: 'table', title: 'Paradigms side by side', head: ['Paradigm', 'Training signal', 'Typical tasks', 'Characteristic risk'], rows: [
      ['Supervised', 'Human-provided labels', 'Classification, regression', 'Mislabelled or tampered training labels'],
      ['Unsupervised', 'None: structure in the data', 'Clustering, anomaly detection', 'Gradual baseline shift hides real attacks'],
      ['Semi-supervised', 'A few labels plus unlabelled data', 'Classification with scarce labels', 'Errors in the few labels spread widely'],
      ['Self-supervised', 'Labels derived from the data', 'Foundation model pretraining', 'Harmful or false content absorbed at scale'],
      ['Reinforcement', 'Reward from an environment', 'Control, games, RLHF tuning', 'Reward hacking and specification gaming'],
      ['Federated', 'Local training, shared updates', 'Privacy-sensitive collaboration', 'Malicious participants and their updates'] ] },
    { type: 'callout', kind: 'remember', title: 'Reward hacking in one sentence', md: `A reinforcement learner optimises exactly what it is rewarded for, not what you meant. If a cleaning robot is rewarded for not *seeing* mess, covering its camera is a winning strategy. Writing objectives that can’t be gamed is a recurring safety problem, and it reappears with AI agents.` },
    { type: 'scenario', title: 'Choosing the paradigm', md: `A security operations team wants a model that ranks incoming alerts by how likely they are to be true positives. Over two years, analysts have closed 400,000 alerts and recorded whether each was a real incident or a false positive.`,
      q: { q: 'Which learning approach is the MOST natural fit?', o: ['Supervised learning, using the analysts’ dispositions as labels', 'Unsupervised clustering, because alert data has no labels', 'Reinforcement learning, rewarding the model for closing alerts quickly', 'Self-supervised learning, predicting the next alert in sequence'], a: 0, b: 2,
        why: 'The analysts’ recorded outcomes are labels, so this is a classic supervised classification problem. Rewarding speed would invite the model to close alerts regardless of risk, which is reward hacking in action.' } }
  ]
};
