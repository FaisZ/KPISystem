import ReactDOM from 'react-dom';
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import PegawaiSubmittedActivityTable from '@/Components/PegawaiSubmittedActivityTable';

export default function PegawaiStatusAktivitasPage(props) {
  const token = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Status Pengajuan Aktivitas</h2>}
    >
      <div>
        <Head title="Tambah Master Data Aktivitas" />

        <div className="py-12">
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <input type="hidden" name="_token" value={token} />
            <div className="p-6 bg-white border-b border-gray-200">
              <PegawaiSubmittedActivityTable tableData={props.allAktivitas} buktiFisikData={props.allBukti} allUnsur={props.allUnsur} allRank={props.allRank}/>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  
  );
}
  
if (document.getElementById('experiments')) {
  ReactDOM.render(<Experiments />, document.getElementById('experiments'));
}
