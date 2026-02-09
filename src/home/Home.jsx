import WhatsAppButton from "../common/WhatsAppButton"
import HomePage1 from "./HomePage1"
import HomePage2 from "./HomePage2"
import HomePage3 from "./HomePage3"
import BrandStory from "./BrandStory"
import BulkGifting from "./BulkGifting"
import Review from "./Review"
import HomeAbout from "./HomeAbout"
import OfferSlider from "./OfferSlider"

function Home() {
    return (
        <>
            <WhatsAppButton />
            <HomePage1 />
            <HomePage3 />
            <HomeAbout />
            <BulkGifting />
            <OfferSlider />

            <HomePage2 />
            <Review />
            <BrandStory />

        </>
    )
}
export default Home
