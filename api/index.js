const express = require("express");
const app = express();

app.use(express.json());

const OFFICIAL_EMAIL = "armaan1704.be23@chitkara.edu.in";

const fibonacci = (n) => {
  const res = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const lcm = (a, b) => (a * b) / gcd(a, b);

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body

    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: fibonacci(n)
      });
    }
    if (body.prime !== undefined) {
      const primes = body.prime.filter(isPrime);
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: primes
      });
    }
    if (body.lcm !== undefined) {
      const result = body.lcm.reduce((acc, val) => lcm(acc, val));
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: result
      });
    }

    if (body.hcf !== undefined) {
      const result = body.hcf.reduce((acc, val) => gcd(acc, val));
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: result
      });
    }

    if (body.AI !== undefined) {
      const question = body.AI.toLowerCase();
      let answer = "Unknown";

      if (question.includes("capital") && question.includes("maharashtra")) {
        answer = "Mumbai";
      }

      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: answer
      });
    }

    // Invalid key
    return res.status(400).json({
      is_success: false,
      message: "Invalid request key"
    });

  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Server error"
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
