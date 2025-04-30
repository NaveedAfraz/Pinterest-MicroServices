import React from "react";
import { Plus, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotificationSidebar() {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/create");
    };

    const notificationItems = [
        {
            title: "What ideas feel so Naveed?",
            subtitle: "Create your first Pin to share what inspires you.",
            image: "/api/placeholder/48/48",
            time: "18h",
            isCreateButton: true
        }
    ];

    return (
        <div className="w-[392px] border-l border-gray-200 bg-white h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Seen</h2>
            </div>

            <div className="py-2">
                {notificationItems.map((item, index) => (
                    <div key={index} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        {item.isCreateButton ? (
                            <div
                                className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mr-3"
                                onClick={handleCreate}
                            >
                                <Plus className="text-gray-700" />
                            </div>
                        ) : (
                            <img src={item.image} alt="" className="h-12 w-12 rounded-md object-cover mr-3" />
                        )}

                        <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            {item.subtitle && <p className="text-gray-600">{item.subtitle}</p>}
                        </div>

                        <div className="text-gray-400 text-sm ml-2">
                            {item.time}
                        </div>
                    </div>
                ))}
            </div>

            <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 flex justify-center py-2">
                <ChevronUp className="text-gray-400" />
            </div>
        </div>
    );
}