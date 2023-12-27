export async function GET() {
    const {default: data} = await import(`../../../data/sets/sets.json`, {
      assert: {
        type: "json",
      }
    })
   
    return Response.json({ data })
  }