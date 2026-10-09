import Image from "next/image";
export default function Header() {
  return (
    <header className="flex justify-center px-5 pb-3 pt-7 sm:pt-9">
      <div className="rounded-2xl bg-maroon px-5 py-3 shadow-lg shadow-maroon/10">
        <Image
          src="/logo.png"
          alt="A&A Fashion Boutique"
          width={753}
          height={327}
          priority
          className="h-auto w-36 sm:w-40"
          sizes="160px"
        />
      </div>
    </header>
  );
}
