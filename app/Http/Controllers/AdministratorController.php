<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Unsur;
use App\Models\Rank;
use App\Models\Aktivitas;
use App\Models\Tahapan;
use App\Models\BuktiFisik;
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
      return $this->_newAktivitasDefaultData('');
    }

    // private function _newUnsurDefaultData($errors){
    //   try {
    //     //get all unsur, but convert to usable array in the js here
    //     $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
    //   }
    //   catch (Throwable $e){
    //     $errors = 'Retrieving unsur failed with error: '.$e;
    //   }
    //   return Inertia::render($this->folder.'AddUnsur', ['selected' => '1', 'allUnsur' => $allUnsur, 'errors' => $errors]);
    // }

    // public function newUnsur()
    // {
    //   return $this->_newAktivitasDefaultData($errors);
    // }

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
      catch (Throwable $e){
        $errors = 'Saving unsur failed with error: '.$e;
      }
      return redirect()->back()->with('errors', $errors);
      // return $this->_newAktivitasDefaultData($errors);
    }

    public function listAktivitas(){
      return $this->_newAktivitasDefaultData('');
    }

    public function listUsers(){
      $errors = '';
      try {
        $users = new User();
        $allUsers = $users->getAllUsers();
        $allRank = Rank::select('name AS label','id AS value')->get();
      }
      catch (Throwable $e){
        $errors = 'Retrieving users failed with error: '.$e;
      }
      return Inertia::render($this->folder.'ListUsers', ['allUsers' => $allUsers, 'allRank' => $allRank, 'errors' => $errors]);
    }

    public function updateUser(Request $request){
      $errors = '';
      try {
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->rank_id = $request->rank_id;
        $user->boss_id = $request->boss_id;
        $user->save();
      }
      catch (Throwable $e){
        $errors = 'Update user failed with error: '.$e;
      }
      return redirect()->back()->with('errors', $errors);
    }

    private function _newAktivitasDefaultData($errors){
      $errors = '';
      try {
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
        $aktivitas = new Aktivitas();
        $allAktivitas = $aktivitas->getFullActivity();
        $buktiFisik = $aktivitas->getAllBukti();
        //$rank = Aktivitas
      }
      catch (Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e;
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
      catch (Throwable $e){
        $errors = 'Saving aktivitas failed with error: '.$e;
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

 }