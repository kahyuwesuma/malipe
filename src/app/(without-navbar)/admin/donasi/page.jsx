import AddingDonation from "@/components/admin/donasi/AddingDonation"
import DonationContent from "@/components/admin/donasi/DonationContent"

const Page = () => {
    return(
        <div className="flex flex-col gap-5 my-5 mx-8 font-AktivGrotesk-Regular">
            <AddingDonation/>
            <DonationContent/>
        </div>
    )
}

export default Page