import Link from 'next/link'
import sets from '../../data/sets/sets.json'

export default function Page() {

  const modifiedSets = sets.map(set => ({id: set.id, name: set.name, image: set.images.symbol, date: set.releaseDate}))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <h1 className="font-bold text-3xl mb-8">Sets</h1>

      <section
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {modifiedSets.map(set =>
          <div
            key={set.id}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: '100%'
            }}
          >
            <button
              className="hover:bg-gray-300"
              style={{
                width: "100%",
                padding: "16px",
            }}
            >
              <Link
                href={`/sets/${set.id}`}
              >
              <h2 style={{textAlign: "center"}}>{`${set.name} ${set.date}`}</h2>
              <img src={set.image} style={{height: "60px"}}/>
            </Link>
            </button>
          </div>)}
        <div>
        </div>
      </section>
    </main>
  )
}
