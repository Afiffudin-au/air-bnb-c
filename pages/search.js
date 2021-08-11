import { format } from 'date-fns'
import { parseISO } from 'date-fns'
import { useRouter } from 'next/dist/client/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'

function search({ searchResults }) {
  const router = useRouter()
  const { location, startDate, endDate, noOfGuests } = router.query
  const formattedStartDate = format(
    startDate ? new Date(startDate) : new Date(),
    'dd MMMM yy'
  )
  const formattedEndDate = format(
    endDate ? new Date(endDate) : new Date(),
    'dd MMMM yy'
  )
  const range = `${formattedStartDate} - ${formattedEndDate}`
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ stays - {range} - for {noOfGuests} guest
          </p>
          <h1 className='text-3xl font-semibold m-2 mb-6'>
            Stays in {location}
          </h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellaion Flexiblility</p>
            <p className='button'>Type of place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beed</p>
            <p className='button'>More filters</p>
          </div>
          <div className='flex flex-col'>
            {searchResults?.map((item) => (
              <InfoCard
                key={item.img}
                img={item.img}
                location={item.location}
                title={item.title}
                description={item.description}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
export async function getServerSideProps(context) {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )
  return {
    props: { searchResults },
  }
}
export default search
