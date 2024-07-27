import { Input, Button, Checkbox } from "@nextui-org/react"
import { useEffect } from "react"

export const List = ({ listOfViewers }: { listOfViewers: any }) => {
  useEffect(() => {
    console.log(listOfViewers)
  }, [listOfViewers])

  return (
    <div className="List h-[800px] mb-10 w-[100%] flex flex-col items-center gap-2">
      <div className="bg-gray-800 w-[70%] h-max rounded-xl p-2">
        <h1 className="font-bold text-xl text-center">List of viewers <span className="text-green-400">({listOfViewers.length})</span></h1>
      </div>

      <div className="w-[70%] !max-h-[800px] overflow-auto flex rounded-xl flex-col gap-2">
        {listOfViewers.map((viewer: any) => (
          <div className="w-[100%] h-max bg-gray-800 flex rounded-xl p-1 gap-2">
            <img
              src="https://img.freepik.com/premium-wektory/kick-logo-wektor-do-pobrania-kick-streaming-icon-wektor-logo-eps_691560-10814.jpg"
              alt="Kick logo"
              className="ml-1 w-[22px] saturate-0"
            />

            <div className="w-[100%] flex justify-between">
              <span>{viewer.authorName}</span>

              <Checkbox defaultSelected radius="full" color="success" className="p-0 -m-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}