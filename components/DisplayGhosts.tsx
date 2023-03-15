"use client";
import { useContext, useEffect } from "react";
import { EvidenceContext } from "./EvidenceContext";

export default function DisplayGhosts({ theGhostsJSON }) {
  const msg = useContext(EvidenceContext)

  interface IEvidence {
    name: string;
  }
  interface IGhost {
    name: string;
    evidence: Array<IEvidence>
  }

  const { foundEvidence, setFoundEvidence } = useContext(EvidenceContext);
  const theGhosts: Array<IGhost> = JSON.parse(theGhostsJSON)


  const addEvidence = (evinceType) => {
    setFoundEvidence(foundEvidence => [...foundEvidence, evinceType]);
  }

  useEffect(() => {
    console.log('found evidence', foundEvidence)
  }, [foundEvidence])

  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {
        theGhosts.map((ghost, index: number) => {
          return (
            <div key={index}>
              <div>
                <button onClick={() => addEvidence('test')}>Click me</button>
                <h3 className="font-bold">{ghost.name}</h3>
                {ghost?.evidence && (
                  ghost.evidence.map((evidence: IEvidence, index: number) => {
                    return (
                      <div className="ml-4" key={index}>
                        {evidence.name}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}