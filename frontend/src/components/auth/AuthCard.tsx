import PotiguarRibbon from './PotiguarRibbon';

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="ip-card">
      <div className="ip-card__ribbon">
        <PotiguarRibbon />
      </div>
      <div className="ip-card__body">
        <div className="ip-card__heading">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {children}
      </div>
      {footer ? <div className="ip-card__footer">{footer}</div> : null}
    </div>
  );
}
