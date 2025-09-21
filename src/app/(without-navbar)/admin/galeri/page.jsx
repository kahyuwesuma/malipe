import AddingPhotos from "@/components/admin/galeri/AddingPhotos"
import GalleryContent from "@/components/admin/galeri/GalleryContent"

const Page = () => {
    return(
        <div className="flex flex-col gap-5 my-5 mx-8 font-AktivGrotesk-Regular">
            <AddingPhotos/>
            <GalleryContent/>
        </div>
    )
}

export default Page