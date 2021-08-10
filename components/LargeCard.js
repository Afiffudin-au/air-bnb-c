import Image from 'next/image'
function LargeCard({ img, title, descripton, buttonText }) {
  return (
    <section className='relative py-16 cursor-pointer'>
      <div className='relative h-96 min-w-[300px] hover:scale-105 transform transition duration-300 ease-out'>
        <Image
          src={img}
          className='rounded-2xl'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='absolute top-32 left-12  hover:scale-110 transform transition duration-150 ease-out'>
        <h3 className='text-4xl mb-3 w-64'>{title}</h3>
        <p>{descripton}</p>
        <button className='hover:shadow-xl active:scale-90 transition duration-150 text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5'>
          {buttonText}
        </button>
      </div>
      1
    </section>
  )
}

export default LargeCard
