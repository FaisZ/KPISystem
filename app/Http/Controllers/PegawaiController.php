<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Auth; 
use Illuminate\Http\Request;
use Illuminate\Http\Redirector;

class PegawaiController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index()
    {
      return view('pegawai.pegawai_dashboard', [
        'user' => Auth::user()
      ]);
    }

    public function show($id)
    {
        return view('pegawai.pegawai_dashboard', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function addActivity()
    {
        return view('pegawai.pegawai_add_new_activity', [
          'user' => Auth::user()
        ]);
    }

    public function addPegawai(Request $request)
    {
      $save = new User;
      $save->name = $request->name;
      $save->email = $request->email;
      $save->password = $request->password;

      $save->save();
      return redirect()->back()->with('success', 'User added');   
      
    }
}