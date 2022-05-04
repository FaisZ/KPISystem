import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Container from '@material-ui/core/Container';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import UnsurSelector from '@/Components/UnsurSelector';

export default function AddUnsurForm({
    allUnsur
}) {
const token = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
              <form method="POST" action="/administrator/add_unsur">
                <input type="hidden" name="_token" value={token} />
                  <div className="p-6 bg-white border-b border-gray-200">
                    <UnsurSelector options={allUnsur} value={9} label={'Pengembangan Pertanahan'} name={'parent_id'}/>
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
    );
}