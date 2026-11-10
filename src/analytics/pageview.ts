// 1. Hold the persistent journey state in memory
let globalJourneyState: Record<string, any> = {};

/**
 * Updates or adds to the persistent global journey state.
 * Call this whenever journey data changes (e.g., user selections, milestones).
 */
export function updateGlobalJourneyState(newData: Record<string, any> | null) {
    if (newData) {
        globalJourneyState = {
            ...globalJourneyState,
            ...newData
        };
    }
}

/**
 * Fires the pageview event, combining the global journey state 
 * with the current page's specific data under a single `data` object.
 */
export default function pageView(pageData?: Record<string, any> | null) {
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