import ReactDOM from 'react-dom';
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Container from '@material-ui/core/Container';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import UnsurSelector from '@/Components/UnsurSelector';

export default function AddUnsur(props) {
const token = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Unsur Baru</h2>}
  >
    <Container maxWidth="lg">
            <Head title="Tambah Master Data Aktivitas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form method="POST" action="/administrator/add_unsur">
                      <input type="hidden" name="_token" value={token} />
                        <div className="p-6 bg-white border-b border-gray-200">
                          <UnsurSelector options={props.allUnsur} value={9} label={'Pengembangan Pertanahan'} name={'parent_id'}/>
                          <div className="p-2">
                            Nama Unsur
                            <Input name="title" />
                          </div>
                          <div className="p-2">
                            Informasi Tambahan (Opsional)
                            <Input name="description"/>
                          </div>
                          <div className="p-2">
                            <Button children='Tambahkan' />
                          </div>
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
