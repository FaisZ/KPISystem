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
import { Grid } from '@material-ui/core';
import InputInForms from '../InputInForms';
import EditAktivitasSelector from '../EditAktivitasSelector';

export default function EditActivityForm({
    allUnsur,
    allRank,
    selectedRow,
    selectedData,
}) {
const token = document.head.querySelector('meta[name="csrf-token"]').content;

  function handleChange(e){
  }
  
  return (
    <Container maxWidth="lg">
            <form method="POST" action="/administrator/update_aktivitas">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <input type="hidden" name="_token" value={token} />
                    <div className="p-6 bg-white border-b border-gray-200">
                      <EditAktivitasSelector options={allUnsur} defaultValue={{value: selectedData.unsur_id,label: selectedRow.cells[0].value}} name={'kpi_group_id'} activityName={selectedRow.cells[1].value}/>
                    </div>
                </div>
            <div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                    <InputInForms hidden="true" name="id" value={selectedData.id}/>
                      <div className="p-2">
                        Uraian
                        {/* Uraian */}
                        <InputInForms name="title" defaultValue={selectedRow.cells[1].value} handleChange={(value) => this.onChange(value)}/>
                      </div>
                      <div className="p-2">
                        Pelaksana
                        <Select options={ allRank } defaultValue={{value: selectedData.jabatan_id,label: selectedRow.cells[2].value}}  placeholder={'Pilih Pelaksana'} name={'rank_id'} />
                      </div>
                      <div className="p-2">
                        Angka Kredit
                        <InputInForms name="credit_value" type={'number'} defaultValue={selectedRow.cells[3].value} handleChange={handleChange()}/>
                      </div>
                      <div className="p-2">
                        Informasi Tambahan (Opsional)
                        <InputInForms name="description" handleChange={handleChange()}/>
                      </div>
                    </div>
                </div>
                {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                    <Grid container>
                        <Grid item sm={6}> 
                          Tahapan
                          <TahapanInput name="tahapan" />
                        </Grid>
                        <Grid item sm={6}>
                          Bukti Fisik
                          <BuktiFisikInputHandler />
                        </Grid>
                    </Grid>
                    </div>
                </div> */}
                <div className="p-2">
                  <Button children='Perbarui' />
                </div>
            </div>
            </form>
    </Container>
    );
}