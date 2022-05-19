<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/CustomRegister');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        //old ways
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);

        $errors = '';
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            // 'email' => 'required|string|email|max:255|unique:users',
            'nip' => 'required|numeric|digits:3,30|unique:users',
            'password' => ['required','confirmed', Rules\Password::defaults()],
        ]);
        if ($validator->fails()) {
            // $errors = $validator->errors()->first();
            return redirect()->back()->with('errors', $errors);
              return redirect()->back()->with('success',$validator->errors()->first());
              //for some reason 'errors' fail
            // return redirect()->back()->with('errors', $validator->errors()->first());
        }
        $user = User::create([
            'name' => $request->name,
            // 'email' => $request->email,
            'nip' => $request->nip,
            'password' => Hash::make($request->password),
        ]);

        // event(new Registered($user));
        return redirect()->back()->with('success','User Creation Success');
        // return redirect::back();
    }
}
