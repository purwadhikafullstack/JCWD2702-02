import FooterDekstop from "./desktop";
import FooterMobile from "./mobile";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("/admin")) return null;

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
