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
            <div key={index}>{ghost.name}</div>
          )
        })
      }
    </div>
  )

}