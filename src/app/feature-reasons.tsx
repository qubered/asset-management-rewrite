import { Check, Database, Drama, Users } from "lucide-react";

export default function FeatureReasons() {
    return [
        {
            title: "Theatre Focused",
            description: "A true Theatre focused asset management system. Flexible enough to meet the needs of any level of Theatre. Rigid enough to ensure ease of use.",
            icon: <Drama />
        },
        {
            title: "Modern",
            description: "Built to match the modern day needs of you and your team. Built to be easy to use and navigate.",
            icon: <Check />
        },
        {
            title: "Your final Database",
            description: "Built to be your final database. No more switching between systems to manage your assets and projects.",
            icon: <Database />
        },
        {
            title: "Multi-Business Support",
            description: "Built to support multiple businesses. One Account, Multiple Businesses.",
            icon: <Users />
        }
    ]
}