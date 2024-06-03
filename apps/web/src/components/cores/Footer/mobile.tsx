import { MdMessage, MdMail, MdLocalPhone } from "react-icons/md";

export default function FooterMobile() {
  return (
    <div className="bg-ebony text-white">
      <details className="collapse-arrow collapse rounded-none">
        <summary className="collapse-title flex w-screen text-xl font-medium">
          Useful Links
        </summary>
        <div className="collapse-content flex flex-col">
          <a
            href=""
            className="text-bouquet hover:text-eggplant hover:underline"
          >
            Home
          </a>
          <a
            href=""
            className="text-bouquet hover:text-eggplant hover:underline"
          >
            About Us
          </a>
          <a
            href=""
            className="text-bouquet hover:text-eggplant hover:underline"
          >
            Products
          </a>
          <a
            href=""
            className="text-bouquet hover:text-eggplant hover:underline"
          >
            Service
          </a>
          <a
            href=""
            className="text-bouquet hover:text-eggplant hover:underline"
          >
            Legal
          </a>
          <a
            href=""
            className="text-bouquet hover:text-eggplant hover:underline"
          >
            Contact Us
          </a>
        </div>
      </details>
      <details className="collapse-arrow collapse rounded-none">
        <summary className="collapse-title flex w-screen text-xl font-medium">
          About Us
        </summary>
        <div className="collapse-content">
          <p>
            We are a team of passionate people whose goal is to improve
            everyone's life through disruptive products. We build great products
            to solve your business problems.
          </p>
          <p>
            Our products are designed for small to medium size companies willing
            to optimize their performance.
          </p>
        </div>
      </details>
      <details className="collapse-arrow collapse rounded-none">
        <summary className="collapse-title flex w-screen text-xl font-medium">
          Connect With Us
        </summary>
        <div className="collapse-content flex flex-col gap-2">
          <a href="" className="flex items-center gap-2">
            <MdMessage size={18} />
            <p className="text-bouquet hover:text-eggplant hover:underline">
              Contact Us
            </p>
          </a>
          <a href="" className="flex items-center gap-2">
            <MdMail size={18} />
            <p className="text-bouquet hover:text-eggplant hover:underline">
              info@yourcompany.example.com
            </p>
          </a>
          <a href="" className="flex items-center gap-2">
            <MdLocalPhone size={18} />
            <p className="text-bouquet hover:text-eggplant hover:underline">
              +1 (650) 555-0111
            </p>
          </a>
        </div>
      </details>
      <div className="bg-second_ebony text-bombay flex h-fit w-full items-center justify-center py-3">
        Copyright © Burnog
      </div>
    </div>
  );
}
