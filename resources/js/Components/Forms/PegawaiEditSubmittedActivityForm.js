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
import { Grid } from '@material-ui/core';
import InputInForms from '../InputInForms';
import ShowAktivitasSelector from '../ShowAktivitasSelector';
import BuktiFisikEditor from '../BuktiFisikEditor';

export default function PegawaiEditSubmittedActivityForm({
    allUnsur,
    allRank,
    selectedRow,
    selectedData,
    buktiFisik
}) {
const token = document.head.querySelector('meta[name="csrf-token"]').content;

  function handleChange(e){
  }
  
  return (
    <Container maxWidth="lg">
            <form method="POST" action="/pegawai/edit_aktivitas" enctype="multipart/form-data">
            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-2 bg-white border-b border-gray-200">
                      <input type="hidden" name="_token" value={token} />
                      <InputInForms hidden="true" name="id" value={selectedData.id}/>
                      <InputInForms hidden="true" name="tahapan_id" value={selectedData.tahapan_id}/>
                      <div className="p-2">
                        <ShowAktivitasSelector options={allUnsur} defaultValue={{value: selectedData.unsur_id,label: selectedRow.cells[0].value}} name={'kpi_group_id'} activityName={selectedRow.cells[0].value}/>
                      </div>
                      {/* <div className="p-2">
                        Angka Kredit
                        <div>{selectedRow.cells[2].value}</div>
                      </div>
                      <div className="p-2">
                        Tahapan
                        <TahapanInput readOnly={'true'} defaultValue={selectedData.tahapan} name="tahapan" />
                      </div>
                      <div className="p-2">
                        Informasi Tambahan
                        <div>Ini adalah contoh informasi tambahan</div>
                      </div> */}
                      <div className="p-2">
                        Bukti Fisik
                        <BuktiFisikEditor buktiFisikData={buktiFisik} />
                      </div>
                    </div>
                </div>
                <div className="p-2">
                  <Button children='Tambah' />
                </div>
            </div>
            </form>
    </Container>
    );
}