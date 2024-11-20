
import { AdSection, Banner, CardSections, CardShow, Footer, NavBar, PopularCard } from './index'
import Breaker from '../components/Breaker'
import useGiftCards from '../store/useGiftCards';
import { useEffect } from 'react';



const Home = () => {
  const { cards, getAllCards, loading, error } = useGiftCards();

  useEffect(() => {
    getAllCards()
  }, [getAllCards])
 
  return (
    <>
    <NavBar/>
    <Banner/>
    <Breaker link={'/all-cards'} title={'الأكــثر مبيعـــا علـى'}/>
    <PopularCard cards={cards} loading={loading} error={error}/>
    <Breaker link={'/all-sections'} title={'أقسام البطـــاقــات علـى'}/>
    <CardSections/>
    <AdSection/>
    <Breaker link={'/all-cards'} title={'البطــاقــات علـى'}/>
    <CardShow cards={cards} loading={loading} error={error}/>
    <Footer/>


    </>
  )
}

export default Home