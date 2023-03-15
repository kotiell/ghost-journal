
import { getEvidence } from "./api/get-evidence/route";
import { getGhosts } from "./api/get-ghosts/route";
import JournalContent from "@/components/JournalContent";

export default async function Journal() {

  const ghostsWithEvidence = await getGhosts();
  const evidenceWithGhosts = await getEvidence();


  return (
    <div className="container mx-auto">
      <JournalContent ghosts={ghostsWithEvidence} evidence={evidenceWithGhosts} />
    </div>
  )

}