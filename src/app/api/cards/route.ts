export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const setId = searchParams.get('setId')
    const {default: data} = await import(`../../../data/cards/${setId}.json`, {
      assert: {
        type: "json",
      }
    })
   
    return Response.json({ data })
  }