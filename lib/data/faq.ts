/**
 * FAQ data for NECYPAA XXXVI.
 *
 * Grouped by category. Content is informational, not promotional (Tradition 11).
 * No full names, no superlatives, no endorsements.
 */

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  name: string
  items: FAQItem[]
}

export const faqData: FAQCategory[] = [
  {
    name: "About NECYPAA",
    items: [
      {
        question: "What is NECYPAA?",
        answer:
          "NECYPAA stands for the Northeast Convention of Young People in Alcoholics Anonymous. It's a four-day gathering of young people in AA from across the Northeast region. The convention features speakers, workshops, meetings, dances, and fellowship.",
      },
      {
        question: "Do I have to be young to attend?",
        answer:
          'No. "Young people" is a state of mind. NECYPAA is open to anyone — all ages, all backgrounds. If you\'re in AA (or curious about it), you\'re welcome.',
      },
      {
        question: "Is NECYPAA affiliated with Alcoholics Anonymous?",
        answer:
          "NECYPAA is organized by AA members in the spirit of AA's Traditions, but it is not an official arm of AA World Services. It's a convention planned and run by local AA members through group conscience.",
      },
      {
        question: "What states are part of NECYPAA?",
        answer:
          "The NECYPAA region includes Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont, New York, New Jersey, Pennsylvania, Maryland, Delaware, and Washington, D.C.",
      },
    ],
  },
  {
    name: "The Convention",
    items: [
      {
        question: "When and where is NECYPAA XXXVI?",
        answer:
          "December 31, 2026 through January 3, 2027 at the Hartford Marriott Downtown in Hartford, Connecticut.",
      },
      {
        question: "What happens at the convention?",
        answer:
          "The convention includes AA speaker meetings, workshops, panel discussions, a New Year's Eve celebration, dances, fellowship events, and more. The full program will be posted as we get closer to the event.",
      },
      {
        question: "Is this a sober event?",
        answer:
          "Yes. NECYPAA is a sober event. There is no alcohol or drug use permitted at convention events.",
      },
    ],
  },
  {
    name: "Registration",
    items: [
      {
        question: "How much does registration cost?",
        answer:
          "Pre-registration is $40. This covers access to all convention events. Breakfast tickets are available separately for $20 each.",
      },
      {
        question: "Can I register someone else or buy a scholarship registration?",
        answer:
          "Yes. During registration you can purchase scholarship registrations for others who may not be able to afford it. This is a wonderful way to carry the message.",
      },
      {
        question: "What if I can't afford to register?",
        answer:
          "We have a free/cash registration option. No one will be turned away for lack of funds. Visit the registration page and select the free registration option.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Please reach out to us at info@necypaa.org if you need to discuss your registration.",
      },
    ],
  },
  {
    name: "Hotel & Travel",
    items: [
      {
        question: "Where should I stay?",
        answer:
          "The host hotel is the Hartford Marriott Downtown. We have a special room block with a discounted rate for NECYPAA attendees. Book through the link on our site to get the convention rate.",
      },
      {
        question: "Do I have to stay at the host hotel?",
        answer:
          "No, but we encourage it. Staying at the host hotel keeps you close to all convention events and supports the convention financially (per Tradition 7, we are self-supporting).",
      },
      {
        question: "Is there parking at the hotel?",
        answer:
          "The Hartford Marriott Downtown offers parking. Check with the hotel directly for current rates and availability.",
      },
    ],
  },
  {
    name: "Accessibility",
    items: [
      {
        question: "Is the convention accessible?",
        answer:
          "We are committed to making NECYPAA XXXVI accessible for everyone. The Hartford Marriott Downtown is ADA-compliant. If you have specific accessibility needs, please note them during registration or reach out to us directly.",
      },
      {
        question: "Will there be ASL interpretation?",
        answer:
          "We are working on ASL interpretation for key convention events. More details will be announced as they are confirmed.",
      },
      {
        question: "Will the site be available in Spanish?",
        answer:
          "Yes. We are building a full Spanish-language version of the site. We are looking for a human translator familiar with AA's Spanish-language terminology.",
      },
    ],
  },
  {
    name: "Getting Involved",
    items: [
      {
        question: "How can I help with the convention?",
        answer:
          "There are many ways to serve — from committee positions to volunteering during the event. Check the Get Involved page (coming soon) or email us at info@necypaa.org.",
      },
      {
        question: "How do I start a bid for a future NECYPAA?",
        answer:
          "Visit our Bid page for information about the bidding process, requirements, and timeline. If your state or city wants to host a future NECYPAA, that's where to start.",
      },
    ],
  },
]
