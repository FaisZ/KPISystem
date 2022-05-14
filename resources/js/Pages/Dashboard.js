import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import PegawaiDashboard from './PegawaiDashboard';
import AdminDashboard from './AdminDashboard';
export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

        
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <PegawaiDashboard auth={props.auth} />
                    <PegawaiDashboard auth={props.auth} />
                    <PegawaiDashboard auth={props.auth} />
                    <PegawaiDashboard auth={props.auth} />
                    <PegawaiDashboard auth={props.auth} />
                    
                </div>
            </div>


        </Authenticated>
    );
}
