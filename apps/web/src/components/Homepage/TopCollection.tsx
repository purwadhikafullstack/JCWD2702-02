import React, { useRef } from 'react';
import Image from 'next/image';

export default function TopCollection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const topCollection = [
        { title: "AFTONSPARV", bgColor: "#0b3658", description: "Our space-themed AFTONSPARV children’s collection brings outer space to your space – whether that is in the living room, under the bed, behind the sofa or under the stairs. Created in collaboration with a group of a children who love space, it aims to inspire creativity, curiosity and adventures for budding astronauts and earthlings alike ​", image: `/TopCollection/AFTONSPARV-TC.webp` },
        { title: "BRÖGGAN", bgColor: "#717736", description: "Give instant sunshine at your home with our sunny new collection, BRÖGGAN. Enjoy fun, bright colours indoors and outdoors.", image: `/TopCollection/BROGGAN-TC.webp` },
        { title: "DAJLIEN", bgColor: "#02896f", description: "DAJLIEN is designed for heavy use – but it's also designed with colours and details that work even when it's not used for training: as storage or as practical pieces around the home.", image: `/TopCollection/DAJLIEN-TC.webp` },
        { title: "DAKSJUS", bgColor: "#b7b495", description: "This collection features colorful planters, pots, plant stands and vases for growing and displaying your favorite green friends - even in small places.", image: `/TopCollection/DAKSJUS-TC.webp` },
        { title: "FÖSSTA", bgColor: "#9c080a", description: "This Lunar New Year, let the FÖSSTA collection of home accessories bring a little good fortune, prosperity and happiness into your home. With FÖSSTA you can embrace the luck of the dragon while making your guests smile.​", image: `/TopCollection/FOSSTA-TC.webp` },
        { title: "FRODD", bgColor: "#ab9b8e", description: "Explore Our exquisite range of FRODD collection series that designed for elegance and comfort.", image: `/TopCollection/FRODD-TC.webp` },
        { title: "GOKVÄLLA", bgColor: "#6c83b7", description: "let GOKVÄLLA set the stage for all that beutiful food, and for you to enjoy each other's company in comfort and style.", image: `/TopCollection/GOKVALLA-TC.webp` },
        { title: "MITTZON", bgColor: "#f1d7d7", description: "The adaptable furniture range that transforms any office space into a vibrant center of productivity and innovation.", image: `/TopCollection/MITTZON-TC.webp` },
        { title: "NYTILLVERKAD", bgColor: "#e97132", description: "Discover a new release of design favourites from our archives, ready to rebloom for a new generation. Get drawn into a world where the textiles are brighter and the armchairs bouncier!", image: `/TopCollection/NYTILLVERKAD-TC.webp` },
        { title: "PAX", bgColor: "#947862", description: "PAX wardrobes mean storage that really matches your space. Ours also mean you can choose frames and doors that match your style and interior fittings that suit what you wear. Start with our pre-designed combinations. You can adapt them to suit yourself, or go all the way and create your own tailor-made wardrobe with our PAX planner.", image: `/TopCollection/PAX-TC.webp` },
        { title: "TESAMMANS", bgColor: "#e97132", description: "A collaboration with design duo Raw Color featuring furniture, textiles, tableware and decoration with unexpected colour combinations and graphic shapes.", image: `/TopCollection/TESAMMANS-TC.webp` },
        { title: "UTSÅDD", bgColor: "#eebb2a", description: "Our UTSÅDD series makes pet life more comfortable at home while maintaining your home style.", image: `/TopCollection/UTSADD-TC.webp` },
    ];

    return (
        <div className="flex flex-col items-center pt-8 pb-24">
            <hr className="h-[3px] w-[50px] bg-ebony" />
            <div className="text-eggplant text-center font-bold text-[25px] pb-[3%]">
                Our Top Collections
            </div>
            <div className="relative w-[400px] md:w-full md:max-w-screen-xl overflow-hidden">
                <div ref={scrollRef} className="flex overflow-x-auto space-x-4 px-4 py-2 scrollbar-hide" >
                    {topCollection.map((collection, index) => (
                        <div key={index} className="min-w-[280px] max-w-[280px] md:min-w-[380px] md:max-w-[380px] flex-shrink-0 relative bg-white rounded-lg overflow-hidden shadow-lg">
                            <Image src={collection.image} className="h-[228px] w-full object-cover" alt={collection.title} width={380} height={228} />
                            <div className="p-4 h-full" style={{ backgroundColor: collection.bgColor }}>
                                <div className="text-lg text-white font-bold">
                                    {collection.title}
                                </div>
                                <div className="pt-2 text-sm text-white">
                                    {collection.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
