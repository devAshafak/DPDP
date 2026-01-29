import { ReactNode } from "react";

type TrustBoxProps = {
  children: ReactNode;
};

export default function TrustBox({ children }: TrustBoxProps) {
  return (
    <section className="mt-4 rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs text-gray-700">
      {children}
    </section>
  );
}

