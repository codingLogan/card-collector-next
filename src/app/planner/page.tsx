'use client'

import Link from 'next/link'
import sets from '../../data/sets/sets.json'
import { createPlan, getPlans } from '../saver'
import { useEffect, useState } from 'react'

export default function Page() {

  const [plans, setPlans] = useState<any[]>([])
  const [nameInput, setNameInput] = useState("")
  const [sortInput, setSortInput] = useState("number")
  const [setsInput, setSetsInput] = useState<string[]>([])

  const modifiedSets = sets.map(set => ({id: set.id, name: set.name, image: set.images.symbol, date: set.releaseDate}))

  useEffect(() => {
    const plans = getPlans()
    setPlans(plans)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="font-bold text-3xl mb-8">Storage Planning</h1>

      <form onSubmit={event => {
        event.preventDefault()

        // Handle any form validation
        // Handle saving the plan
        createPlan(nameInput, {sets: setsInput, sort: [sortInput]})
        setPlans(getPlans())
      }}>
        <input
          type='text'
          name="plan-name"
          style={{width:'100%'}}
          onChange={(e) => {
            setNameInput(e.target.value)
          }}
        /><br/><br/>

        {/* Instead of multiple select... use chips */}
        <select
          multiple={true}
          name="sets"
          id="sets"
          style={{width:'100%'}}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions).map(option => option.value)
            setSetsInput(values)
          }}
        >
          {modifiedSets.map(set => (
            <option key={set.id} value={set.id}>{set.name}</option>
          ))}
        </select><br/>

        <select
          name="sort"
          id="sort"
          style={{width:'100%'}}
          onChange={(e) => {
            setSortInput(e.target.value)
          }}
        >
          <option value="number">(Default) Set Number</option>
          <option value="nationalPokedexNumbers">Pokedex</option>
          <option value="supertype">Card Type</option>
          <option value="types">ENERGY Type</option>
        </select><br/>

        <button
          className="bg-black text-white p-2 rounded"
          type="submit"
          style={{display: 'block'}}
        >
          Create new plan
        </button>

      </form>

      <section
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {plans.map(plan =>
          <div
            key={plan.id}
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
                href={`/planner/${plan.id}`}
              >
              <h2 style={{textAlign: "center"}}>{`${plan.name}`}</h2>
              <img src={plan.image} style={{height: "60px"}}/>
            </Link>
            </button>
          </div>)}
        <div>
        </div>
      </section>
    </main>
  )
}
