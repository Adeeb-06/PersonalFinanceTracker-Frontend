import React from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300 ease-out">
        <Wallet
          className="w-5 h-5 text-primary transform group-hover:scale-110 transition-transform duration-300"
          strokeWidth={2.5}
        />
      </div>
      <span className="text-2xl font-bold tracking-tight text-primary transition-colors duration-300">
        TrackIt
      </span>
    </Link>
  );
};

export default Logo;
