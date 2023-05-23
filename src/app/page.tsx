import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <Link href={"/characters/1"} className='bg-blue-500 p-4 rounded'>Vamo a la demo</Link>
    </main>
  )
}
