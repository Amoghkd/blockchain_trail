# Blockchain App — Sepolia Setup & Start

A lightweight dApp to create, deploy and interact with Solidity contracts. The UI exposes contract functions as simple forms; contracts are immutable once deployed and viewable on SepoliaScan.

## Key features
- Create and deploy Solidity contracts from the UI (backend compiles & deploys).
- Expose contract functions in the frontend as form-driven interactions.
- Immutable on-chain state and direct links to SepoliaScan.
- Clear separation: backend (./backend) handles signing/deploy; frontend (./frontend/my-app) is the UI.

## Prerequisites
- Node.js v16+ and npm
- Git
- MetaMask (or compatible wallet)
- Infura account (or other Sepolia RPC provider)
- Windows (commands shown use PowerShell)

## Project layout
- Backend: ./backend
- Frontend app: ./frontend/my-app

## Infura / Sepolia RPC
1. Create an Infura project at https://infura.io and copy the Project ID.  
2. Sepolia RPC URL format:
```
https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```
3. Sepolia Chain ID: `11155111`

## Backend — configure & start
1. Open a terminal in the repo root and run:
```powershell
cd .\backend
npm install
```
2. Create `./backend/.env` (DO NOT COMMIT). Example:
```properties
PORT=4000
KEY="optional-app-key"
PRIVATEKEY="0xYOUR_SEPOLIA_PRIVATE_KEY"    # test-only key
INFURA_URL="https://sepolia.infura.io/v3/YOUR_PROJECT_ID"
sql_pass="your-db-password"
```
3. Add `./backend/.env` to `.gitignore`.  
4. Start the backend (keep it running while using the frontend):
```powershell
npm run start
# or
node index.js
```

## Frontend — install & start (exact relative path)
1. In a new terminal:
```powershell
cd .\frontend\my-app
npm install
```
2. Start the frontend:
- Create React App:
```powershell
npm start
```
- Vite:
```powershell
npm run dev
```
3. Open the URL printed by the start script (usually http://localhost:3000 or http://localhost:5173).

## MetaMask & Sepolia faucets
- MetaMask network settings (optional if using public RPC):
  - Network name: Sepolia
  - RPC URL: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID` or `https://rpc.sepolia.org`
  - Chain ID: `11155111`
  - Currency: ETH
- Faucets:
  - Paradigm Faucet: https://faucet.paradigm.xyz/
  - Sepolia Faucet: https://sepoliafaucet.com/

## Typical deploy / interact flow
1. Use the frontend UI to create a contract.  
2. Frontend calls backend endpoint to compile & deploy.  
3. Backend signs with PRIVATEKEY and deploys via INFURA_URL.  
4. Backend returns the contract address; view on SepoliaScan (https://sepoliascan.io).  
5. Interact with contract functions from the UI.

## Useful PowerShell commands
```powershell
# backend
cd .\backend
npm install
npm run start

# frontend (new terminal)
cd .\frontend\my-app
npm install
npm start
```

## Security
- Never commit `./backend/.env`. Add it to `.gitignore`.  
- Use a Sepolia test-only private key. If a key is exposed, rotate it immediately.  
- Do not use mainnet private keys in this repo.

