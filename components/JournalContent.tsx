"use client";
import { useState, useEffect } from "react";

interface IEvidence {
  name: string;
  id: string;
}

interface IGhost {
  name: string;
  evidence: Array<IEvidence>;
  must_have_id?: string;
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

    // Only update the state variable if it has changed
    if (JSON.stringify(newMatchingGhosts) !== JSON.stringify(matchingGhosts)) {
      setMatchingGhosts(newMatchingGhosts);
    }
  }, [foundEvidence, ghosts, matchingGhosts]);


  const isGhostMatch = (ghost: IGhost) => {
    if (ghost.must_have_id) {
      const requiredEvidence = evidence.find((e) => e.id === ghost.must_have_id);
      if (!requiredEvidence || !foundEvidence.includes(requiredEvidence.name)) {
        return false;
      }
    }
    return foundEvidence.every((evidence) => {
      return ghost.evidence.find((e) => e.name === evidence);
    });
  };
  const getEvidenceById = function (id) {
    return evidence.find(evidence => evidence.id === id);
  }

  const ghostCardClassName = (ghost: IGhost) => {
    // if (ghost.must_have_id) {
    //   const requiredEvidence = evidence.find((e) => e.id === ghost.must_have_id);
    //   if (!requiredEvidence || !foundEvidence.includes(requiredEvidence.name)) {
    //     return ""; // add a CSS class to highlight the ghost as requiring evidence
    //   }
    // }
    return isGhostMatch(ghost) ? "bg-gray-800" : "bg-black";
  };

  const sectionTitleClassName = "text-3xl font-bold mb-4";

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8 mt-12">GhostGetter Journal</h1>
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
              <div key={index} className="flex flex-col justify-between">
                <div className={`text-xl font-bold ml-2 ${evidenceClassName}`}>{evidence.name} </div>
                <div className="ml-2">
                  {ghostsWithEvidence.length > 0 && (
                    <span>
                      Found with:{" "}
                      <br />
                      {ghostNamesWithEvidence.map((name, i) => (
                        <span key={i} className="text-green-500 font-bold">
                          {name}
                          {i < ghostNamesWithEvidence.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    setFoundEvidence(
                      evidenceFound
                        ? foundEvidence.filter((e) => e !== evidence.name)
                        : [...foundEvidence, evidence.name]
                    )
                  }
                  className={`h-12 w-full rounded px-4 py-2 ${evidenceFound ? "bg-green-700 text-white" : "bg-yellow-300 text-black "}`}
                >
                  {evidenceFound ? "Found" : "Not found"}
                </button>
              </div>
            );
          })}
        </div>
      )}
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
                {ghost.must_have_id && (
                  <div className="ml-4 text-sm font-bold text-red-500">
                    Requires: {getEvidenceById(ghost.must_have_id)?.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  )
}