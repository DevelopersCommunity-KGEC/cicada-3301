import CicadaLogo from "@/app/_global_components/cicada";
import Image from "next/image";

function WinnerScreen({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="flex flex-col items-center w-full font-mono text-[2rem] gap-36">
        <div className="flex flex-col items-center w-full">
          <span>
            Congratulations, <span className="">{searchParams?.team}</span>!
          </span>
          <span>You have beaten Cicada 3301.</span>
          <span>We hope you enjoyed the challenge {":-)"}</span>
        </div>
        <CicadaLogo className="" />

        <div className="flex items-center gap-1">
          <Image
            src="/gdsc_logo.png"
            alt="GDSC KGEC Logo"
            width="50"
            height="50"
          />
          <span className="text-base">Presented by GDSC KGEC</span>
        </div>
      </div>
    </>
  );
}

export default WinnerScreen;
