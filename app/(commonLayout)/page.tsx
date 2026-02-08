import CallToAction from "@/components/modules/home/callToAction";
import CategoriesPage from "@/components/modules/home/categories";
import FeaturedTutors from "@/components/modules/home/featuredTutor";
import Hero from "@/components/modules/home/hero";
import WhyChooseUs from "@/components/modules/home/whyChooseUs";


export default function Home() {
  return <div>
    
    
    <Hero></Hero>
    <FeaturedTutors></FeaturedTutors>
    <WhyChooseUs>
    </WhyChooseUs>

    <CallToAction></CallToAction>
    <CategoriesPage></CategoriesPage>
    
    </div>;
}
