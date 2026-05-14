export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="motion-safe:animate-[pageEnter_0.45s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
      {children}
    </div>
  );
}
