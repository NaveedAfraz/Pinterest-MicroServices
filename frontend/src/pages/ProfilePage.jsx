import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Share2, MoreHorizontal } from "lucide-react";
import React from "react";
import Gallery from "@/components/home/Gallery";
import Collections from "@/components/Collections";

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center ">
      <Card className="w-full max-w-2xl border-none shadow-none bg-transparent  mx-auto">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/api/placeholder/100/100" alt="Maria" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-bold mt-4 mb-1">Maria</h1>


          <div className="flex items-center text-gray-500 mb-2">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
            </svg>
            <span>Maariaarl</span>
          </div>

          <div className="text-sm mb-4">
            <span className="font-medium">15 followers</span>
            <span className="mx-1">·</span>
            <span className="font-medium">4 following</span>
          </div>
        </CardHeader>

        <CardContent className="flex justify-center pb-8">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <Share2 size={20} />
            </Button>

            <Button variant="outline" className="rounded-full">
              Message
            </Button>

            <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white">
              Follow
            </Button>

            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <MoreHorizontal size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex min-h-screen flex-col p-0">
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="w-40 mx-auto grid grid-cols-2 bg-transparent border-b h-auto rounded-none">
            <TabsTrigger value="created" className="data-[state=inactive]:bg-transparent data-[state=active]:bg-transparent border-0 data-[state=inactive]:text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none px-4 py-2 relative">
              Created
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=inactive]:bg-transparent data-[state=active]:bg-transparent border-0 data-[state=inactive]:text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none px-4 py-2 relative">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created" className="pt-0 m-0">
            <Gallery />
          </TabsContent>

          <TabsContent value="saved" className="pt-0 m-0">
            <Collections />
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}

export default ProfilePage;