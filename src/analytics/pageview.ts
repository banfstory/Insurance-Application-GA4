// 1. Hold the persistent journey state in memory
let globalJourneyState: Record<string, unknown> = {};

/**
 * Updates or adds to the persistent global journey state.
 * Call this whenever journey data changes (e.g., user selections, milestones).
 */
export function updateGlobalJourneyState(newData: Record<string, unknown> | null) {
    if (newData) {
        globalJourneyState = {
            ...globalJourneyState,
            ...newData
        };
    }
}

export function resetGlobalJourneyState() {
    globalJourneyState = {};
}

/**
 * Fires the pageview event, combining the global journey state 
 * with the current page's specific data under a single `data` object.
 */
export default function pageView(pageData?: Record<string, unknown> | null) {
    window.dataLayer.push({
        event: 'pageview',
        pageName: (window as any).__pageId,
        data: {
            // Include all accumulated global state
            ...globalJourneyState,
            // Include page-specific data for this view only
            ...(pageData || {})
        }
    });
}