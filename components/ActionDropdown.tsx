"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";

const ActionDropdown = ({ file }: { file: Models.Document }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

  const renderDialogContent = () => {
    return (
      <DialogContent>
        Dialog
      </DialogContent>
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
            className=""
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate"></DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map(({ value, icon, label }) => (
            <DropdownMenuItem
              key={value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction({ value, icon, label });

                if (["rename", "share", "delete", "details"].includes(value)) {
                  setIsModalOpen(true);
                }
              }}
            >
              {value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image src={icon} alt={label} width={30} height={30} />
                  {label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image src={icon} alt={label} width={30} height={30} />
                  {label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default ActionDropdown;
