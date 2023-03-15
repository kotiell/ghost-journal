"use client";
import { useState } from "react";
import DisplayGhosts from "@/components/DisplayGhosts";
import DisplayEvidence from "@/components/DisplayEvidence";
import { EvidenceContext } from "./EvidenceContext";

export default function JournalContent({ ghosts, evidence }) {
  const sectionTitle = `text-3xl font-bold mb-4`;

  const [foundEvidence, setFoundEvidence] = useState(
    ['D.O.T.S Projector', 'Ghost Writing']
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8 mt-12">GhostGetter Journal</h1>
      <EvidenceContext.Provider value={{ foundEvidence, setFoundEvidence }}>
        {ghosts && (<h2 className={sectionTitle}>Ghosts</h2>)}
        {ghosts && (
          <DisplayGhosts theGhostsJSON={JSON.stringify(ghosts)} />
        )}
        {evidence && (<h2 className={sectionTitle}>Evidence</h2>)}
        {evidence && (
          <DisplayEvidence theEvidenceJSON={JSON.stringify(evidence)} />
        )}
      </EvidenceContext.Provider>
    </div>
  )
}