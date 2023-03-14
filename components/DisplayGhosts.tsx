"use client";
export default function DisplayGhosts({ theGhostsJSON }) {
  const theGhosts = JSON.parse(theGhostsJSON)
  return (
    <div>
      {
        theGhosts.map((ghost, index: number) => {
          return (
            <div key={index}>
              <h3 className="font-bold">{ghost.name}</h3>
              {ghost?.evidence && (
                ghost.evidence.map((evidence, index: number) => {
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
      }
    </div>
  )
}