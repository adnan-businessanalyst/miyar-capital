import { Link } from "wouter";
import logoNavDark from "../assets/brand/logo-nav-dark.svg";
import logoNavLight from "../assets/brand/logo-nav-light.svg";
import logoFooter from "../assets/brand/logo-footer.svg";

interface BrandProps {
  variant?: "light" | "dark";
  transparent?: boolean;
}

export function Brand({ variant = "light", transparent = false }: BrandProps) {
  let logo: string;
  if (variant === "dark") {
    logo = logoFooter;
  } else if (transparent) {
    logo = logoNavLight;
  } else {
    logo = logoNavDark;
  }

  return (
    <Link href="/" className="brand brand--logo">
      <img className="brand-logo" src={logo} alt="Miyar Capital" />
    </Link>
  );
}
