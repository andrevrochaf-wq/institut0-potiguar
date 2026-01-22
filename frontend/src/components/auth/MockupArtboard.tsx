type MockupArtboardProps = {
  backgroundSrc: string;
  children: React.ReactNode;
};

export default function MockupArtboard({ backgroundSrc, children }: MockupArtboardProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const resolvedSrc = `${basePath}${backgroundSrc}`;

  return (
    <div className="ip-auth-page">
      <div
        className="ip-auth-artboard"
        style={{ backgroundImage: `url(${resolvedSrc})` }}
      >
        <div className="ip-auth-overlay">{children}</div>
      </div>
    </div>
  );
}
