<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Aktivitas;
use Auth; 
use App\Models\BuktiFisikSubmission;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'has_underling'
    ];
    public function getHasUnderlingAttribute()
    {
        $tok;
        (count($this->getUnderling(Auth::id()))>0) ? ($tok = 1) : ($tok = 0);
        return $tok;
    }

    public function getAllUsers()
    {
        return DB::table('users')
        ->select(
            'users.id','users.name AS nama','users.email','boss.id AS atasan_id','boss.name AS atasan','rank.name AS jabatan', 'rank.id AS jabatan_id',
            'users.is_admin',
            DB::raw('
            CASE 
                WHEN users.is_admin = 0 THEN "Pengguna"
                WHEN users.is_admin = 1 THEN "Administrator"
                ELSE "Pengguna"
            END AS accountType
            ')
            
            )
        ->leftJoin('users AS boss','boss.id','=','users.boss_id')
        ->leftJoin('rank','rank.id','=','users.rank_id')
        ->get();
    }

    public function getCurrentUserUnderlingAllPersonalAktivitas(){
        return $this->getSelectedUserUnderlingsAllPersonalAktivitas(Auth::id());
        // $underlings = $this->getUnderling(Auth::id());
        // $result = array();
        // foreach($underlings as $underling){
        //     $result = $this->getSelectedUserAllPersonalAktivitas($underling->id);
        // }
        // return $result;
    }

    public function getCurrentUserUnderlingAllPersonalBukti(){
        return $this->getSelectedUserUnderlingsAllPersonalBukti(Auth::id());
        // $underlings = $this->getUnderling(Auth::id());
        // $result = array();
        // foreach($underlings as $underling){
        //     $result = $this->getSelectedUserAllPersonalBukti($underling->id);
        // }
        // return $result;
    }

    public function getCurrentUserAllPersonalAktivitas()
    {
        return $this->getSelectedUserAllPersonalAktivitas(Auth::id());
    }

    public function getCurrentUserAllPersonalBukti()
    {
        return $this->getSelectedUserAllPersonalBukti(Auth::id());
    }

    public function getSelectedUserAllPersonalAktivitas($user_id){
        return DB::table('kpi_submission')
        ->select('kpi_submission.id','kpi_submission.updated_at',
            // 'submission_bukti_fisik.id as bukti_id','submission_bukti_fisik.file_location AS bukti_location',
            'kpi_activity.id AS aktivitas_id','kpi_activity.title AS aktivitas','kpi_activity.credit_value as angkaKredit',
            'kpi_group.id as unsur_id','kpi_group.title as unsur',
            'rank.id AS jabatan_id','rank.name AS jabatan',
            'tahapan.id AS tahapan_id','tahapan.description AS tahapan',
            'users.name AS namaPegawai',
            DB::raw('
            CASE 
                WHEN kpi_submission.status = 0 THEN "Menunggu"
                WHEN kpi_submission.status = 1 THEN "Diterima"
                WHEN kpi_submission.status = 2 THEN "Ditolak"
            END AS status
            ')
            )
        ->leftJoin('users','users.id','=','kpi_submission.user_id')
        ->leftJoin('kpi_activity','kpi_activity.id','=','kpi_submission.kpi_activity_id')
        // ->leftJoin('submission_bukti_fisik','submission_bukti_fisik.kpi_submission_id','=','kpi_submission.id')
        ->leftJoin('kpi_group','kpi_activity.kpi_group_id','=','kpi_group.id')
        ->leftJoin('rank','kpi_activity.rank_id','=','rank.id')
        ->leftJoin('tahapan','kpi_activity.id','=','tahapan.kpi_activity_id')
        ->where('kpi_submission.user_id','=', $user_id)
        ->orderBy('kpi_submission.updated_at','desc')
        ->get();
    }

    public function getSelectedUserAllPersonalBukti($user_id)
    {
        $allBukti = DB::table('kpi_submission')
        ->select(
            'kpi_submission.id','kpi_submission.updated_at',
            'kpi_activity.id AS activity_id',
            'bukti_fisik.id AS bukti_id','bukti_fisik.description AS description',
            'submission_bukti_fisik.id as submitted_bukti_id','submission_bukti_fisik.file_location AS bukti_location','submission_bukti_fisik.original_file_name AS filename'
            )
        ->leftJoin('kpi_activity','kpi_activity.id','=','kpi_submission.kpi_activity_id')
        ->leftJoin('bukti_fisik','kpi_activity.id','=','bukti_fisik.kpi_activity_id')
        ->leftJoin('submission_bukti_fisik', function($join){
            $join->on('submission_bukti_fisik.kpi_submission_id', '=', 'kpi_submission.id');
            $join->on('submission_bukti_fisik.bukti_id','=','bukti_fisik.id');
        })
        ->where('kpi_submission.user_id','=', $user_id)
        ->orderBy('kpi_submission.updated_at','desc')
        ->get();
        $filteredBukti = [];
        $activityCounter = 0;
        $buktiCounter = 0;
        // error_log('helloooo');
        for($i=0; $i < count($allBukti); $i++){
            // error_log('submission id: '.$allBukti[$i]->id);
            //if its the same as before
            if($i==0 || ($allBukti[$i]->id == $allBukti[$i-1]->id)){
                $filteredBukti[$activityCounter][$buktiCounter] = $allBukti[$i];
                // error_log('index: '.$activityCounter.','.$buktiCounter);
                // error_log('submitted bukti id: '.$allBukti[$i]->submitted_bukti_id);
                // error_log('bukti id: '.$allBukti[$i]->bukti_id);
                // error_log('bukti loc: '.$allBukti[$i]->bukti_location);
                $buktiCounter++;
            }
            else{
                $activityCounter++;
                $buktiCounter = 0;
                $filteredBukti[$activityCounter][$buktiCounter] = $allBukti[$i];
                // error_log('index: '.$activityCounter.','.$buktiCounter);
                // error_log('submitted bukti id: '.$allBukti[$i]->submitted_bukti_id);
                // error_log('bukti id: '.$allBukti[$i]->bukti_id);
                // error_log('bukti loc: '.$allBukti[$i]->bukti_location);
                $buktiCounter++;
            }
        }
        // error_log(json_encode($filteredBukti));
        return $filteredBukti;
    }

    public function getSelectedUserUnderlingsAllPersonalAktivitas($user_id){
        return DB::table('kpi_submission')
        ->select('kpi_submission.id','kpi_submission.updated_at',
            // 'submission_bukti_fisik.id as bukti_id','submission_bukti_fisik.file_location AS bukti_location',
            'kpi_activity.id AS aktivitas_id','kpi_activity.title AS aktivitas','kpi_activity.credit_value as angkaKredit',
            'kpi_group.id as unsur_id','kpi_group.title as unsur',
            'rank.id AS jabatan_id','rank.name AS jabatan',
            'tahapan.id AS tahapan_id','tahapan.description AS tahapan',
            'users.name AS namaPegawai',
            DB::raw('
            CASE 
                WHEN kpi_submission.status = 0 THEN "Menunggu"
                WHEN kpi_submission.status = 1 THEN "Diterima"
                WHEN kpi_submission.status = 2 THEN "Ditolak"
            END AS status
            ')
            )
        ->leftJoin('users','users.id','=','kpi_submission.user_id')
        ->leftJoin('kpi_activity','kpi_activity.id','=','kpi_submission.kpi_activity_id')
        ->leftJoin('kpi_group','kpi_activity.kpi_group_id','=','kpi_group.id')
        ->leftJoin('rank','kpi_activity.rank_id','=','rank.id')
        ->leftJoin('tahapan','kpi_activity.id','=','tahapan.kpi_activity_id')
        // ->where('kpi_submission.user_id','=', $user_id)
        ->where('users.boss_id','=', $user_id)
        ->orderBy('kpi_submission.updated_at','desc')
        ->get();
    }

    public function getSelectedUserUnderlingsAllPersonalBukti($user_id)
    {
        $allBukti = DB::table('kpi_submission')
        ->select(
            'kpi_submission.id','kpi_submission.updated_at',
            'kpi_activity.id AS activity_id',
            'bukti_fisik.id AS bukti_id','bukti_fisik.description AS description',
            'submission_bukti_fisik.id as submitted_bukti_id','submission_bukti_fisik.file_location AS bukti_location','submission_bukti_fisik.original_file_name AS filename'
            )
        ->leftJoin('users','users.id','=','kpi_submission.user_id')
        ->leftJoin('kpi_activity','kpi_activity.id','=','kpi_submission.kpi_activity_id')
        ->leftJoin('bukti_fisik','kpi_activity.id','=','bukti_fisik.kpi_activity_id')
        ->leftJoin('submission_bukti_fisik', function($join){
            $join->on('submission_bukti_fisik.kpi_submission_id', '=', 'kpi_submission.id');
            $join->on('submission_bukti_fisik.bukti_id','=','bukti_fisik.id');
        })
        // ->where('kpi_submission.user_id','=', $user_id)
        ->where('users.boss_id','=', $user_id)
        ->orderBy('kpi_submission.updated_at','desc')
        ->get();
        $filteredBukti = [];
        $activityCounter = 0;
        $buktiCounter = 0;
        // error_log('helloooo');
        for($i=0; $i < count($allBukti); $i++){
            // error_log('submission id: '.$allBukti[$i]->id);
            //if its the same as before
            if($i==0 || ($allBukti[$i]->id == $allBukti[$i-1]->id)){
                $filteredBukti[$activityCounter][$buktiCounter] = $allBukti[$i];
                // error_log('index: '.$activityCounter.','.$buktiCounter);
                // error_log('submitted bukti id: '.$allBukti[$i]->submitted_bukti_id);
                // error_log('bukti id: '.$allBukti[$i]->bukti_id);
                // error_log('bukti loc: '.$allBukti[$i]->bukti_location);
                $buktiCounter++;
            }
            else{
                $activityCounter++;
                $buktiCounter = 0;
                $filteredBukti[$activityCounter][$buktiCounter] = $allBukti[$i];
                // error_log('index: '.$activityCounter.','.$buktiCounter);
                // error_log('submitted bukti id: '.$allBukti[$i]->submitted_bukti_id);
                // error_log('bukti id: '.$allBukti[$i]->bukti_id);
                // error_log('bukti loc: '.$allBukti[$i]->bukti_location);
                $buktiCounter++;
            }
        }
        // error_log(json_encode($filteredBukti));
        return $filteredBukti;
    }

    public function getBoss($user_id){
        $boss_id = User::select('boss_id')->where('id','=',$user_id)->first();
        if($boss_id == null)
            return null;
        else{
            // error_log('boss_id: '.$boss_id->boss_id);
            $ehe = User::where('id',$boss_id->boss_id)->get();
            // error_log('ehe: '.$ehe);
            return $ehe;
        }
    }

    public function getUnderling($user_id){
        return User::where('boss_id','=',$user_id)->get();
    }

    protected function test(){
        return 'eheheh';
    }

    public function getCurrentUserSelectedPersonalBukti($submitted_bukti_id)
    {
        $res = BuktiFisikSubmission::// DB::table('submission_bukti_fisik')
        select(
            'submission_bukti_fisik.id','submission_bukti_fisik.file_location','submission_bukti_fisik.original_file_name'
            )
        ->where('submission_bukti_fisik.id','=',$submitted_bukti_id)
        ->firstOrFail();
        return $res;
    }

}
