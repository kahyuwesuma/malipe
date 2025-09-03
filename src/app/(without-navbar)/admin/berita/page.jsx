import AddingContent from "@/components/admin/berita/AddingContent"
import NewsContent from "@/components/admin/berita/NewsContent"

const Page = () => {
    return(
        <div className="flex flex-col gap-5 my-5 mx-8 font-AktivGrotesk-Regular">
            <AddingContent/>
            <NewsContent/>
        </div>
    )
}

export default Page