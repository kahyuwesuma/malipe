// "use client";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { fetchAllNews } from "@/utils/fetch/fecthDatabase";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { motion } from "framer-motion";

// const Highlights = () => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const result = await fetchAllNews();
//       const highlightedNews = result.filter(
//         (item) => item.isHighlight === true
//       );
//       setNews(highlightedNews);
//     };

//     loadData();
//   }, []);

//   return (
//     <div className="flex flex-col justify-center mt-20 py-10 bg-zinc-100">
//       <h2 className="font-WhitneyBold lg:text-3xl text-xl lg:mx-16 mx-10">
//         Highlights
//       </h2>
//       <Carousel className="w-full px-5 sm:px-6 lg:px-15">
//         <CarouselContent>
//           {news.map((item, index) => {
//             const firstImage = item.content.find(
//               (c) => c.type === "file"
//             )?.value;
//             const description =
//               item.content
//                 .filter((c) => c.type === "text")
//                 .map((c) => c.value)
//                 .join(" ")
//                 .slice(0, 150) + "...";

//             const date = new Date(item.date);
//             const formattedDate = date.toLocaleDateString("id-ID", {
//               month: "long",
//               year: "numeric",
//             });

//             return (
//               <CarouselItem
//                 key={index}
//                 className="basis-[80%] sm:basis-1/2 lg:basis-1/3"
//               >
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4, duration: 0.6 }}
//                   viewport={{ once: true }}
//                   className="space-y-6"
//                 >
//                   <div className="p-2 h-full">
//                     <Card className="h-full flex flex-col border-none shadow-none bg-transparent">
//                       <CardContent className="flex flex-col h-full p-0">
//                         <Link
//                           href={`/berita/${item.id}`}
//                           className="font-AktivGrotesk-Regular text-sm flex flex-col gap-3 h-full"
//                         >
//                           <AspectRatio ratio={4 / 3} className="w-full">
//                             <Image
//                               src={firstImage}
//                               width={400}
//                               height={300}
//                               className="w-full h-full object-cover"
//                               alt={item.title}
//                             />
//                           </AspectRatio>
//                           <div className="flex flex-col gap-1 flex-1 px-1">
//                             <h2 className="font-AktivGrotesk-Bold text-blue-ylbkd text-base sm:text-lg lg:text-xl">
//                               {item.title}
//                             </h2>
//                             <p className="tracking-tight text-xs sm:text-sm">
//                               {description}
//                             </p>
//                           </div>
//                         </Link>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </motion.div>
//               </CarouselItem>
//             );
//           })}
//         </CarouselContent>

//         <CarouselPrevious className="cursor-pointer left-3 sm:left-5" />
//         <CarouselNext className="cursor-pointer right-3 sm:right-5" />
//       </Carousel>
//     </div>
//   );
// };

// export default Highlights;
