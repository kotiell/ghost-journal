import { getGhosts } from "./api/database-connect/route";

export default async function Journal() {

  const ghostsWithEvidence = await getGhosts();
  console.log('ghosts', ghostsWithEvidence)
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold">Ghost Journal</h1>
      <h2 className="text-3xl font-bold">Ghosts</h2>
      {
        ghostsWithEvidence.map((ghost, index: number) => {
          return (
            <div key={index}>
              <h3 className="font-bold">{ghost.name}</h3>
              {ghost.evidence.map((evidence, index) => {
                return (
                  <div className="ml-4" key={index}>
                    {evidence.name}
                  </div>
                )
              })}
            </div>
          )
        })
      }
    </div>
  )

}