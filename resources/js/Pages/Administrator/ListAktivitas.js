import ReactDOM from 'react-dom';
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
//import { Head } from '@inertiajs/inertia-react';
import { Link, Head } from '@inertiajs/inertia-react';
import Container from '@material-ui/core/Container';
// import Input from '@/Components/Input';
// import Button from '@/Components/Button';
// import AktivitasSelector from '@/Components/AktivitasSelector';
// import Select from 'react-select';
// import TahapanInput from '@/Components/TahapanInput';
// import BuktiFisikInputHandler from '@/Components/BuktiFisikInputHandler';
// import AktivitasListComponent from '@/Components/AktivitasListComponent';
//import MaterialUIKitchenSink from '@/Components/MaterialUIKitchenSink';
import ActivityTable from '@/Components/ActivityTable';

export default function ListAktivitas(props) {
  const token = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Aktivitas</h2>}
    >
      <div>
        <Head title="Tambah Master Data Aktivitas" />
        <div className="col-8 p-6 bg-white">
          <div>
            Errors: {props.errors}
          </div>
        </div>
        <div className="py-12">
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <input type="hidden" name="_token" value={token} />
            <div className="p-6 bg-white border-b border-gray-200">
              <ActivityTable tableData={props.allAktivitas}/>
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
