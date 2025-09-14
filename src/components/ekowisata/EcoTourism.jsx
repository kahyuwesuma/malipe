'use client'

import EcoContacts from "./EcoContacts";
import EcoFacility from "./EcoFacility";
import EcoTimeline from "./EcoTimeline";
import EcoRules from "./EcoRules";
import Hero from "./Hero";

export default function EkowisataBalembangan() {
  return (
    <div className="min-h-screen max-w-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Hero/>
        <EcoTimeline/>
        <EcoRules/>
        <EcoFacility />
        <EcoContacts />
      </div>
    </div>
  )
}
