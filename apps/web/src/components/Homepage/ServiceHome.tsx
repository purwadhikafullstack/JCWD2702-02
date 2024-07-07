export default function ServiceHome() {
    const services = [
        { title: "Delivery", description: "We’ll deliver your purchases to your home or workplace.", icon: "🚚" },
        { title: "Assembly", description: "We can assemble a single piece of furniture to an entire PAX wardrobe system.", icon: "🛠️" },
        { title: "Interior design", description: "Get a complete space solution from our interior design experts.", icon: "🏡" },
        { title: "Track my order", description: "Check a real time progress and detail of your shipment here.", icon: "📦" },
        { title: "Click and collect", description: "Collect your online purchase at IKEA Pick-up Point or our nearest store.", icon: "🛒" },
        { title: "Contact us", description: "Let us know, we’re here to help.", icon: "📞" },
    ];

    return (
        <div className="flex flex-col items-center pt-[30px] pb-[100px]">
            <hr className="h-[3px] w-[50px] bg-ebony" />
            <div className="text-eggplant text-center font-bold text-[25px] pb-[3%]">
                Services for your convenience
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5">
                {services.map((service, index) => (
                    <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">{service.icon}</div>
                        <h3 className="font-bold text-xl text-center mb-2">{service.title}</h3>
                        <p className="text-center text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
