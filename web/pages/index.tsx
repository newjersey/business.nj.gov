import Link from "next/link";
import React, { ReactElement, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./_app";
import { Hero } from "@/components/njwds/Hero";
import { PageSkeleton } from "@/components/PageSkeleton";
import { AuthButton } from "@/components/AuthButton";
import { SinglePageLayout } from "@/components/njwds-extended/SinglePageLayout";
import { useUserData } from "@/lib/data-hooks/useUserData";
import { IsAuthenticated } from "@/lib/auth/AuthContext";

const Home = (): ReactElement => {
  const { state } = useContext(AuthContext);
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (userData?.formProgress === "COMPLETED") {
      router.replace("/roadmap");
    }
  }, [userData]);

  return (
    <PageSkeleton>
      <Hero
        calloutText="Welcome to the new"
        subCalloutText="Business.NJ.gov"
        supportingText="Your first stop for doing business in the state"
        callToActionText="Try the Startup Guide"
        onClick={() => {}}
      />
      <SinglePageLayout>
        <h1>
          {state.isAuthenticated === IsAuthenticated.TRUE
            ? `Welcome, ${state.user?.name || state.user?.email}`
            : "Welcome to EasyRegNJ"}
        </h1>
        <p>The simplest way to license, form & register your business in the State of New Jersey.</p>
        <p>
          This tool is for prospective business owners who are ready to officially form and register their
          business with state and local officials.
        </p>
        <p>
          If you are still in the ideation phase, please visit our Guidance page on how to plan a new
          business.
        </p>
        <p>To start, you’ll need to create an account.</p>
        <p>Creating an account helps you easily track the progress of your business.</p>
        {state.isAuthenticated == IsAuthenticated.TRUE && (
          <Link href="/onboarding">
            <button className="usa-button" data-get-started={true}>
              Get Started
            </button>
          </Link>
        )}
        <AuthButton />
      </SinglePageLayout>
    </PageSkeleton>
  );
};

export default Home;
