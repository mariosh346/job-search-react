# Next.js Job Listing Platform - SEO & Performance Optimized

This project demonstrates a job listing index page built with Next.js (App Router), focusing on best practices for Search Engine Optimization (SEO), internationalization (i18n) with `next-intl`, and robust structured data implementation.

## Features

*   **Dynamic Job Listings:** Fetches and displays jobs from an API.
*   **Search & Filtering:** Supports searching jobs by query, location, category, etc. (as per URL parameters).
*   **Internationalization (i18n):** Localized content using `next-intl`, with locale-specific URLs (e.g., `/en`, `/el`).
*   **Advanced SEO:**
    *   Dynamic `<title>` and `<meta name="description">` based on search queries and locale.
    *   Correct `canonical` URL generation, including query parameters.
    *   `hreflang` tags for alternate language versions of each page, preserving search context.
    *   Open Graph meta tags for social media sharing.
    *   Configurable `robots` meta tags.
*   **Structured Data:**
    *   `JobPosting` schema.org markup for each job listing to enhance search engine understanding and enable rich results.
    *   `WebPage` schema.org markup for the listing page itself.
*   **Material-UI Integration:** Leverages Material-UI for UI components with proper SSR setup.
*   **Context API:** Uses React Context (`JobsProvider`) for managing job data.

## Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/mariosh346/job-search-react
    cd job-search-react
    ```

2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the Development Server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or your default locale path like [http://localhost:3000/en](http://localhost:3000/en)) in your browser.

4.  **Build for Production:**
    ```bash
    pnpm build
    ```

7.  **Start Production Server:**
    ```bash
    pnpm start
    ```

## Technical Approach and Decisions

### 1. Next.js App Router

*   **Decision:** Utilized the Next.js App Router for its improved data fetching patterns, server components, and built-in metadata API.
*   **Reasoning:** The `generateMetadata` function provides a clean and powerful way to dynamically generate SEO tags server-side, co-located with the page component. Server Components allow fetching data directly within components, simplifying data flow for SSR.

### 2. Internationalization (`next-intl`)

*   **Decision:** Integrated `next-intl` for handling translations and locale-based routing.
*   **Reasoning:** `next-intl` offers robust server-side support for translations (via `getTranslations`) which is essential for SEO, ensuring that localized content is available in the initial HTML. It also handles locale-prefixed routing seamlessly.

### 3. SEO Meta Tag Generation (`generateMetadata`)

*   **Dynamic Title & Description:** Titles and descriptions adapt to the current language and search query (if present) to provide highly relevant information to search engines and users.
*   **Canonical URLs:** The `canonical` URL is dynamically generated to include the current locale and all active search parameters (e.g., `q`, `location`, `category`). This is crucial for signaling the preferred version of a page when multiple URL variations can display similar content.
*   **Social Media Tags:** Twitter Card tags are included to control how content previews appear on social platforms.

### 4. Structured Data (JSON-LD via Schema.org)

*   **Decision:** Implemented `JobPosting` and `WebPage` schema.org types using JSON-LD.
*   **Reasoning:** Structured data helps search engines understand the content and context of the page more deeply.
    *   **`JobPosting`:** Each job listed on the page has its own `JobPosting` schema, detailing its title, description, hiring organization, location, post date, etc. This makes job listings eligible for rich results in Google Search (e.g., Google for Jobs).
    *   **`WebPage`:** A general schema for the page itself is included.
    *   **Implementation:** JSON-LD objects are constructed server-side and injected directly into the page's HTML within `<script type="application/ld+json">` tags. This ensures crawlers can access it immediately.

### 5. Material-UI with SSR

*   **Decision:** Used Material-UI for UI components.
*   **Reasoning:** For nice ready components.

### 6. Data Fetching and State Management

*   **`fetchJobs` API Call:** Job data is fetched server-side within the `IndexPage` Server Component.
*   **`JobsProvider` (React Context):** The fetched job data is passed down to client components (like `IndexPageContent`) via React Context for easier state management without prop drilling.

### 7. Performance Considerations

*   **Server-Side Rendering (SSR):** Generating HTML on the server (including metadata and initial job data) improves perceived load time and is essential for SEO.
*   **Next steps:**  optimized image handling (`next/image`), and font optimization (`next/font`) would be part of a full application's performance strategy.
*   **Minimal Client-Side JavaScript for Initial View:** The core content and SEO tags are server-rendered. Client-side JavaScript is primarily for interactivity and subsequent data fetching/filtering.

## Lighthouse Report / Score Explanation

After building and starting, Lighthouse was run with the following results:

*   **Performance:** 100
*   **Accessibility:** 100
*   **Best Practices:** 100
*   **SEO:** 100

You can find the results on lighthouse folder
