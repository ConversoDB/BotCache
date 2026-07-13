# BotCache


BotCache is a browser extension and web application that helps users store, manage, and interact with English vocabulary using AI-powered features. It offers two main modes: Storage (for saving and looking up words) and ChatBot (for AI-driven conversations and explanations). The project is built with React, TypeScript, and integrates with Google Gemini AI for advanced language features.


<div display="flex" align="center" class="text-center">
 
 <img alt="last-commit" src="https://img.shields.io/github/last-commit/anwesha2002/BotCache?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;"/>
 <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/anwesha2002/BotCache?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;"/>
 <img alt="repo-language-count" src="https://img.shields.io/github/languages/count/anwesha2002/BotCache?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;"/>
</div>



## 🚀 Features
 - Vocabulary Storage: Save new words, meanings, examples, and synonyms just by selecting.
 - AI ChatBot: Ask questions or get explanations about words and phrases just by selecting it.
 - Email Integration: Associate vocabulary with your email for personalized storage.
 - Chrome Storage: Persist user preferences and data using Chrome's storage API.
 - Responsive UI: Clean, user-friendly interface with support for multiple modes.
 - Pronunciation Support: Store and retrieve phonetic and audio pronunciation.
   
## 🏗️ Project Structure

```
BotCache/
│
├── Backend/         # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── Controllers/   # Route controllers (Vocabulary)
│   │   ├── Models/        # Mongoose models (Vocabulary)
│   │   ├── Routes/        # Express route definitions
│   │   └── util/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── src/         # React + Vite frontend
│   ├── Components/    # Reusable UI components
│   ├── AI-Setup/      # Generates AI response
│   ├── Constants/     # Pre-Prompts for the AI model
│   ├── Models/        # TypeScript models/interfaces
│   ├── Network/       # API service layer
│   ├── Hooks/         # Hooks for modular and reusable approach 
│   └── Style/         # CSS modules
│
├── public/
├── package.json
├── vite.config.ts
├── Manifest.json
└── README.md
```

## 🛠️ Tech Stack

 - Frontend: React, Vite, TypeScript, CSS, Crxjs
 - Backend: Node.js, Express, MongoDB, Mongoose

<div display="flex" align="center" class="text-center">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&amp;logo=React&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&amp&logo=typescript&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Express" src="https://img.shields.io/badge/Express-000000.svg?style=flat&amp;logo=Express&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="crxjs" src="https://img.shields.io/badge/crxjs-000000.svg?style=flat&amp;logo=crxjs&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-3492FF.svg?style=flat&amp;logo=Node.js&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&amp;logo=Mongoose&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Nodemon" src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&amp;logo=Nodemon&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="generative-ai" src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat&amp&logo=googlegemini&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&amp;logo=npm&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
</div>
   
## ⚡ Getting Started

Prerequisites

 - Node.js (v18+ recommended)
 - npm or yarn
 - MongoDB instance (local or cloud)
 - Google Gemini API key (for AI features)
 - Chrome browser (for extension features)
   
1. Clone the Repository

```
https://github.com/ConversoDB/BotCache.git
cd BotCache
```

3. Setup Backend

```
cd Backend
npm install
```

 Create a .env file with your MongoDB URI and other secrets
 Add your Google Gemini API key: VITE_GOOGLE_API_KEY=your_google_gemini_api_key
```
npm start
```

4. Setup Frontend

```
npm install
npm run dev
```

5. Build for production:

```
npm run build
```

6. Go to manage extension and set to development mode and upload the dist folder

## 📦 Releasing

Every push of a version tag (e.g. `v1.0.1`) triggers a GitHub Actions workflow (`.github/workflows/release.yml`) that builds the extension and publishes a GitHub Release with the packaged `dist/` folder attached as a zip.

1. Bump the version in `manifest.json` (and `package.json` if desired)
2. Tag and push:

```
git tag v1.0.1
git push origin v1.0.1
```

3. The workflow builds the extension and attaches `botcache-v1.0.1.zip` to the new release on the [Releases page](https://github.com/anwesha2002/BotCache/releases)
4. Download and unzip the asset, then load it as an unpacked extension via `chrome://extensions`

> Note: the workflow requires a repo secret named `VITE_GOOGLE_API_KEY` (Settings → Secrets and variables → Actions) set to the same Google Gemini API key used locally in `.env.local`.

## 🧩Usage
 - Select Mode: Choose between Storage, ChatBot, or Disable from the main interface
 - Add Vocabulary: select a word or sentence, its meaning, example, and (optionally) synonyms and pronunciation will be stored automatically.
 - Chat with AI: Switch to ChatBot mode to ask questions or get explanations.
 - Remove Data: Use the remove button to clear your email or stored data.
   
## 📸 Screenshots

<div display="flex" align="center" class="text-center">

<kbd margin-bottom = "10">
  <img width="554" height="401" margin="15" alt="Screenshot 2025-08-03 122205" src="https://github.com/user-attachments/assets/b59e312e-96bb-441c-a422-ec0c4b4a32e0" />
</kbd><br />
  <br />
  <video src="https://github.com/user-attachments/assets/47f323f6-ab61-46f6-b89b-7a6a1452f5fc"/> 

   




</div>





