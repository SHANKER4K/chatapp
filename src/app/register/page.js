"use client";
import React, { useId, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Eye, EyeOff, X } from "lucide-react";
import usePasswordCheck from "./passwordCheck";
import { register } from "@/api/auth/register";
function Register() {
  const email = useId();
  const username = useId();
  const id = useId();
  const conf = useId();
  const {
    password,
    setPassword,
    isVisible,
    toggleVisibility,
    strength,
    strengthScore,
    getStrengthColor,
    getStrengthText,
  } = usePasswordCheck();

  const signUpHandler = async () => {
    // Get form values
    const emailValue = document.getElementById(email).value;
    const usernameValue = document.getElementById(username).value;
    const confPassword = document.getElementById(conf).value;

    // Check if passwords match
    if (password !== confPassword) {
      alert("Password and confirm password are not the same");
      return;
    }

    // Send POST request
    register({
      email: emailValue,
      username: usernameValue,
      password: password,
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="h-5/6 min-w-96 bg-neutral-950">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id={email}
                placeholder="Email"
                className="placeholder:text-gray-500"
              />
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Username</Label>
              <Input
                type="username"
                id={username}
                placeholder="Username"
                className="placeholder:text-gray-500"
              />
            </div>
          </CardContent>
          <CardContent>
            <div>
              {/* Password input field with toggle visibility button */}
              <div className="space-y-2">
                <Label htmlFor={id}>Password</Label>
                <div className="relative ">
                  <Input
                    id={id}
                    className="pe-9 placeholder:text-gray-500"
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={strengthScore < 4}
                    aria-describedby={`${id}-description`}
                  />
                  <button
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Eye size={16} strokeWidth={2} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password strength indicator */}
              <div
                className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
              >
                <div
                  className={`h-full ${getStrengthColor(
                    strengthScore
                  )} transition-all duration-500 ease-out`}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
              </div>

              {/* Password strength description */}
              <p
                id={`${id}-description`}
                className="mb-2 text-sm font-medium text-foreground"
              >
                {getStrengthText(strengthScore)}. Must contain:
              </p>

              {/* Password requirements list */}
              <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <Check
                        size={16}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        size={16}
                        className="text-muted-foreground/80"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`text-xs ${
                        req.met ? "text-emerald-600" : "text-muted-foreground"
                      }`}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requirement met"
                          : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor={id}>Confirm Password</Label>
              <div className="relative">
                <Input
                  id={conf}
                  className="pe-9"
                  placeholder="Confirm password"
                  type={isVisible ? "text" : "password"}
                />
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 grid-rows-2">
            <Button onClick={signUpHandler} variant="outline">
              Register
            </Button>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Register;
