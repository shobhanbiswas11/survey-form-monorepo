import { useStore } from "store";

export default function Controller() {
  const map = useStore((s) => s.questionMap);

  return (
    <div className="bg-slate-200 w-[50px] absolute top-5 left-5 z-[10000]">
      <ul>
        <li>A</li>
        <li>E</li>
        <li>I</li>
        <li>O</li>
      </ul>
    </div>
  );
}
