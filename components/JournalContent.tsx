"use client";
import { useState, useEffect } from "react";

interface IEvidence {
  name: string;
  id: string;
}

interface IGhost {
  id: string;
  name: string;
  evidence: Array<IEvidence>;
  must_have_id?: string;
  updatedAt: string;
  description: string;
}
interface ITests {
  id: number;
  name: string;
  description: string;
  ghost: Array<IGhost>;
  ghostId: string;
}

interface IJournalContentProps {
  ghosts: Array<IGhost>;
  evidence: Array<IEvidence>;
  tests: Array<ITests>
}

export default function JournalContent({ ghosts, evidence, tests }: IJournalContentProps) {
  ghosts = JSON.parse(ghosts);
  evidence = JSON.parse(evidence);
  tests = JSON.parse(tests);



  const [foundEvidence, setFoundEvidence] = useState<Array<string>>([]);
  const [matchingGhosts, setMatchingGhosts] = useState<Array<IGhost>>([]);
  const [relevantTests, setRelevantTests] = useState<Array<ITests>>([]);




  const evidenceButton = function () {
    console.log('evidenceButton');
    findRelevantTests()
  }

  const findRelevantTests = function () {
    console.log('findRelevantTests')
    //tests = all possible tests
    // need to get a list of possibleTests based on tests and matchingGhosts
    // setRelevantTests
    const relevantTestsTemp = [];
  }





  useEffect(() => {
    /*
    Here we are using the .filter() method to create a new array of ghosts that match a certain criteria. In this case, we want to filter the ghosts that have all the evidence that we found. We start by defining a function that will be used to filter the ghosts:
    */
    const newMatchingGhosts = ghosts.filter((ghost: IGhost) => {
      /*
      Here we are using the .every() method to make sure that every piece of evidence we found matches with a piece of evidence in the ghost's evidence array. We start by defining a function that will be used to check if each piece of evidence matches:
      */
      return foundEvidence.every((evidence) => {
        /*
        Here we are using the .find() method to look for a specific piece of evidence in the ghost's evidence array. We are checking if the name of the evidence matches the name of the evidence we found. If there is a match, .find() will return the evidence object, which will be truthy and satisfy the .every() method. If there is no match, .find() will return undefined, which will be falsy and cause the .every() method to return false.
        */
        return ghost.evidence.find((e) => e.name === evidence);
      });
    });

    // Only update the state variable if it has changed
    if (JSON.stringify(newMatchingGhosts) !== JSON.stringify(matchingGhosts)) {
      const currentTests: ITests[] = [];
      newMatchingGhosts.forEach((ghost) => {
        tests.forEach((test) => {
          if (test.ghostId.includes(ghost.id)) {
            currentTests.push(test);
          }
        })
      })


      setRelevantTests(currentTests);
      setMatchingGhosts(newMatchingGhosts);
    }




    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundEvidence]);


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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
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
                  onClick={() => {
                    evidenceButton()
                    setFoundEvidence(
                      evidenceFound
                        ? foundEvidence.filter((e) => e !== evidence.name)
                        : [...foundEvidence, evidence.name]
                    )
                    const tests = relevantTests;
                  }}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
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
      {relevantTests.length > 0 && (
        <div>
          <h2 className={sectionTitleClassName}>Tests</h2>
          {relevantTests.map((test, index) => {
            return (
              <div key={index} className="bg-slate-900 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4">{test.name}</h3>
                <p className="text-lg mb-4">{test.description}</p>
                <div className="text-lg font-bold">Ghost(s):</div>
                <ul className="list-disc list-inside mb-4">
                  {/* {test.ghost.map((ghost, index) => {
                    return (
                      <li key={index}>{ghost.name}</li>
                    );
                  })} */}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}