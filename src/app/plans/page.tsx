import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ReactNode } from "react";

type Plan = {
  name: string;
  price: string;
  features: ReactNode[];
  planned?: boolean;
};

export default async function Page() {
  const pricing: Plan[] = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Free use of community features",
        "Automated Farming",
        "Hands-free Gaming",
      ],
    },
    {
      planned: true,
      name: "Pro",
      price: "$/month",
      features: [
        "Improved Fighting Strategies",
        "Advanced Farming",
        "Everything in Starter",
      ],
    },
    {
      planned: true,
      name: "Unlimited",
      price: "$$/month",
      features: ["Up to XX Clients", "Priority support", "Everything in Pro"],
    },
  ];

  return (
    <div className="flex flex-col space-y-6 text-center">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Choose your bot plan
        </h1>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {pricing.map((plan) => (
          <PlanWrapper key={plan.name} plan={plan}>
            <Card className="flex h-full w-full flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc text-left">
                    {plan.features
                      .filter((feature) => feature !== null)
                      .map((feature) => (
                        <li
                          className="w-full overflow-hidden"
                          key={feature?.toString()}
                        >
                          {feature}
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </div>
              <CardFooter>
                {plan.price === "Free" ? (
                  <Button
                    className="w-full"
                    data-umami-event="Pricing - Get Started"
                    asChild
                  >
                    <Link href={"/"}>
                      Get started
                      <svg
                        className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    disabled
                    style={{ pointerEvents: "none" }}
                    data-umami-event={`Pricing - ${plan.name} - Buy Now`}
                    className="w-full"
                    variant="secondary"
                  >
                    Subscribe
                  </Button>
                )}
              </CardFooter>
            </Card>
          </PlanWrapper>
        ))}
      </div>
    </div>
  );
}

function PlanWrapper({
  plan,
  children,
}: Readonly<{ plan: Plan; children: ReactNode }>) {
  if (!plan.planned) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="select-none blur-sm" aria-hidden asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent sideOffset={8} align="center">
          Coming soon
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
