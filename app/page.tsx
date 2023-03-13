import { getEvidence } from "./api/get-evidence/route";
import { getGhosts } from "./api/get-ghosts/route";

export default async function Journal() {

  const sectionTitle = `text-3xl font-bold`;
  const ghostsWithEvidence = await getGhosts();
  const evidenceWithGhosts = await getEvidence();
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold">Ghost Journal</h1>

      {ghostsWithEvidence && (<h2 className={sectionTitle}>Ghosts</h2>)}
      {ghostsWithEvidence && (
        ghostsWithEvidence.map((ghost, index: number) => {
          return (
            <div key={index}>
              <h3 className="font-bold">{ghost.name}</h3>
              {ghost?.evidence && (
                ghost.evidence.map((evidence, index) => {
                  return (
                    <div className="ml-4" key={index}>
                      {evidence.name}
                    </div>
                  )
                })
              )}
            </div>
          )
        })
      )
      }

      {evidenceWithGhosts && (<h2 className={sectionTitle}>Evidence</h2>)}
      {evidenceWithGhosts && (
        evidenceWithGhosts.map((evidence, index) => {
          return (
            <div key={index}>
              <div className="font-bold">{evidence.name} </div>
              <details className="ml-4"><summary>Evidence</summary>{evidence.description}</details>
            </div>
          )
        })
      )}


    </div>
  )

}