# AI Secure Data Intelligence Platform

An AI-powered log analysis and security intelligence platform that detects sensitive data exposure, analyzes risks, and provides actionable insights.

## Features

* Log file upload (.log / .txt)
* Sensitive data detection (email, password, API key, token)
* Risk classification (Critical, High, Medium, Low)
* Highlighted log visualization
* AI-powered security insights
* Risk scoring engine
* Real-time analysis dashboard

## Tech Stack

Frontend:

* Next.js
* TypeScript
* Tailwind CSS

Backend:

* Node.js
* Express.js
* Multer (file upload)
* Regex-based detection engine
* Optional LLM integration

## Setup Instructions

### Backend

```
cd backend
npm install
node server.js
```

### Frontend

```
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `.env` in backend:

```
AI_PROVIDER=rule
PORT=5000
GEMINI_API_KEY=optional
```

## API Endpoint

POST `/api/analyze-file`

## Demo Flow

1. Upload log file
2. System analyzes logs
3. Sensitive data detected
4. Risk score calculated
5. AI insights generated

## Evaluation Criteria Covered

* Backend design
* AI integration
* Log analysis
* Detection engine
* Risk classification
* Frontend visualization
* Bonus highlighted logs

## Author

Arjun Indavara
