<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Auth; 
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Redirector;

class AdministratorController extends Controller
{
  /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    private $folder = 'Administrator/';

    public function index()
    {
      return Inertia::render($this->folder.'AddMasterActivity', ['hello' => 'world']);
    }

    public function addUnsur()
    {
      return Inertia::render($this->folder.'AddUnsur', ['hello' => 'world']);
    }

    public function show($id)
    {
        return view('pegawai.pegawai_dashboard', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function addActivity(Request $request)
    {
      $save = new User;
      $save->name = $request->name;
      $save->email = $request->email;
      $save->password = $request->password;

      $save->save();
      return Inertia::render('Experiments', ['status' => 'success']);
    }
}