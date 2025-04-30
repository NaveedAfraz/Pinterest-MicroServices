import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function Explore() {
    const inspirationCards = [
        {
            category: "Spice & sizzle",
            title: "Mexican recipes to try at home",
            image: "/api/placeholder/400/320",
            alt: "Mexican quesadillas stacked on a plate"
        },
        {
            category: "From suits to sherwanis",
            title: "Groom style that stands out",
            image: "/api/placeholder/400/320",
            alt: "Man wearing traditional sherwani"
        },
        {
            category: "Glam up",
            title: "The most eye-catching wedding accessories",
            image: "/api/placeholder/400/320",
            alt: "Woman wearing wedding accessories"
        },
        {
            category: "Trending now",
            title: "Bob haircuts",
            image: "/api/placeholder/400/320",
            alt: "Woman with bob haircut"
        },
        {
            category: "Calming collages",
            title: "Feel the soft life aesthetic",
            image: "/api/placeholder/400/320",
            alt: "Collage of soft life aesthetic images"
        },
        {
            category: "The best set",
            title: "Birthday nails",
            image: "/api/placeholder/400/320",
            alt: "Birthday themed nail designs"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <p className="text-sm text-gray-500">April 30, 2025</p>
            </div>

            <h1 className="text-3xl font-bold text-center mb-6">Stay Inspired</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inspirationCards.map((card, index) => (
                    <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="relative h-64">
                            <img
                                src={card.image}
                                alt={card.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                                <span className="text-sm font-medium opacity-80 mb-1 text-center">{card.category}</span>
                                <h2 className="text-xl font-bold text-center">{card.title}</h2>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}