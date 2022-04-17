import ReactDOM from 'react-dom';
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Container from '@material-ui/core/Container';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import AktivitasSelector from '@/Components/AktivitasSelector';

export default function AddAktivitas(props) {
const token = document.head.querySelector('meta[name="csrf-token"]').content;
const techCompanies = [
  { label: "Apple", value: 1 },
  { label: "Facebook", value: 2 },
  { label: "Netflix", value: 3 },
  { label: "Tesla", value: 4 },
  { label: "Amazon", value: 5 },
  { label: "Alphabet", value: 6 },
];
console.log(props.allUnsur);

  return (
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Aktivitas Baru</h2>}
  >
    <Container maxWidth="lg">
            <Head title="Tambah Master Data Aktivitas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form method="POST" action="/administrator/add_aktivitas">
                      <input type="hidden" name="_token" value={token} />
                        <div className="p-6 bg-white border-b border-gray-200">
                          <AktivitasSelector options={props.allUnsur} value={9} label={'Pengembangan Pertanahan'} name={'kpi_group_id'}/>
                          <div>
                            Uraian
                            <Input name="title" />
                          </div>
                          <div>
                            Deskripsi
                            <Input name="description"/>
                          </div>
                          <div>
                            Pelaksana
                            <Input name="rank_id"/>
                          </div>
                          <div>
                            Angka Kredit
                            <Input name="credit_value"/>
                          </div>
                          <Button children='Tambahkan' />
                        </div>
                    </form>
                </div>
            </div>
    </Container>
  </Authenticated>
  
    );
}
  
if (document.getElementById('experiments')) {
  ReactDOM.render(<Experiments />, document.getElementById('experiments'));
}
