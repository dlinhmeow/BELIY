import { ImageOptimizing } from '../atoms'

export default function PromoteSection() {
  return (
    <div className="relative overflow-hidden bg-white pt-4">
      <div className="">
        <div className="relative flex mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 gap-8">
          <div className="flex-1">
            <h1 className="font text-4xl uppercase font-extrabold font-sans tracking-tight text-gray-900 sm:text-6xl">
              we are beliy
            </h1>
            <p className="my-2 text-lg  font-extrabold text-gray-900 uppercase">
              Thời trang dành cho người stress
            </p>
            <video height="240" loop autoPlay muted className="rounded-lg overflow-hidden w-full">
              <source src="/beliywear.mp4" type="video/mp4" className="h-11 w-full" />
            </video>
          </div>
          <div aria-hidden="true" className="flex-1 hidden lg:block">
            <div className="flex items-center gap-8">
              <div className="grid  grid-cols-1 gap-8">
                <div className="h-[100%] w-full overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 ">
                  <ImageOptimizing
                    src="/JACKET1-2.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
                <div className="h-[100%] w-full overflow-hidden rounded-lg">
                  <ImageOptimizing
                    src="/JACKET4-2.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="h-[100%] w-full overflow-hidden rounded-lg">
                  <ImageOptimizing
                    src="/JACKET2-2.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
                <div className="h-[100%] w-full overflow-hidden rounded-lg">
                  <ImageOptimizing
                    src="/JACKET2-1.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
                <div className="h-[100%] w-full overflow-hidden rounded-lg">
                  <ImageOptimizing
                    src="/JACKET3-1.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="h-[100%] w-full overflow-hidden rounded-lg">
                  <ImageOptimizing
                    src="/JACKET3-2.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
                <div className="h-[100%] w-full overflow-hidden rounded-lg">
                  <ImageOptimizing
                    src="/JACKET4-1.png"
                    blurhash="PNPi|+IV.A%1pIx]nOM{x]t7xtM_Mxt8%MsoOYtR%MRjH?Rkf*jt"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
