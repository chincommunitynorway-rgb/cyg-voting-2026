"use client";

type Props = {
  fullName: string;
  email: string;
  phone: string;

  verificationCode: string;

  verified: boolean;
  sendingCode: boolean;
  codeSent: boolean;

  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;

  onCodeChange: (value: string) => void;

  onSendCode: () => void;
  onVerify: () => void;
};

export default function VerificationForm({
  fullName,
  email,
  phone,

  verificationCode,

  verified,
  sendingCode,
  codeSent,

  onFullNameChange,
  onEmailChange,
  onPhoneChange,

  onCodeChange,

  onSendCode,
  onVerify,
}: Props) {
  return (
    <section className="mt-16 rounded-3xl bg-zinc-900 p-8">
      <h2 className="mb-8 text-3xl font-black text-white">
        👤 Your Information
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
        />

        <input
          type="tel"
          placeholder="Norwegian Phone Number"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onSendCode}
          disabled={sendingCode}
          className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {sendingCode ? "Sending..." : "✉️ Send Verification Code"}
        </button>

        {codeSent && (
          <>
            <input
              type="text"
              placeholder="6-digit verification code"
              value={verificationCode}
              onChange={(e) => onCodeChange(e.target.value)}
              className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
            />

            <button
              type="button"
              onClick={onVerify}
              className={`rounded-xl px-6 py-4 font-bold text-white ${
                verified
                  ? "bg-green-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {verified ? "✅ Verified" : "Verify"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}