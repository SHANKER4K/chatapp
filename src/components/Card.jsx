"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
export function Card({ id, name, message, image }) {
  return (
    <ul className="space-y-2 p-4">
      <li className={`rounded-xl cursor-pointer `}>
        <Link href={`/chat/${id}`}>
          <div className="flex gap-5 items-center p-2 scroll-smooth h-24">
            <div className="w-20 h-16 rounded-full overflow-hidden">
              <img
                className="w-full h-full rounded-full object-cover"
                src={image}
                alt=""
              />
            </div>
            <div className="flex justify-center h-full w-full flex-col">
              <p>{name}</p>
              <p></p>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
}
