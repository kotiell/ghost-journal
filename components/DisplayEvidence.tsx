"use client";
import Toggle from "@/components/Toggle"

export default function DisplayEvidence({ theEvidenceJSON }) {
  const theEvidence = JSON.parse(theEvidenceJSON)
  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {
        theEvidence.map((evidence, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <Toggle name={evidence.name} />
                <div className="ml-2 font-bold">{evidence.name} </div>
              </div>
              {/* <details className="ml-4 cursor-pointer"><summary>Description</summary>{evidence.description}</details> */}
            </div>
          )
        })
      }
    </div>
  )
}