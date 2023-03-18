"use client";
import { useState, useEffect } from "react";

interface IEvidence {
  name: string;
}

interface IGhost {
  name: string;
  evidence: Array<IEvidence>;
}

interface IJournalContentProps {
  ghosts: Array<IGhost>;
  evidence: Array<IEvidence>;
}

export default function JournalContent({ ghosts, evidence }: IJournalContentProps) {
  ghosts = JSON.parse(ghosts);
  evidence = JSON.parse(evidence);

  const [foundEvidence, setFoundEvidence] = useState<Array<string>>([]);
  const [matchingGhosts, setMatchingGhosts] = useState<Array<IGhost>>([]);

  useEffect(() => {
    const newMatchingGhosts = ghosts.filter((ghost: IGhost) => {
      return foundEvidence.every((evidence) => {
        return ghost.evidence.find((e) => e.name === evidence);
      });
    });
    setMatchingGhosts(newMatchingGhosts);
  }, [foundEvidence, ghosts]);

  const handleEvidenceFound = (evidenceName: string) => {
    const updatedFoundEvidence = [...foundEvidence, evidenceName];
    setFoundEvidence(updatedFoundEvidence);
  };

  const handleEvidenceNotFound = (evidenceName: string) => {
    const updatedFoundEvidence = foundEvidence.filter((e) => e !== evidenceName);
    setFoundEvidence(updatedFoundEvidence);
  };

  const isGhostMatch = (ghost: IGhost) => {
    return foundEvidence.every((evidence) => {
      return ghost.evidence.find((e) => e.name === evidence);
    });
  };

  const ghostCardClassName = (ghost: IGhost) => {
    return isGhostMatch(ghost) ? "bg-gray-800" : " bg-black";
  };

  const sectionTitleClassName = "text-3xl font-bold mb-4";
  const ghostCardClassNameDefault = "rounded-md p-4 shadow-md";

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8 mt-12">GhostGetter Journal</h1>
      {ghosts && <h2 className={sectionTitleClassName}>Ghosts</h2>}
      {ghosts && (
        <div className="grid grid-cols-3 gap-4 mb-12">
          {ghosts.map((ghost, index: number) => {
            return (
              <div key={index} className={`${ghostCardClassName(ghost)} p-4 rounded `}>
                <h3 className="font-bold">{ghost.name}</h3>
                {ghost.evidence &&
                  ghost.evidence.map((evidence: IEvidence, index: number) => {
                    return (
                      <div className="ml-4" key={index}>
                        {evidence.name}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      )}
      {evidence && (
        <div className="grid grid-cols-3 gap-4 mb-12">
          {evidence.map((evidence, index) => {
            const evidenceFound = foundEvidence.includes(evidence.name);
            const evidenceClassName = evidenceFound ? "text-green-500 font-bold" : "";
            const ghostsWithEvidence = ghosts.filter((ghost) => {
              return ghost.evidence.find((e) => e.name === evidence.name);
            });
            const ghostNamesWithEvidence = ghostsWithEvidence.map((ghost) => ghost.name);

            return (
              <div key={index}>
                <div className="flex">
                  <button
                    onClick={() =>
                      setFoundEvidence(
                        evidenceFound
                          ? foundEvidence.filter((e) => e !== evidence.name)
                          : [...foundEvidence, evidence.name]
                      )
                    }
                    className={evidenceFound ? "bg-green-500" : ""}
                  >
                    {evidenceFound ? "Found" : "Not found"}
                  </button>
                  <div className={`ml-2 ${evidenceClassName}`}>{evidence.name} </div>
                </div>
                <div className="ml-4">
                  {ghostsWithEvidence.length > 0 && (
                    <span>
                      Found with:{" "}
                      {ghostNamesWithEvidence.map((name, i) => (
                        <span key={i} className="text-green-500 font-bold">
                          {name}
                          {i < ghostNamesWithEvidence.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}