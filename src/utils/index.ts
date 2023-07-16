export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error: any) {
    console.error(error.message);
  }
}
