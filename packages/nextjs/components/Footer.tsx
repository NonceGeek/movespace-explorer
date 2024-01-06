import { HeartIcon } from "@heroicons/react/24/outline";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 px-1 py-5 mb-11 lg:mb-0">
      <div className="w-full">
        <ul className="w-full menu menu-horizontal">
          <div className="flex items-center justify-center w-full gap-2 text-sm">
            <div className="text-center">
              <a href="https://github.com/NonceGeek/bodhi-searcher" target="_blank" rel="noreferrer" className="link">
                ✰ Star me
              </a>
            </div>
            <div className="text-center">
              <a
                href="https://github.com/NonceGeek/bodhi-searcher/issues"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                🤔 Any Suggestions
              </a>
            </div>
            <span>·</span>
            <div className="flex items-center justify-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block w-4 h-4" /> at
              </p>
              <a
                className="flex items-center justify-center gap-1"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BuidlGuidlLogo className="w-3 h-5 pb-1" />
                <span className="link">BuidlGuidl</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
                Support
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
