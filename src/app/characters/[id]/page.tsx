import Image from "next/image"
import Link from "next/link"

async function getCharacterById(id: string) {
  const res = await fetch(`https://api.sampleapis.com/futurama/characters/${id}`)

  if (!res.ok) {
    throw new Error(`Error fetching character ${id}`)
  }

  return res.json()
}

interface CharacterPageParams {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const res = await fetch('https://api.sampleapis.com/futurama/characters')

  if (!res.ok) {
    throw new Error(`Error fetching characters`)
  }

  const characters: Array<{}> = await res.json()

  return characters.map((character: any, index) => {
    return {
      id: `${index + 1}`,
    }
  })
}

export default async function CharacterPage({params: {id}}: CharacterPageParams) {
  const {name, images} = await getCharacterById(id)

  return <div>
    <h1>{name.first}</h1>
    <Image src={images.main} alt={name.first} width={120} height={120}/>
    <div className="flex gap-2">
    {Number(id) > 1 && <Link href={`characters/${Number(id)-1}`}>Prev</Link>}
    <Link href={`characters/${Number(id)+1}`}>Next</Link>
    </div>
  </div>

}