import ReactDOM from 'react-dom';
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Container from '@material-ui/core/Container';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import AktivitasSelector from '@/Components/AktivitasSelector';
import Select from 'react-select';
import TahapanInput from '@/Components/TahapanInput';
import BuktiFisikInputHandler from '@/Components/BuktiFisikInputHandler';
import AktivitasList from '@/Components/AktivitasList';

export default function ListAktivitas(props) {
  const token = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Aktivitas Baru</h2>}
  >
    <Container maxWidth="lg">
            <Head title="Tambah Master Data Aktivitas" />

              <div className="p-6 bg-white border-b border-gray-200">
                <div>
                    Errors: {props.errors}
                </div>
              </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <input type="hidden" name="_token" value={token} />
                    <div className="p-6 bg-white border-b border-gray-200">
                      <AktivitasList/>
                      <AktivitasSelector options={props.allUnsur} value={9} label={'Pengembangan Pertanahan'} name={'kpi_group_id'}/>
                    </div>
                </div>
            </div>
    </Container>
  </Authenticated>
  
    );
}
  
if (document.getElementById('experiments')) {
  ReactDOM.render(<Experiments />, document.getElementById('experiments'));
}
