<div align="center">

# HAUNTED REPO

### Echoes of Forgotten Code

**THE PAST IS NEVER TRULY DELETED.**

**HACKTOBERFEST 2026 | WEEK 4 — GHOST IN THE MACHINE**

![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2026-EA4AAA?style=for-the-badge)
![Challenge](https://img.shields.io/badge/DEV-Week_4_Challenge-111827?style=for-the-badge)
![Gemma](https://img.shields.io/badge/AI-Gemma_3_4B-4285F4?style=for-the-badge)
![Ollama](https://img.shields.io/badge/Inference-Local-374151?style=for-the-badge)

</div>

---

## What if deleted code could speak?

**Haunted Repo** is a developer-focused application that explores deleted files in Git history and brings them back to life using locally running, open-weight AI.

It combines **Git archaeology**, **AI storytelling**, and **technical code analysis** to uncover the stories behind forgotten code.

| Discover                          | Resurrect                        | Investigate                              |
| --------------------------------- | -------------------------------- | ---------------------------------------- |
| Find deleted files in Git history | Generate fictional ghost stories | Analyze recovered code                   |
| Recover historical source         | Give forgotten files a voice     | Explore purpose and potential weaknesses |

**Built with:** React · Node.js · Express · Git · Gemma 3 4B · Ollama

---

## Haunted Repo in Action

### Watch the Demo

See Haunted Repo in action — from scanning a local Git repository to generating ghost stories and revealing the Reaper's Verdict.

[![Watch the Haunted Repo Demo](https://img.youtube.com/vi/ofWmAw0uET8/maxresdefault.jpg)](https://youtu.be/ofWmAw0uET8)

### 01. Enter the Haunted Repository

Scan a local Git repository and discover the code left behind.

![Haunted Repo Landing Page](screenshots/haunted-repo-hero.png)

### 02. Explore the Graveyard

Browse deleted files discovered through Git history.

![Deleted Files Graveyard](screenshots/haunted-repo-graveyard.png)

### 03. Listen to the Ghost's Story

Let Gemma transform recovered source code into a fictional confession.

![The Ghost's Story](screenshots/haunted-repo-ghost-story.png)

### 04. Receive the Reaper's Verdict

Switch from storytelling to technical investigation.

![The Reaper's Verdict](screenshots/haunted-repo-reapers-verdict.png)

---

## Features

### Repository Scanner & Graveyard

**Discover what Git remembers.**

- Scan local Git repositories using an absolute filesystem path.
- Discover files deleted throughout the repository's history.
- Explore an interactive graveyard and select files to investigate.

### Git History & Code Recovery

**The evidence comes from Git. Not AI guesses.**

- Recover available historical source code.
- Retrieve Git history and file evidence.
- Supply recovered code as context for AI generation.

### The Ghost's Story — Powered by Gemma 3

**Every deleted file deserves one last confession.**

- Generate fictional stories inspired by recovered source code.
- Give forgotten files a first-person narrative.
- Run Gemma 3 4B locally through Ollama.

### Hear My Last Words — Ghost Narration

**The ghost doesn't just leave a message. It speaks.**

- Narrate generated stories using the browser's Web Speech API.
- Add atmospheric audio to the experience.
- Use browser-based speech synthesis without a hosted TTS API.

### The Reaper's Verdict — Technical Investigation

**Enough ghost stories. Time for the code review.**

- Analyze recovered source code using Gemma 3.
- Explore a deleted file's likely purpose and implementation.
- Identify potential weaknesses and areas worth investigating.

### Haunted Interface

**Git archaeology, with a darker atmosphere.**

- Responsive interface built with React, Vite, and Tailwind CSS.
- Interactive graveyard, story generation, and technical verdicts.
- Halloween-inspired visuals and sound effects.

---

## How It Works

| Step | Process                                                 |
| ---- | ------------------------------------------------------- |
| 01   | Enter the absolute path to a local Git repository       |
| 02   | Git identifies files deleted from repository history    |
| 03   | Select a file and recover available historical evidence |
| 04   | Send recovered context to Gemma 3 through Ollama        |
| 05   | Generate a ghost story or technical verdict             |

### Architecture

```text
React + Vite Frontend
         |
         v
Node.js + Express API
         |
         +----> Git CLI
         |      Discover deleted files
         |      Recover historical source
         |
         +----> Ollama (localhost)
                Gemma 3 4B
                Story generation
                Technical analysis
```

**Git provides the historical evidence. Gemma interprets that evidence.**

---

## Why Gemma 3?

Haunted Repo uses **Gemma 3 4B**, an open-weight language model running locally through Ollama.

The same model supports two different experiences:

|          | The Ghost's Story                | The Reaper's Verdict             |
| -------- | -------------------------------- | -------------------------------- |
| Purpose  | Creative storytelling            | Technical investigation          |
| Input    | Recovered source and Git context | Recovered source and Git context |
| Output   | Fictional first-person narrative | AI-generated code interpretation |
| Approach | Imaginative                      | Analytical                       |

### Why local, open-weight AI?

- **Local inference:** Model execution takes place on the developer's machine.
- **Code privacy:** Recovered source code does not need to be sent to a hosted AI API.
- **Model flexibility:** The application can be adapted to use other locally supported models.
- **Offline potential:** After installing the dependencies and downloading the model, AI generation can run without an external inference service.
- **Open experimentation:** Prompts and model behavior can be explored without relying on a proprietary hosted model.

Gemma is central to Haunted Repo: without the model, Git can recover deleted code, but it cannot generate the ghost's story or the Reaper's technical interpretation.

---

## Tech Stack

| Layer               | Technology       | Purpose                                  |
| ------------------- | ---------------- | ---------------------------------------- |
| Frontend            | React, Vite      | Interactive application                  |
| Styling             | Tailwind CSS     | Responsive haunted interface             |
| Backend             | Node.js, Express | API and application logic                |
| Repository analysis | Git CLI          | File discovery and historical recovery   |
| AI model            | Gemma 3 4B       | Story generation and code interpretation |
| Local inference     | Ollama           | Run Gemma locally                        |
| Narration           | Web Speech API   | Browser-based voice synthesis            |

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- **Node.js and npm** — To run the frontend and backend.
- **Git** — To inspect repository history.
- **Ollama** — To run the AI model locally.
- **Gemma 3 4B** — The model used for AI generation.

A machine with sufficient available memory is required to run Gemma 3 4B. Performance will depend on your hardware.

### 1. Clone the Repository

```bash
git clone https://github.com/ThanziaPatelRaheem/haunted-repo.git
cd haunted-repo
```

### 2. Download the AI Model

Install Ollama from:

https://ollama.com

Then download Gemma 3 4B:

```bash
ollama pull gemma3:4b
```

Make sure Ollama is running.

If the Ollama service is not already active, start it:

```bash
ollama serve
```

On systems where the Ollama application already runs the service, you do not need to start a second instance.

### 3. Start the Backend

Open a terminal in the project directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=3000
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:4b
```

Start the backend:

```bash
npm run dev
```

### 4. Start the Frontend

Open another terminal from the project root:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

---

## Try It with a Demo Repository

You don't need an existing project with deleted files to test Haunted Repo.

Create a small Git repository containing a file that gets committed and later deleted.

### 1. Create the Demo Repository

Open a separate terminal outside the Haunted Repo application directory:

```bash
mkdir haunted-demo-repo
cd haunted-demo-repo

git init
git config user.name "Demo Developer"
git config user.email "demo@example.com"

mkdir src
echo "export const oldAuth = () => true;" > src/oldAuth.js

git add .
git commit -m "Add old authentication module"

git rm src/oldAuth.js
git commit -m "Remove old authentication module"
```

### 2. Find the Repository Path

Run:

```bash
pwd
```

Copy the absolute path printed by your terminal.

### 3. Scan the Repository

1. Open Haunted Repo in your browser.
2. Paste the demo repository's absolute path.
3. Run the repository scan.
4. Select `src/oldAuth.js` from the graveyard.
5. Generate **The Ghost's Story** or **The Reaper's Verdict**.

The deleted file remains available in Git history even though it no longer exists in the current working directory.

---

## Technical Considerations & Limitations

| Area              | Consideration                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Local access      | Designed for local development and use on trusted machines                                                                    |
| Filesystem access | The backend receives local repository paths; do not expose the API publicly without appropriate access controls               |
| Git history       | Deleted files must have been committed to Git to be discoverable                                                              |
| Recovery          | Historical source recovery depends on available Git history                                                                   |
| AI interpretation | Technical verdicts are model-generated interpretations, not verified explanations of deletion                                 |
| Performance       | Generation speed depends on local hardware and model availability                                                             |
| Speech synthesis  | Available voices and narration quality depend on the browser and operating system                                             |
| Offline use       | Local AI inference does not require a hosted model API, but initial setup requires downloading dependencies and model weights |

**Security:** Haunted Repo is intended to run locally. Do not deploy its filesystem-scanning backend as a publicly accessible service without adding authentication, repository path restrictions, and other appropriate protections.

---

## Hacktoberfest 2026

Haunted Repo was created for the **DEV Hacktoberfest Week 4 — Ghost in the Machine** challenge.

The project explores the theme through deleted code, fictional ghosts, and local open-weight AI.

**Challenge focus:** Building an application where open-source or open-weight AI is essential to the experience.

**Model:** Gemma 3 4B, running locally with Ollama.

**Theme:** Bringing forgotten code back from the dead.

---

## Project Status

Haunted Repo is a functional challenge project built around local Git analysis and AI-powered exploration.

Potential future improvements include:

- Additional repository analysis capabilities.
- More detailed historical comparisons.
- Support for configurable local AI models.
- Improved narration and audio controls.

---

_Some code gets refactored. Some gets replaced. And some refuses to rest in peace._
