import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Share2, MoreHorizontal } from "lucide-react";
import React from "react";

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-8">
      <Card className="w-full max-w-2xl border-none shadow-none bg-transparent">
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

        <CardFooter className="flex flex-col p-0">
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-transparent border-b h-auto rounded-none">
              <TabsTrigger
                value="created"
                className="data-[state=inactive]:bg-transparent data-[state=active]:bg-transparent data-[state=inactive]:text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none"
              >
                Created
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=inactive]:bg-transparent data-[state=active]:bg-transparent data-[state=inactive]:text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none"
              >
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="created" className="pt-4 m-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2].map((item) => (
                  <Card key={item} className="overflow-hidden border-none">
                    <div className="aspect-[2/3]">
                      <img
                        src={`/api/placeholder/200/${300 + item * 10}`}
                        alt={`Pin ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="pt-4 m-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden border-none">
                    <div className="aspect-[2/3]">
                      <img
                        src={`/api/placeholder/200/${300 + item * 10}`}
                        alt={`Pin ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfilePage;