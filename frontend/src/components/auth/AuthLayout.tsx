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
              <div className="ip-brand__mark" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <path
                    d="M8 38c10-12 26-18 48-18v12c-16 0-28 4-36 12z"
                    fill="#1E4DB7"
                  />
                  <path
                    d="M8 44c10-8 26-12 48-12v10c-16 0-28 2-36 8z"
                    fill="#1FA66A"
                  />
                  <path
                    d="M8 48c10-5 26-7 48-7v9c-16 0-28 1-36 5z"
                    fill="#D83A3A"
                  />
                </svg>
              </div>
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
                Acesse seus cursos e conteudos.
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
