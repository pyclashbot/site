import logo from "@/assets/pixel-pycb.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MarkdownHeader = ({
  children,
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return (
    <div className="py-2">
      <Link className="flex flex-row items-center space-x-2" href="/">
        <Image src={logo} alt="logo" width={50} height={50} />
        <h1 className="text-4xl font-black tracking-wide text-primary">
          {children}
        </h1>
      </Link>
    </div>
  );
};

export default MarkdownHeader;
