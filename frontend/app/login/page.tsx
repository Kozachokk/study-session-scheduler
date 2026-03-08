import LoginBox from "./components/LoginBox";
import SignUpBox from "./components/SignUpBox";

export default function Home() {
  return (
      <main className="bg-dark1 text-light3 h-full overflow-hidden flex justify-center items-center">
        <SignUpBox />
      </main>
  );
}