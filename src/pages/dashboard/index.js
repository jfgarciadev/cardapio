import { useState } from 'react';
import { getUser } from "../../utils/auth/getUser";

import NavBar from '../../components/dashboard/NavBar';


export default function Home({ user }) {

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col pt-0 items-center pb-4">
            <NavBar user={user} />
        </div>
    )
}



export async function getServerSideProps(context) {
    // verificando se o usuário está autenticado
    const { req, res } = context;
    const { authToken } = req.cookies;
    console.log(authToken);
    if (authToken) {
        const user = await getUser(authToken);
        if (user) {
            return {
                props: {
                    user
                }
            }
        }
    }
    return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }

};
