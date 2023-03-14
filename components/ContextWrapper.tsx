"use client";
import { createContext, useContext, useState } from "react";

const EvidenceContext = createContext([]);

export function ContextWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [evidence, setEvidence] = useState([]);
  return (
    <EvidenceContext.Provider value={[evidence, setEvidence]}>
      {children}
    </EvidenceContext.Provider>
  );
}

export function useEvidenceState() {
  const [evidence, setEvidence] = useContext(EvidenceContext);
  return [evidence, setEvidence];
}