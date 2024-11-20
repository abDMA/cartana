import GiftCard from "../components/GiftCard"

const CardShow = ({cards,loading,error}) => {
  
  return (
    <div dir="rtl" className="max-w-5xl mx-auto xss:px-2 px-6   grid xss:grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {
          loading?<p className="mx-4">جارٍ تحميل البطاقات ...</p>:
          cards?.giftCard?.length <= 0 ? <p className="mx-6">لا يوجد بطاقات متوفرة</p> : error ? <p className="text-red-600 text-xs ">{error}</p>:
            cards?.giftCard?.slice(0,8).map((card)=>(
                <GiftCard  card={card} key={card._id} id={card._id} title={card.cardName} img={card.cardImg} price={card.price} alt={card.cardName} available={card.availibilty}/>       
            ))
        }
       
    </div>
  )
}

export default CardShow