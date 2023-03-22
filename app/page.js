import GhostData from "./api/ghost-data/data.json";

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-5xl font-bold">Ghost Getter</h1>
      <h3 class="text-xl italic mb-8">Get them ghosts</h3>
      <div class="grid grid-cols-3 gap-8">
        
        {GhostData.map((ghost, index) => {
          return (
            <div key="index">
              <h2 className="text-3xl">{ghost.Ghost}</h2>
              <details className="cursor-pointer">
                <summary>Tests, unique identifiers, or anti-tells</summary>
                <p>{ghost["Tests, unique identifiers, or anti-tells"]}</p>
              </details>
              <details className="cursor-pointer">
                <summary>Other possible identifiers</summary>
                <p>{ghost["Other possible identifiers"]}</p>
              </details>
            </div>
          )
        })}
      </div>
    </div>
  )
}