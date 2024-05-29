// src/utils/apihelpers.ts
export async function jsonResponse(
  response: object = {},
  status: number = 200,
) {
  return new Response(
    JSON.stringify({
      response,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status,
    },
  );
}
