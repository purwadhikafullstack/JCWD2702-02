import FooterDekstop from "./desktop";
import FooterMobile from "./mobile";

export default function Footer() {
  return (
    <div>
      <div className="xl:hidden 2xl:hidden">
        <FooterMobile />
      </div>
      <div className="mobile:hidden sm:hidden xl:block">
        <FooterDekstop />
      </div>
    </div>
  );
}
