import EducationIllustration from './EducationIllustration';
import PotiguarRibbon from './PotiguarRibbon';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="ip-auth">
      <div className="ip-auth__top-ribbon" aria-hidden="true">
        <PotiguarRibbon />
      </div>
      <div className="ip-auth__container">
        <div className="ip-auth__grid">
          <aside className="ip-brand">
            <div className="ip-brand__logo">
              <div className="ip-brand__mark">IP</div>
              <div>
                <strong>Instituto Potiguar</strong>
                <span>Juntos pela Educacao.</span>
              </div>
            </div>

            <EducationIllustration />

            <ul className="ip-brand__bullets">
              <li>
                <span className="ip-dot ip-dot--blue" />
                Ambiente seguro e confiavel.
              </li>
              <li>
                <span className="ip-dot ip-dot--green" />
                Acesso aos modulos por setor e permissoes.
              </li>
              <li>
                <span className="ip-dot ip-dot--red" />
                Suporte sempre ao seu lado.
              </li>
            </ul>

            <div className="ip-brand__footer">Instituto Potiguar • Social e Educacional</div>
          </aside>

          <div className="ip-auth__card">{children}</div>
        </div>
      </div>
    </div>
  );
}
