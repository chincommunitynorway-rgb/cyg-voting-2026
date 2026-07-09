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
    <section className="mt-8 rounded-2xl bg-zinc-900 p-4 sm:mt-12 sm:rounded-3xl sm:p-6 lg:mt-16 lg:p-8">
      <h2 className="mb-5 text-2xl font-black text-white sm:mb-6 sm:text-3xl">
        👤 Your Information
      </h2>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3 text-sm text-white outline-none sm:rounded-xl sm:p-4 sm:text-base"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3 text-sm text-white outline-none sm:rounded-xl sm:p-4 sm:text-base"
        />

        <input
          type="tel"
          placeholder="Norwegian Phone Number"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="rounded-lg bg-zinc-800 p-3 text-sm text-white outline-none sm:rounded-xl sm:p-4 sm:text-base"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
        <button
          type="button"
          onClick={onSendCode}
          disabled={sendingCode}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto sm:rounded-xl sm:px-6 sm:py-4 sm:text-base"
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
              className="w-full rounded-lg bg-zinc-800 p-3 text-sm text-white outline-none sm:w-auto sm:rounded-xl sm:p-4 sm:text-base"
            />

            <button
              type="button"
              onClick={onVerify}
              className={`w-full rounded-lg px-4 py-3 text-sm font-bold text-white transition sm:w-auto sm:rounded-xl sm:px-6 sm:py-4 sm:text-base ${
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