import { metaCopy } from "@/config/meta-copy";
import {
  getCreatorsProgramFaqAnswer,
  getFreePlanFaqAnswer,
  getPlansOfferedFaqAnswer,
} from "@/config/pricing.config";
import type { PricingRegion } from "@/lib/pricing-region";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

export type MarketingFaqOverrides = {
  freePlanFaqAnswer?: string;
  plansOfferedFaqAnswer?: string;
  creatorsProgramFaqAnswer?: string;
};

function plansCategory(region: PricingRegion, overrides?: MarketingFaqOverrides): FaqCategory {
  return {
    id: "plans",
    label: "Plans & billing",
    items: [
      {
        id: "starter-free",
        question: "Is the Free plan really free?",
        answer: overrides?.freePlanFaqAnswer ?? getFreePlanFaqAnswer(region),
      },
      {
        id: "plans-offered",
        question: "What plans does Liffio offer?",
        answer: overrides?.plansOfferedFaqAnswer ?? getPlansOfferedFaqAnswer(region),
      },
      {
        id: "billing-cycle",
        question: "Can I pay monthly or annually?",
        answer:
          "Yes. All paid plans are available on monthly or annual billing. Annual billing saves 20%. Payments are handled via Stripe (global) or Razorpay (India).",
      },
      {
        id: "dm-limit",
        question: "Are automated DMs unlimited?",
        answer:
          "Yes. Every plan includes unlimited automated DMs — there is no monthly cap on how many messages you can send.",
      },
      {
        id: "cancel",
        question: "How do I cancel my subscription?",
        answer:
          "Cancel anytime from account settings. There are no cancellation fees — your plan stays active until the end of the current billing period.",
      },
      {
        id: "creators-program",
        question: "Do you offer a Creators Program?",
        answer: overrides?.creatorsProgramFaqAnswer ?? getCreatorsProgramFaqAnswer(region),
      },
    ],
  };
}

/** Region-aware FAQ used across the marketing site */
export function getFaqCategories(region: PricingRegion, overrides?: MarketingFaqOverrides): FaqCategory[] {
  return [
    {
      id: "getting-started",
      label: "Getting started",
      items: [
        {
          id: "connect-instagram",
          question: "How do I connect my Instagram account?",
          answer: metaCopy.helpConnectAnswer,
        },
        {
          id: "setup-time",
          question: "How long does setup take?",
          answer:
            "Most creators connect Instagram and send their first automated DM in under five minutes. Pick a trigger, write your message, set your delay (10–60 seconds), and go live. No credit card required.",
        },
        {
          id: "keyword-triggers",
          question: "What are keyword triggers?",
          answer:
            'Keyword triggers are words or phrases in a comment that start an automation. If someone comments "LINK" on your post, Liffio can send them your link in DMs after your configured delay.',
        },
      ],
    },
    {
      id: "automations",
      label: "Automations & DMs",
      items: [
        {
          id: "dm-speed",
          question: "How quickly are automated DMs sent?",
          answer:
            "DMs send after your chosen delay — from 10 to 60 seconds after the trigger (comment, story reply, etc.). You control the timing for more human-like replies while staying on autopilot.",
        },
        {
          id: "what-counts-dm",
          question: "What counts as one automated DM?",
          answer:
            "Each automated message sent to a unique user counts as one DM. Replies within the same conversation thread do not count as additional DMs.",
        },
        {
          id: "automation-types",
          question: "What can Liffio automate?",
          answer:
            "Comment-to-DM, story mentions and reactions, live stream comments, welcome DMs for new followers, multi-step flows, follow-up sequences, and more — depending on your plan.",
        },
      ],
    },
    plansCategory(region, overrides),
    {
      id: "safety",
      label: "Safety & compliance",
      items: [
        {
          id: "safe",
          question: "Is Liffio safe for my Instagram account?",
          answer: metaCopy.helpSafeAnswer,
        },
        {
          id: "multiple-accounts",
          question: "Can I manage multiple Instagram accounts?",
          answer:
            "Yes. All plans include unlimited Instagram accounts. Agency adds white-label workspaces for managing client brands at scale.",
        },
      ],
    },
  ];
}

const affiliateCategory: FaqCategory = {
  id: "affiliate",
  label: "Affiliate program",
  items: [
    {
      id: "affiliate-commission",
      question: "How much can I earn as an affiliate?",
      answer:
        "You earn 25% commission in month one, then 10% in months two and three for each referred workspace, within a 90-day attribution window. Payouts are available on demand from $50.",
    },
    {
      id: "affiliate-plans",
      question: "Which plans earn commission?",
      answer:
        "Commissions apply to paid Starter, Business, and Agency subscriptions. Free signups and Creators Program access do not generate commission.",
    },
  ],
};

export function getAffiliateFaqCategories(region: PricingRegion): FaqCategory[] {
  return [...getFaqCategories(region), affiliateCategory];
}

/** @deprecated Use getFaqCategories(region) */
export const homeFaqCategories = getFaqCategories("global");

/** Flat list for legacy use */
export function getAllFaqs(region: PricingRegion): FaqItem[] {
  return getFaqCategories(region).flatMap((c) => c.items);
}
