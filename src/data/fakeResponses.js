const fakeResponses = [
  {
    keywords: ["email", "customer", "support"],
    response: `Subject: Apology for Delivery Delay

Dear Sarah,

We sincerely apologize for the delay in delivering your order. We understand how important timely delivery is and appreciate your patience.

As a token of our apology, we are prioritizing your shipment and will keep you updated.

Thank you for your understanding.

Best Regards,
Customer Support Team`,

    tokens: 328,
    latency: "1.2 sec",
    cost: "$0.004",
  },

  {
    keywords: ["summarize", "summary"],

    response:
      "This article discusses the importance of prompt optimization, reducing unnecessary context, and improving response quality while lowering token costs.",

    tokens: 145,
    latency: "0.8 sec",
    cost: "$0.002",
  },

  {
    keywords: ["python", "code"],

    response: `def greet(name):
    return f"Hello {name}"

print(greet("PromptPilot"))`,

    tokens: 472,
    latency: "2.0 sec",
    cost: "$0.009",
  },

  {
    keywords: ["sql", "database"],

    response: `SELECT *
FROM customers
WHERE city='Bangalore';`,

    tokens: 211,
    latency: "1.4 sec",
    cost: "$0.003",
  },
];

export default fakeResponses;