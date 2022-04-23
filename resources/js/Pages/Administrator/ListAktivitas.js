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
            <form method="POST" action="/administrator/add_aktivitas">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <input type="hidden" name="_token" value={token} />
                    <div className="p-6 bg-white border-b border-gray-200">
                      <AktivitasSelector options={props.allUnsur} value={9} label={'Pengembangan Pertanahan'} name={'kpi_group_id'}/>
                    </div>
                </div>
            </div>
            <div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                      <div>
                          Aktivitas Baru
                      </div>
                      <div className="p-2">
                        Uraian
                        <Input name="title" />
                      </div>
                      <div className="p-2">
                        Pelaksana
                        <Select options={ props.allRank } /*defaultValue={this.state.selectedOption}*/  placeholder={'Pilih Pelaksana'} name={'rank_id'} />
                      </div>
                      <div className="p-2">
                        Angka Kredit
                        <Input name="credit_value" type={'number'} />
                      </div>
                      <div className="p-2">
                        Informasi Tambahan (Opsional)
                        <Input name="description"/>
                      </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                      <div className="p-2">
                        Tahapan
                        <TahapanInput name="tahapan" />
                      </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                      <div className="p-2">
                          Bukti Fisik
                          <BuktiFisikInputHandler />
                      </div>
                    </div>
                </div>
                <div className="p-2">
                  <Button children='Tambahkan' />
                </div>
            </div>
            </form>
    </Container>
  </Authenticated>
  
    );
}
  
if (document.getElementById('experiments')) {
  ReactDOM.render(<Experiments />, document.getElementById('experiments'));
}
