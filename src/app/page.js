import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Home() {
  async function loginUser(formData) {
    'use server'
    const userName = formData.get('username');
    const cookieList = cookies();
    cookieList.set('username', userName);
    redirect('/channel');
  }
  return (
    <div className="flex justify-center items-center pt-3">
      <form action={loginUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-black w-full hover:bg-black text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">
            Join room
          </button>
        </div>
      </form>
    </div>
  )
}
