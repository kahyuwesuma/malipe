import AddingProject from "@/components/admin/projek-kami/AddingProject"
import ProjectContent from "@/components/admin/projek-kami/ProjectContent"

const Page = () => {
    return(
        <div className="flex flex-col gap-5 my-5 mx-8 font-AktivGrotesk-Regular">
            <AddingProject/>
            <ProjectContent/>
        </div>
    )
}

export default Page