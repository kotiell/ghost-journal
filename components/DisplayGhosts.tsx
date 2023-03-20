"use client";
import { useContext } from "react";
import {EvidenceContext} from "./JournalContent"

export default function DisplayGhosts({ theGhostsJSON }) {
  const msg = useContext(EvidenceContext.foundEvidence)
  console.log('msg', msg)

  interface IEvidence {
    name: string;
  }
  interface IGhost {
    name: string;
    evidence: Array<IEvidence>
  }

  const theGhosts: Array<IGhost> = JSON.parse(theGhostsJSON)

  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {
        theGhosts.map((ghost, index: number) => {
          return (
            <div key={index}>
              <div>
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