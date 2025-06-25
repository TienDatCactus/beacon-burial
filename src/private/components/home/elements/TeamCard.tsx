"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
const TeamCard: React.FC<{
  member: {
    name: string;
    role: string;
    image: string;
    social: { [key: string]: string | undefined };
  };
  index: number;
}> = (props) => {
  const { member, index } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className=" h-full w-full cursor-pointer space-y-4 group"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-auto object-cover"
      />
      <div>
        <h3 className="text-2xl font-semibold">{member.name}</h3>
        <p className="text-base text-gray-600">{member.role}</p>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mt-2 group-hover:opacity-100 opacity-0 transition-all flex space-x-2"
        >
          {Object.entries(member.social).map(([platform, url]) => (
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              key={platform}
            >
              {platform == "facebook" && url ? (
                <Facebook />
              ) : platform == "linkedin" && url ? (
                <Linkedin />
              ) : platform == "twitter" && url ? (
                <Twitter />
              ) : platform == "instagram" && url ? (
                <Instagram />
              ) : null}
            </Button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
