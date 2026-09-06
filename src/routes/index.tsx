import { createFileRoute } from "@tanstack/react-router";
import { SmartRepApp } from "@/components/smartrep-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartRep — Real-Time Gym Tracking" },
      { name: "description", content: "Interactive SmartRep prototype for Bluetooth rep tracking, range-of-motion feedback, and gym equipment reservation." },
      { property: "og:title", content: "SmartRep — Real-Time Gym Tracking" },
      { property: "og:description", content: "A high-fidelity mobile prototype for smarter, measurable gym sessions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SmartRepApp />;
}
