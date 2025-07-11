"use client";
import ExtraProducts1Section from "@/private/components/home/extra-products-1-home";
import HeroSection from "@/private/components/home/hero-home";
import InfoSection from "@/private/components/home/info-home";
import PopularProductSection from "@/private/components/home/popular-products";
import PricingSection from "@/private/components/home/pricing-home";
import ServiceSection from "@/private/components/home/services-home";
import TeamSection from "@/private/components/home/team-home";
import React from "react";

const page: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <InfoSection />
      <TeamSection />
      <PricingSection />
      <ExtraProducts1Section />
      <PopularProductSection />
    </>
  );
};

export default page;
