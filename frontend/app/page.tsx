'use client'
import { SubmitEvent } from "react";
import Form  from "./components/form";


export default function Home() {

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  }

  return (
      <main className="bg-dark1 text-light3 pt-10 h-full">
        <Form/>
      </main>
  );
}
