<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Unsur;
use App\Models\Rank;
use App\Models\Aktivitas;
use App\Models\Tahapan;
use App\Models\BuktiFisik;
use App\Models\KPISubmission;
use Auth; 
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Redirector;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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
      return $this->_newAktivitasDefaultData('');
    }

    public function addUnsur(Request $request){
      $errors = '';
      try {
        $save = new Unsur;
        $save->title = $request->title;
        $save->description = $request->description;
        $level = 0;
        //if tidak ada is not chosen
        if($request->parent_id != null && $request->parent_id != -1){
          //make sure data is present
          $parentId = Unsur::find($request->parent_id);
          if($parentId==null)
            throw new Exception("Parent Not Found. Check Query", 1);
          $save->parent_id = $request->parent_id;
          $level = $parentId->level+1;
        }
        $save->level = $level;
        $save->save();
      }
      catch (\Throwable $e){
        $errors = 'Saving unsur failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Saving unsur failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

    public function listAktivitas(){
      return $this->_newAktivitasDefaultData('');
    }

    public function listUsers(){
      $errors = '';
      $users = [];
      $allUsers = [];
      $allRank = [];
    try {
        $users = new User();
        $allUsers = $users->getAllUsers();
        $allRank = Rank::select('name AS label','id AS value')->get();
      }
      catch (\Throwable $e){
        $errors = 'Retrieving users failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Retrieving users failed with error: '.$e->getMessage();
      }
      return Inertia::render($this->folder.'ListUsers', ['allUsers' => $allUsers, 'allRank' => $allRank, 'errors' => $errors]);
    }

    public function updateUser(Request $request){
      $errors = '';

      $nameValidator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        // 'nip' => 'required|numeric|digits:3,30|unique:users',
        'nip' => 'numeric',
      ]);
      if ($nameValidator->fails()) {
        $errors = $nameValidator->errors()->first();
        return redirect()->back()->with('errors', $errors);
      }
      if($request->password != ''){
        $passwordValidator = Validator::make($request->all(), [
          'password' => ['confirmed', Rules\Password::defaults()],
        ]);
        if ($passwordValidator->fails()) {
          $errors = $passwordValidator->errors()->first();
          return redirect()->back()->with('errors', $errors);
        }
      }
      try {
        $user = User::find($request->id);
        $user->name = $request->name;
        // $user->email = $request->email;
        $user->nip = $request->nip;
        $user->rank_id = $request->rank_id;
        $user->boss_id = $request->boss_id;
        $user->is_admin = $request->is_admin;
        $user->password = Hash::make($request->password);
        $user->save();
      }
      catch (\Throwable $e){
        $errors = 'Update user failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Update user failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

    public function deleteUser(Request $request)
    {
      $errors = '';
      try {
        error_log($request->id);
        $existingActivity = KPISubmission::where('user_id',$request->id)->get();
        if(count($existingActivity)>0){
          $errors = 'Pengguna memiliki aktivitas. Tidak dapat dihapus.';
        }
        else{
          User::destroy($request->id);
        }
      }
      catch (\Throwable $e){
        $errors = 'Delete user failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Delete user failed with error: '.$e->getMessage();
      }
      error_log($errors);
      return redirect()->back()->with('errors', $errors);
    }

    private function _newAktivitasDefaultData($errors){
      $errors = '';
      $allUnsur = [];
      $allRank = [];
      $aktivitas = [];
      $allAktivitas = [];
      $buktiFisik = [];
      try {
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
        $aktivitas = new Aktivitas();
        $allAktivitas = $aktivitas->getFullActivity();
        $buktiFisik = $aktivitas->getAllBukti();
        //$rank = Aktivitas
      }
      catch (\Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      return Inertia::render($this->folder.'ListAktivitasPage', ['allUnsur' => $allUnsur, 'allRank' => $allRank, 'allAktivitas' => $allAktivitas, 'allBukti' => $buktiFisik, 'errors' => $errors]);
    }

    public function newAktivitas(){
      return $this->_newAktivitasDefaultData('');
    }

    public function addAktivitas(Request $request){
      $errors = '';
      try {
        $activity = new Aktivitas;
        $activity->title = $request->title;
        $activity->description = $request->description;
        $activity->rank_id = $request->rank_id;
        $activity->credit_value = $request->credit_value;
        $activity->kpi_group_id = $request->kpi_group_id;
        $activity->has_file = true;
        $activity->save();
      }
      catch (\Throwable $e){
        $errors = 'Saving aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Saving aktivitas failed with error: '.$e->getMessage();
      }
      try {
        $tahapan = new Tahapan;
        $tahapan->kpi_activity_id = $activity->id;
        $tahapan->description = $request->tahapan;
        $tahapan->save();
      }
      catch (Throwable $e){
        Aktivitas::destroy($activity->id);
        $errors = 'Saving tahapan failed with error: '.$e;
      }
      try {
        foreach($request->bukti as $buct){
          $bukti = new BuktiFisik;
          $bukti->kpi_activity_id = $activity->id;
          $bukti->description = $buct;
          $bukti->file_type = 'document';
          $bukti->save();
        }
      }
      catch (Exception $e){
        Aktivitas::destroy($activity->id);
        Tahapan::destroy($tahapan->id);
        $errors = 'Saving bukti failed with error: '.$e;
      }
      return redirect()->back()->with('errors', $errors);
      // return $this->_newAktivitasDefaultData($errors);
    }

    public function updateAktivitas(Request $request){
      $errors = '';
      try {
        $activity = Aktivitas::find($request->id);
        $activity->title = $request->title;
        $activity->description = $request->description;
        $activity->rank_id = $request->rank_id;
        $activity->credit_value = $request->credit_value;
        $activity->kpi_group_id = $request->kpi_group_id;
        $activity->has_file = true;
        $activity->save();
      }
      catch (Throwable $e){
        $errors = 'Saving aktivitas failed with error: '.$e;
      }
      try {
        $tahapan = Tahapan::find($request->tahapan_id);
        if($tahapan==null){
          $tahapan = new Tahapan;
          $tahapan->kpi_activity_id = $activity->id;
        }
        $tahapan->description = $request->tahapan;
        $tahapan->save();
      }
      catch (Throwable $e){
        $errors = 'Saving tahapan failed with error: '.$e;
      }
      try {
        for($i=0; $i<count($request->bukti); $i++){
          //find existing bukti
          if($request->bukti_id[$i]!=null && $request->bukti_id[$i]!=-1){
            $bukti = BuktiFisik::find($request->bukti_id[$i]);
            if($bukti==null)
              throw new Exception("bukti fisik not found", 1);
          }
          //add new bukti
          else{
            $bukti = new BuktiFisik;
            $bukti->kpi_activity_id = $activity->id;
          }
          $bukti->description = $request->bukti[$i];
          $bukti->file_type = 'document';
          $bukti->save();
        }
      }
      catch (Exception $e){
        $errors = 'Updating bukti failed with error: '.$e;
      }

      return redirect()->back()->with('errors', $errors);
    }

    public function deleteAktivitas(Request $request)
    {
      $errors = '';
      try {
        error_log($request->id);
        $existingActivity = KPISubmission::where('kpi_activity_id',$request->id)->get();
        if(count($existingActivity)>0){
          $errors = 'Aktivitas digunakan';
        }
        else{
          BuktiFisik::where('kpi_activity_id',$request->id)->delete();
          Tahapan::where('kpi_activity_id',$request->id)->delete();
          Aktivitas::destroy($request->id);
        }
      }
      catch (\Throwable $e){
        $errors = 'Delete aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Delete aktivitas failed with error: '.$e->getMessage();
      }
      error_log($errors);
      return redirect()->back()->with('errors', $errors);
    }

 }