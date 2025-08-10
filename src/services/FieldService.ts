import type { PayloadData } from "../types";

export async function submitForm(data: PayloadData) {
  const response = await fetch("http://localhost:3001/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("result", result);
}
