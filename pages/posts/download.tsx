import Link from "next/link";

export default function Index() {
  return (
    <div>
      <Link href="/api/download/leads.json">
        Download secret file
      </Link>
    </div>
  );
}