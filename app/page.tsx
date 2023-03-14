import { getEvidence } from "./api/get-evidence/route";
import { getGhosts } from "./api/get-ghosts/route";
import DisplayGhosts from "@/components/DisplayGhosts";
import DisplayEvidence from "@/components/DisplayEvidence";
import {ContextWrapper} from "@/components/ContextWrapper";

export default async function Journal() {



  const sectionTitle = `text-3xl font-bold`;
  const ghostsWithEvidence = await getGhosts();
  const evidenceWithGhosts = await getEvidence();
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold">Ghost Journal</h1>
      <ContextWrapper>
        {ghostsWithEvidence && (<h2 className={sectionTitle}>Ghosts</h2>)}
        {ghostsWithEvidence && (
          <DisplayGhosts theGhostsJSON={JSON.stringify(ghostsWithEvidence)} />
        )}
        {evidenceWithGhosts && (<h2 className={sectionTitle}>Evidence</h2>)}
        {evidenceWithGhosts && (
          <DisplayEvidence theEvidenceJSON={JSON.stringify(evidenceWithGhosts)} />
        )}
      </ContextWrapper>
    </div>
  )

}