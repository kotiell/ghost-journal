export default async function Journal() {

  const ghosts = await fetch(`${process.env.BASE_PATH}/api/database-connect`)
    .then((response) => response.json())
  //console.log('ghosts', ghosts);
  return (
    <div>
      Ghost Journal
    </div>
  )

}