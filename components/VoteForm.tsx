"use client";

import { useState } from "react";

type Props = {
  type: "miss" | "mr";
  candidateId: number;
  candidateName: string;
};

export default function VoteForm({
  type,
  candidateId,
  candidateName,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,
        category: type,
        candidate_id: candidateId,
        candidate_name: candidateName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
      setLoading(false);
      return;
    }

    setMessage("✅ Vote submitted successfully!");

    setFullName("");
    setEmail("");
    setPhone("");

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-white mb-2">
          Full Name
        </label>

        <input
          required
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          className="w-full p-4 rounded-lg bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block text-white mb-2">
          Email
        </label>

        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@email.com"
          className="w-full p-4 rounded-lg bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block text-white mb-2">
          Mobile Number
        </label>

        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+47 99999999"
          className="w-full p-4 rounded-lg bg-zinc-800 text-white"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition"
      >
        {loading ? "Submitting..." : "Submit Vote"}
      </button>

      {message && (
        <p className="text-center text-white mt-4">
          {message}
        </p>
      )}
    </form>
  );
}