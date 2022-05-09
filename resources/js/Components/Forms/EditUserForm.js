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

export default function EditUserForm({
    allRank,
    selectedData,
    allUsers
}) {
const token = document.head.querySelector('meta[name="csrf-token"]').content;
const userType = [
  {label: 'Pengguna', value: 0},
  {label: 'Administrator', value: 1}
]
  function getBossData(){
    var bossList = [];
    for(var i = 0; i<allUsers.length;i++){
      //if its not the pegawai itself
      if(allUsers[i].id!=selectedData.id){
        bossList[i] = {label: allUsers[i].nama, value: allUsers[i].id};
      }
    }
    return bossList;
  }
  
  function getIsAdmin(){
    if(selectedData.is_admin!=null)
      return selectedData.is_admin;
    else
      return 0;
  }
  return (
    <Container maxWidth="lg">
            <form method="POST" action="/administrator/update_user">
            <input type="hidden" name="_token" value={token} />
            <div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                    <InputInForms hidden="true" name="id" value={selectedData.id}/>
                      <div className="p-2">
                        Nama Lengkap
                        {/* Uraian */}
                        <InputInForms name="name" defaultValue={selectedData.nama} handleChange={(value) => this.onChange(value)}/>
                      </div>
                      <div className="p-2">
                        Email
                        {/* Uraian */}
                        <InputInForms name="email" type="email" defaultValue={selectedData.email} handleChange={(value) => this.onChange(value)}/>
                      </div>
                      <div className="p-2">
                        Jabatan
                        <Select options={ allRank } defaultValue={{value: selectedData.jabatan_id,label: selectedData.jabatan}}  placeholder={'Pilih Jabatan'} name={'rank_id'} />
                      </div>
                      <div className="p-2">
                        Atasan
                        <Select options={ getBossData() } defaultValue={{value: selectedData.atasan_id,label: selectedData.atasan}}  placeholder={'Pilih Atasan'} name={'boss_id'} />
                      </div>
                      <div className="p-2">
                        Jenis Akun
                        <Select options={ userType } defaultValue={{value: getIsAdmin(),label: userType[getIsAdmin()].label}} placeholder={'Jenis Akun'} name={'is_admin'} />
                      </div>
                    </div>
                </div>
                <div className="p-2">
                  <Button children='Perbarui' />
                </div>
            </div>
            </form>
    </Container>
    );
}