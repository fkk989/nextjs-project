import Link from "next/link";

export default function UserProfile({ params }: any) {
  console.log(params);
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <h1 className="text-[35px]">Hello {params.id} </h1>
      <Link href={"/profile"}>Go back</Link>
    </div>
  );
}
