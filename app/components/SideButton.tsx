"use client";
import {
  ArrowUpRight,
  ChevronRight,
  FolderGit,
  Laptop,
  NotebookPen,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../lib/util";
import { AnimatePresence, easeInOut, easeOut, motion } from "motion/react";
import ArrowOnHover from "./ArrowOnHover";
import GlassUser from "./icons/glass/GlassUser";
import GlassFeather from "./icons/glass/GlassFeather";
import GlassFolder from "./icons/glass/GlassFolder";
type AvailableButtons = "About" | "Blogs" | "Projects";
export function SideButton() {
  const router = useRouter();
  const path = usePathname();
  const [currentPage, setCurrentPage] = useState<AvailableButtons>(
    pathToName(path)
  );
  const sideButtonInfo: AvailableButtons[] = ["About", "Projects", "Blogs"];
  function pathToName(path: string): AvailableButtons {
    if (path === "/") {
      return "About";
    } else if (path === "/projects") {
      return "Projects";
    } else {
      return "Blogs";
    }
  }

  const handleClick = (button: AvailableButtons) => {
    let href;
    if (button === "About") {
      href = "/";
    } else {
      href = button.toLowerCase();
    }
    setCurrentPage(button);
    router.push(href);
  };

  // Memoize hover variants to prevent recalculation on every render

  const pathVariants = {
    active: {},
    inactive: {},
  };
  const hoverVariants = {
    active: {
      x: [0, 9, 13],
      opacity: [0, 0.6, 1],
      transition: {
        duration: 0.4,
        ease: [easeOut, easeOut, easeOut],
        times: [0, 0.2, 1],
      },
    },
    inactive: {
      x: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: easeInOut },
    },
  };

  return (
    <div className="hidden md:absolute md:flex flex-col gap-5 right-0 top-20 translate-x-full">
      {sideButtonInfo.map((btn) => {
        const isActive = currentPage === btn;
        // const isHovered = currentHover === btn;

        return (
          <motion.div
            variants={pathVariants}
            whileHover={"active"}
            animate={"inactive"}
            initial={"inactive"}
            key={btn}
            className={cn(
              "w-fit bg-neutral-900/80 relative  transition-all duration-200 ease-in-out  overflow-hidden backdrop-blur-3xl flex gap-2 cursor-pointer items-center tracking-tight border-neutral-800 border rounded-sm rounded-l-none text-neutral-50 px-3 py-2",
              isActive &&
                "bg-neutral-700/40 border border-neutral-700 border-l-0",
              !isActive && "hover:pr-8"
            )}
            // transition={{ duration: 0.3, ease: "easeInOut" }}

            onClick={() => handleClick(btn)}
          >
            {isActive && (
              <motion.div
                layout
                layoutId="sidebutton-active"
                className="absolute opacity-70 left-0 -translate-x-1/2 w-[6px] h-6 bg-linear-to-b from-neutral-300 to-neutral-500 rounded-sm"
              />
            )}

            <motion.p>{btn}</motion.p>

            <motion.div className="relative w-5 h-5 flex items-center justify-center z-10">
              {btn === "About" ? (
                <GlassUser />
              ) : btn === "Blogs" ? (
                <GlassFeather />
              ) : (
                <GlassFolder />
              )}
            </motion.div>
            {!isActive && (
              <motion.div
                variants={hoverVariants}
                className="absolute right-5   text-neutral-500"
                // transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ChevronRight />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
