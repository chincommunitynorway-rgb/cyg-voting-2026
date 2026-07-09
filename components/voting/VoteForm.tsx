"use client";

import { useState } from "react";

import CandidateSelector from "./CandidateSelector";
import VerificationForm from "./VerificationForm";
import VoteSummary from "./VoteSummary";
import VoteSuccess from "./VoteSuccess";

import { missCandidates, mrCandidates } from "@/data/candidates";

export default function VoteForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedMiss, setSelectedMiss] = useState<number | null>(null);
  const [selectedMr, setSelectedMr] = useState<number | null>(null);

  const [verificationCode, setVerificationCode] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [sendingCode, setSendingCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [reference, setReference] = useState("");

  async function sendCode() {
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone.");
      return;
    }

    if (!selectedMiss || !selectedMr) {
      alert("Please choose one Miss and one Mr.");
      return;
    }

    setSendingCode(true);

    const response = await fetch("/api/send-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phone,
      }),
    });

    const data = await response.json();

    setSendingCode(false);

    if (!response.ok) {
      alert(data.error);
      return;
    }

    setCodeSent(true);

    alert("Verification code sent!");
  }

  async function verifyCode() {
    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code: verificationCode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    setVerified(true);

    alert("Email verified!");
  }

  async function submitVote() {
    if (!verified) {
      alert("Please verify your email first.");
      return;
    }

    if (!selectedMiss || !selectedMr) {
      alert("Please choose one Miss and one Mr.");
      return;
    }

    setLoading(true);

    const missCandidate = missCandidates.find(
      (c) => c.id === selectedMiss
    );

    const mrCandidate = mrCandidates.find(
      (c) => c.id === selectedMr
    );

    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,

        miss_candidate_id: selectedMiss,
        miss_candidate_name: missCandidate?.name,

        mr_candidate_id: selectedMr,
        mr_candidate_name: mrCandidate?.name,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      alert(data.error);
      return;
    }

    setReference(data.reference);

    setSuccess(true);
  }

  if (success && selectedMiss && selectedMr) {
    return (
      <VoteSuccess
        selectedMiss={selectedMiss}
        selectedMr={selectedMr}
        reference={reference}
        onDone={() => {
          window.location.href = "/";
        }}
      />
    );
  }

  return (
  <main className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-20">

    <h1 className="mb-8 md:mb-12 text-center text-3xl md:text-5xl font-black text-white leading-tight">
      ❤️ Cast Your Vote
    </h1>

    <CandidateSelector
      selectedMiss={selectedMiss}
      selectedMr={selectedMr}
      setSelectedMiss={setSelectedMiss}
      setSelectedMr={setSelectedMr}
    />

    <div className="mt-8 md:mt-14">

      <VerificationForm
        fullName={fullName}
        email={email}
        phone={phone}
        verificationCode={verificationCode}
        verified={verified}
        sendingCode={sendingCode}
        codeSent={codeSent}
        onFullNameChange={setFullName}
        onEmailChange={setEmail}
        onPhoneChange={setPhone}
        onCodeChange={setVerificationCode}
        onSendCode={sendCode}
        onVerify={verifyCode}
      />

    </div>

    <div className="mt-8 md:mt-14">

      <VoteSummary
        selectedMiss={selectedMiss}
        selectedMr={selectedMr}
        loading={loading}
        verified={verified}
        onSubmit={submitVote}
      />

    </div>

  </main>
);
}