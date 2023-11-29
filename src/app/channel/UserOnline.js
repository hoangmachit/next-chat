'use client'
export default function UserOnline({ allUser, user }) {
    return (
        <div className="w-70">
            <h2>All Users:</h2>
            <ul>
                {allUser?.map(item => {
                    return <li key={item.id} className="flex items-center">
                        <span className="inline-block rounded w-1 h-1 bg-black me-1"></span>{item.id === user.id ? 'You' : item.name}
                    </li>
                })}
            </ul>
        </div>
    );
}