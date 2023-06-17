import Image from 'next/image'
import { Inter } from 'next/font/google'
import connectToDatabase from '../mongodb'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ menuItems }) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Restaurant</h1>
      <div className="max-w-2xl w-full">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
            <div className="p-4 flex">
              <div className="relative h-24 w-24 mr-4">
                <div className="flex items-center h-full">
                  <Image src={item.image} layout="fill" objectFit="cover" className="h-full" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <p className="text-gray-500">${item.price}</p>
                <p className="text-gray-500 mt-2">{item.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const client = await connectToDatabase()
  const db = client.db()

  const menuItems = await db.collection('menuItems').find().toArray()

  return {
    props: {
      menuItems: JSON.parse(JSON.stringify(menuItems)),
    },
  }
}