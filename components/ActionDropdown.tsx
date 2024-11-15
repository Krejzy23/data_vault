"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { renameFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(file.name);

  const path = usePathname();
  
  //kdyz zrusime modal akci
  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    //   setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),

    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center">{label}</DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </DialogHeader>
        {['rename','delete','share'].includes(value) &&(
            <DialogFooter className="flex -flex-col gap-3 md:flex-row">
              <Button onClick={closeAllModals} className="modal-cancel-button">
                Cancel
              </Button>
              <Button onClick={handleAction} className="modal-submit-button">
                <p className="capitalize">
                  {value}
                </p>
                {isLoading && (
                  <Image src="/assets/icons/loader.svg" alt={"loader"} width={24} height={24} className="animate-spin"/>
                )}
              </Button>
            </DialogFooter>
        )}
      </DialogContent>
    );
  };

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
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
