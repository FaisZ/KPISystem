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
import BuktiFisikViewer from '../BuktiFisikViewer';

export default function AtasanViewSubmittedActivityForm({
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
            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-2 bg-white border-b border-gray-200">
                      <div className="p-2">
                        <ShowAktivitasSelector options={allUnsur} defaultValue={{value: selectedData.unsur_id,label: selectedRow.cells[0].value}} name={'kpi_group_id'} activityName={selectedRow.cells[0].value}/>
                      </div>
                      <div className="p-2">
                        Bukti Fisik
                        <BuktiFisikViewer buktiFisikData={buktiFisik} />
                      </div>
                    </div>
                </div>
            </div>
    </Container>
    );
}