import { ReactNode } from "react";

type TrustNoticeProps = {
  children: ReactNode;
};

export default function TrustNotice({ children }: TrustNoticeProps) {
  return (
    <section className="mt-4 rounded-lg border border-blue-100 bg-[#F6F2EA] px-4 py-3 text-xs text-gray-700">
      {children}
    </section>
  );
}

