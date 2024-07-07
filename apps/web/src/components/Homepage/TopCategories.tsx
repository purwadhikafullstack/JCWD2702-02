import Image from "next/image";
import Link from "next/link";

export default function TopCategories() {
    const topCategories = [
        { title: "Drawers", linkTo: "/shop?categoryId=5", image: `/TopCategories/DRAWERS.jpeg` },
        { title: "Bins", linkTo: "/shop?categoryId=7", image: `/TopCategories/BINS.jpeg` },
        { title: "Sofas", linkTo: "/shop?categoryId=3", image: `/TopCategories/COUCHES.jpeg` },
        { title: "Boxes", linkTo: "/shop?categoryId=4", image: `/TopCategories/BOXES.jpeg` },
        { title: "Chairs", linkTo: "/shop?categoryId=2", image: `/TopCategories/CHAIRS.jpeg` },
        { title: "Cabinets", linkTo: "/shop?categoryId=6", image: `/TopCategories/CABINETS.jpeg` }
    ];

    return (
        <div className="flex flex-col items-center pt-10 pb-24 w-[80vw]">
            <hr className="h-[3px] w-[50px] bg-ebony" />
            <div className="text-eggplant text-center font-bold text-[25px] pb-[3%]">
                Top Category Picks
            </div>
            <div className="flex flex-wrap w-[400px] md:w-full justify-between">
                {topCategories.map((category, index) => (
                    <Link key={index} href={category.linkTo}>
                        <div className="rounded-full border-eggplant border-[6px] p-7 mt-[50px] md:mt-[10px] w-[150px] h-[150px] gap-10">
                            <div className="w-full h-full relative hover:scale-110 transform transition-transform duration-500">
                                <Image src={category.image} alt={category.title} width={1000} height={1000} objectFit="cover" />
                            </div>
                            <div className="text-black font-bold text-md bg-transparent rounded text-center text-[16px] mt-[40px]">
                                {category.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
