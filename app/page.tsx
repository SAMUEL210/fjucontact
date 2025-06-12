import ListAllJeunes from "@/components/listAllJeunes"

export default function Home() {
  return (
    <div className="w-10/12 mx-auto shadow-lg mt-10">
      <h1 className="text-4xl  px-10 py-6 font-bold text-center">Tous les Jeunes</h1>
      <ListAllJeunes />
    </div>

  )
}