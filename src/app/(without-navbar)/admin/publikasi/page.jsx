import AddingPublication from "@/components/admin/publikasi/AddingPublication"
import PublicationContent from "@/components/admin/publikasi/PublicationContent"

const Page = () => {
    return(
        <div className="flex flex-col gap-5 my-5 mx-8 font-AktivGrotesk-Regular">
            <AddingPublication/>
            <PublicationContent/>
        </div>
    )
}

export default Page