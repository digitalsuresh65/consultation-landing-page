import Image from "next/image";
export default function Header() {
  return (
    <header className="flex justify-center px-5 pb-3 pt-7 sm:pt-9">
      <div className="px-4 py-3">
        <Image
          src="/logo.png"
          alt="A&A Fashion Boutique"
          width={346}
          height={84}
          priority
          className="h-auto w-56 sm:w-64"
          sizes="256px"
        />
      </div>
    </header>
  );
}
