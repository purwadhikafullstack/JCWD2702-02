import Image from 'next/image';

export default function WhatsOn() {
  return (
    <div className="h-full w-full pt-[60px] pb-[100px]">
      <div className="grid place-items-center">
        <hr className="h-[3px] w-[50px] bg-ebony" />
        <p className="text-[25px] font-bold text-eggplant">Whats on Decorify</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 pt-10">
        <div className="relative h-[413px] w-[350px] md:w-[380px]">
          <Image
            src="/card/cd4.jpeg"
            className="absolute z-10 h-[228px] w-full"
            alt="Enhance Your Garden with Recycled Coffee Grounds"
            width={10000}
            height={10000}
          />
          <p className="absolute h-[228px] w-full translate-x-2 translate-y-2 border-[3px] border-eggplant"></p>
          <div className="relative flex flex-col gap-5 pt-[260px]">
            <h1 className="text-[16px] font-bold text-eggplant">
              Enhance Your Garden with Recycled Coffee Grounds
            </h1>
            <p className="pt-2 text-[13px] text-gray-500">
              Ground coffee is naturally rich in nutrients such as potassium,
              nitrogen, and magnesium, making it an excellent choice for soil
              fertilization. In fact, coffee grounds can serve as a natural
              compost, contributing to soil health and fertility.
            </p>
          </div>
        </div>
        <div className="relative h-[413px] w-[350px] md:w-[380px]">
          <Image
            src="/card/cd5.jpeg"
            className="absolute z-10 h-[228px] w-full"
            alt="Elevate Furniture: Brand of the Year for Two Consecutive Years"
            width={1000}
            height={1000}
          />
          <p className="absolute h-[228px] w-full translate-x-2 translate-y-2 border-[3px] border-eggplant"></p>
          <div className="relative flex flex-col gap-5 pt-[260px]">
            <h1 className="text-[16px] font-bold text-eggplant">
              Elevate Furniture: Brand of the Year for Two Consecutive Years
            </h1>
            <p className="pt-2 text-[13px] text-gray-500">
              We are proud to announce that Elevate Furniture has been honored
              as Brand of the Year in the &apos;Home Furnishings&apos; category at the
              prestigious World Branding Awards for 2023-2024. This marks the
              second consecutive year that Elevate Furniture has achieved this
              distinguished recognition.
            </p>
          </div>
        </div>
        <div className="relative h-[413px] w-[350px] md:w-[380px]">
          <Image
            src="/card/cd3.jpeg"
            className="absolute z-10 h-[228px] w-full"
            alt="Furniture Meets Entertainment: Prestige Furniture x Netflix Collaboration"
            width={380}
            height={413}
          />
          <p className="absolute h-[228px] w-full translate-x-2 translate-y-2 border-[3px] border-eggplant"></p>
          <div className="relative flex flex-col gap-5 pt-[260px]">
            <h1 className="text-[16px] font-bold text-eggplant">
              Furniture Meets Entertainment: Prestige Furniture x Netflix
              Collaboration
            </h1>
            <p className="pt-2 text-[13px] text-gray-500">
              Discover the exclusive Prestige Furniture x Netflix collaboration,
              bringing you two unique collections inspired by the elegance of
              Gadis Kretek.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
