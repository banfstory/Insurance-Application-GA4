# Car Insurance Web Application with GA4 & GTM Tracking

A fully interactive car insurance quoting and purchase web application built with **React**, integrated with **Google Tag Manager (GTM)** and **Google Analytics 4 (GA4)** to track the complete user conversion funnel.

---

## Features

* **End-to-End User Journey:** Tracks the complete funnel from quote start $\rightarrow$ quote completion $\rightarrow$ purchase start $\rightarrow$ purchase completion.
* **Comprehensive Analytics Tracking:** Implements GTM data layer events and GA4 tracking for page views and element interactions:
  * Radio buttons & Checkboxes
  * Form inputs & Text fields
  * Dropdown selections
  * CTA and navigation buttons
* **Modern Tech Stack:** Built with React and Vite for fast development and bundling.

---

## Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

Make sure you have Node.js and npm installed on your system.
* Node.js (v16+ recommended)
* npm

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Google Tag Manager:**
   Ensure your GTM container ID is correctly added to your `index.html` or environment configuration files so tracking events fire properly during local testing.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open your browser and navigate to the local URL provided in your terminal (typically `http://localhost:5173`).

---

## Tracking Funnel & Events

The application pushes custom events to the GTM Data Layer (`window.dataLayer`) across key milestones:

| Funnel Stage | Event Name / Trigger | Tracked Interactions |
| :--- | :--- | :--- |
| **Quote Initiation** | `quote_start` | Landing on the insurance quote flow |
| **User Inputs** | `form_interaction` | Radio buttons, checkboxes, dropdowns, text inputs |
| **Quote Completion** | `quote_complete` | Reaching the final quote summary page |
| **Purchase Initiation** | `purchase_start` | Clicking through to the checkout/payment step |
| **Purchase Completion** | `purchase_complete` | Successful policy purchase confirmation |

---

## Built With

* **React** - Frontend UI library
* **Vite** - Build tool and development server
* **Google Tag Manager (GTM)** - Tag management and event routing
* **Google Analytics 4 (GA4)** - Funnel analysis and user behavior tracking