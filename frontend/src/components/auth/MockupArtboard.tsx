type MockupArtboardProps = {
  backgroundSrc: string;
  children: React.ReactNode;
};

export default function MockupArtboard({ backgroundSrc, children }: MockupArtboardProps) {
  return (
    <div className="ip-auth-page">
      <div
        className="ip-auth-artboard"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      >
        <div className="ip-auth-overlay">{children}</div>
      </div>
    </div>
  );
}
